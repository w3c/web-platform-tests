import argparse
import json
import logging
import os
import stat
import subprocess
import sys
import tarfile
import traceback
import zipfile
from cStringIO import StringIO
from collections import defaultdict
from urlparse import urljoin

import requests

wptrunner = None
wptcommandline = None
reader = None
LogHandler = None

logger = logging.getLogger(os.path.splitext(__file__)[0])


def do_delayed_imports():
    global wptrunner, wptcommandline, reader
    from wptrunner import wptrunner
    from wptrunner import wptcommandline
    from mozlog import reader
    setup_log_handler()


def setup_logging():
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(logging.BASIC_FORMAT, None)
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG)

setup_logging()


class GitHub(object):
    def __init__(self, org, repo, token):
        self.token = token
        self.headers = {"Accept": "application/vnd.github.v3+json"}
        self.auth = (self.token, "x-oauth-basic")
        self.org = org
        self.repo = repo
        self.base_url = "https://api.github.com/repos/%s/%s/" % (org, repo)

    def _headers(self, headers):
        if headers is None:
            headers = {}
        rv = self.headers.copy()
        rv.update(headers)
        return rv

    def post(self, url, data, headers=None):
        logger.debug("POST %s" % url)
        if data is not None:
            data = json.dumps(data)
        resp = requests.post(
            url,
            data=data,
            headers=self._headers(headers),
            auth=self.auth
        )
        resp.raise_for_status()
        return resp

    def get(self, url, headers=None):
        logger.debug("GET %s" % url)
        resp = requests.get(
            url,
            headers=self._headers(headers),
            auth=self.auth
        )
        resp.raise_for_status()
        return resp

    def post_comment(self, issue_number, body):
        url = urljoin(self.base_url, "issues/%s/comments" % issue_number)
        return self.post(url, {"body": body})

    def releases(self):
        url = urljoin(self.base_url, "releases/latest")
        return self.get(url)


class GitHubCommentHandler(logging.Handler):
    def __init__(self, github, pull_number):
        logging.Handler.__init__(self)
        self.github = github
        self.pull_number = pull_number
        self.log_data = []

    def emit(self, record):
        try:
            msg = self.format(record)
            self.log_data.append(msg)
        except Exception:
            self.handleError(record)

    def send(self):
        self.github.post_comment(self.pull_number, "\n".join(self.log_data))
        self.log_data = []


class Browser(object):
    product = None

    def __init__(self, github_token):
        self.github_token = github_token


class Firefox(Browser):
    product = "firefox"

    def install(self):
        call("pip", "install", "-r", "w3c/wptrunner/requirements_firefox.txt")
        resp = get("https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central/firefox-52.0a1.en-US.linux-x86_64.tar.bz2")
        untar(resp.raw)

        if not os.path.exists("profiles"):
            os.mkdir("profiles")
        with open(os.path.join("profiles", "prefs_general.js"), "wb") as f:
            resp = get("https://hg.mozilla.org/mozilla-central/raw-file/tip/testing/profiles/prefs_general.js")
            f.write(resp.content)
        call("pip", "install", "-r", os.path.join("w3c", "wptrunner", "requirements_firefox.txt"))

    def install_webdriver(self):
        github = GitHub("mozilla", "geckodriver", self.github_token)
        releases = github.releases().json()
        url = (item["browser_download_url"] for item in releases["assets"]
               if "linux64" in item["browser_download_url"]).next()
        untar(get(url).raw)

    def wptrunner_args(self, root):
        return {
            "product": "firefox",
            "binary": "%s/firefox/firefox" % root,
            "certutil_binary": "certutil",
            "webdriver_binary": "%s/geckodriver" % root,
            "prefs_root": "%s/profiles" % root,
        }


class Chrome(Browser):
    product = "chrome"

    def install(self):
        latest = get("https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2FLAST_CHANGE?alt=media").text.strip()
        url = "https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%%2F%s%%2Fchrome-linux.zip?alt=media" % latest
        unzip(get(url).raw)
        logger.debug(call("ls", "-lhrt", "chrome-linux"))
        call("pip", "install", "-r", os.path.join("w3c", "wptrunner", "requirements_chrome.txt"))

    def install_webdriver(self):
        latest = get("http://chromedriver.storage.googleapis.com/LATEST_RELEASE").text.strip()
        url = "http://chromedriver.storage.googleapis.com/%s/chromedriver_linux64.zip" % latest
        unzip(get(url).raw)
        st = os.stat('chromedriver')
        os.chmod('chromedriver', st.st_mode | stat.S_IEXEC)

    def wptrunner_args(self, root):
        return {
            "product": "chrome",
            "binary": "%s/chrome-linux/chrome" % root,
            "webdriver_binary": "%s/chromedriver" % root,
            "test_types": ["testharness", "reftest"]
        }


def get(url):
    logger.debug("GET %s" % url)
    resp = requests.get(url, stream=True)
    resp.raise_for_status()
    return resp


def call(*args):
    logger.debug("%s" % " ".join(args))
    return subprocess.check_output(args)


def get_git_cmd(repo_path):
    def git(cmd, *args):
        full_cmd = ["git", cmd] + list(args)
        try:
            return subprocess.check_output(full_cmd, cwd=repo_path, stderr=subprocess.STDOUT)
        except subprocess.CalledProcessError as e:
            logger.error("Git command exited with status %i" % e.returncode)
            logger.error(e.output)
            sys.exit(1)
    return git


def seekable(fileobj):
    try:
        fileobj.seek(fileobj.tell())
    except Exception:
        return StringIO(fileobj.read())
    else:
        return fileobj


def untar(fileobj):
    logger.debug("untar")
    fileobj = seekable(fileobj)
    with tarfile.open(fileobj=fileobj) as tar_data:
        tar_data.extractall()


def unzip(fileobj):
    logger.debug("unzip")
    fileobj = seekable(fileobj)
    with zipfile.ZipFile(fileobj) as zip_data:
        for info in zip_data.infolist():
            zip_data.extract(info)
            perm = info.external_attr >> 16 & 0x1FF
            os.chmod(info.filename, perm)


def setup_github_logging(args):
    gh_handler = None
    if args.comment_pr:
        github = GitHub("w3c", "web-platform-tests", args.gh_token)
        try:
            pr_number = int(args.comment_pr)
        except ValueError:
            pass
        else:
            gh_handler = GitHubCommentHandler(github, pr_number)
            gh_handler.setLevel(logging.INFO)
            logger.debug("Setting up GitHub logging")
            logger.addHandler(gh_handler)
    else:
        logger.warning("No PR number found; not posting to GitHub")
    return gh_handler


class pwd(object):
    def __init__(self, dir):
        self.dir = dir
        self.old_dir = None

    def __enter__(self):
        self.old_dir = os.path.abspath(os.curdir)
        os.chdir(self.dir)

    def __exit__(self, *args, **kwargs):
        os.chdir(self.old_dir)
        self.old_dir = None


def fetch_wpt_master():
    git = get_git_cmd(os.path.join(os.path.abspath(os.curdir), "w3c", "web-platform-tests"))
    git("fetch", "https://github.com/w3c/web-platform-tests.git", "master:master")


def get_sha1():
    git = get_git_cmd(os.path.join(os.path.abspath(os.curdir), "w3c", "web-platform-tests"))
    return git("rev-parse", "HEAD").strip()

def build_manifest():
    with pwd(os.path.join(os.path.abspath(os.curdir), "w3c", "web-platform-tests")):
        # TODO: Call the manifest code directly
        call("python", "manifest")


def install_wptrunner():
    call("git", "clone", "--depth=1", "https://github.com/w3c/wptrunner.git", "w3c/wptrunner")
    git = get_git_cmd(os.path.join(os.path.abspath(os.curdir), "w3c", "wptrunner"))
    git("submodule", "update", "--init", "--recursive")
    call("pip", "install", os.path.join("w3c", "wptrunner"))


def get_files_changed():
    root = os.path.abspath(os.curdir)
    git = get_git_cmd("%s/w3c/web-platform-tests" % root)
    branch_point = git("merge-base", "HEAD", "master").strip()
    logger.debug("Branch point from master: %s" % branch_point)
    logger.debug(git("log", "--oneline", "%s.." % branch_point))
    files = git("diff", "--name-only", "-z", "%s.." % branch_point)
    if not files:
        return []
    assert files[-1] == "\0"
    return ["%s/w3c/web-platform-tests/%s" % (root, item)
            for item in files[:-1].split("\0")]


def wptrunner_args(root, files_changed, iterations, browser):
    parser = wptcommandline.create_parser([browser.product])
    args = vars(parser.parse_args([]))
    wpt_root = os.path.join(root, "w3c", "web-platform-tests")
    args.update(browser.wptrunner_args(root))
    args.update({
        "tests_root": wpt_root,
        "metadata_root": wpt_root,
        "repeat": iterations,
        "config": "%s/w3c/wptrunner/wptrunner.default.ini" % root,
        "test_list": files_changed,
        "restart_on_unexpected": False,
        "pause_after_test": False
    })
    wptcommandline.check_args(args)
    return args


def setup_log_handler():
    global LogHandler

    class LogHandler(reader.LogHandler):
        def __init__(self):
            self.results = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))

        def test_status(self, data):
            self.results[data["test"]][data.get("subtest")][data["status"]] += 1

        def test_end(self, data):
            self.results[data["test"]][None][data["status"]] += 1


def is_inconsistent(results_dict, iterations):
    return len(results_dict) > 1 or sum(results_dict.values()) != iterations


def err_string(results_dict, iterations):
    rv = []
    total_results = sum(results_dict.values())
    for key, value in sorted(results_dict.items()):
        rv.append("%s%s" %
                  (key, ": %s/%s" % (value, iterations) if value != iterations else ""))
    rv = ", ".join(rv)
    if total_results < iterations:
        rv.append("MISSING: %s/%s" % (iterations - total_results, iterations))
    if len(results_dict) > 1 or total_results != iterations:
        rv = "**%s**" % rv
    return rv


def process_results(log, iterations):
    inconsistent = []
    handler = LogHandler()
    reader.handle_log(reader.read(log), handler)
    results = handler.results
    for test, test_results in results.iteritems():
        for subtest, result in test_results.iteritems():
            if is_inconsistent(result, iterations):
                inconsistent.append((test, subtest, result))
    return results, inconsistent


def write_inconsistent(inconsistent, iterations):
    logger.error("## Unstable results ##\n")
    logger.error("| Test | Subtest | Results |")
    logger.error("|------|---------|---------|")
    for test, subtest, results in inconsistent:
        logger.error("%s | %s | %s" % (test,
                                       subtest if subtest else "",
                                       err_string(results, iterations)))


def write_results(results, iterations):
    logger.info("## All results ##\n")
    for test, test_results in results.iteritems():
        logger.info("### %s ###" % test)
        logger.info("| Subtest | Results |")
        logger.info("|---------|---------|")
        parent = test_results.pop(None)
        logger.info("|  | %s |" % (err_string(parent, iterations)))
        for subtest, result in test_results.iteritems():
            logger.info("| %s | %s |" % (subtest, err_string(result, iterations)))


def get_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root",
                        action="store",
                        default=os.path.join(os.path.expanduser("~"), "build"),
                        help="Root path")
    parser.add_argument("--iterations",
                        action="store",
                        default=10,
                        type=int,
                        help="Number of times to run tests")
    parser.add_argument("--gh-token",
                        action="store",
                        default=os.environ.get("GH_TOKEN"),
                        help="OAuth token to use for accessing GitHub api")
    parser.add_argument("--comment-pr",
                        action="store",
                        default=os.environ.get("TRAVIS_PULL_REQUEST"),
                        help="PR to comment on with stability results")
    parser.add_argument("browser",
                        action="store",
                        help="Browser to run against")
    return parser


def main():
    retcode = 0
    parser = get_parser()
    args = parser.parse_args()

    if not os.path.exists(args.root):
        logger.critical("Root directory %s does not exist" % args.root)
        return 1

    os.chdir(args.root)

    if args.gh_token is None:
        logger.critical("Must provide a GitHub token via --gh-token or $GITHUB_TOKEN")
        return 1

    gh_handler = setup_github_logging(args)

    logger.info("# %s #" % args.browser.title())

    browser_cls = {"firefox": Firefox,
                   "chrome": Chrome}.get(args.browser)
    if browser_cls is None:
        logger.critical("Unrecognised browser %s" % args.browser)
        return 1

    fetch_wpt_master()

    head_sha1 = get_sha1()
    logger.info("Testing revision %s" % head_sha1)

    # For now just pass the whole list of changed files to wptrunner and
    # assume that it will run everything that's actually a test
    files_changed = get_files_changed()

    if not files_changed:
        logger.info("No files changed")
        return 0

    build_manifest()
    install_wptrunner()
    do_delayed_imports()

    logger.debug("Files changed:\n%s" % "".join(" * %s\n" % item for item in files_changed))

    browser = browser_cls(args.gh_token)

    browser.install()
    browser.install_webdriver()

    kwargs = wptrunner_args(args.root,
                            files_changed,
                            args.iterations,
                            browser)
    with open("raw.log", "wb") as log:
        wptrunner.setup_logging(kwargs,
                                {"tbpl": sys.stdout,
                                 "raw": log})
        wptrunner.run_tests(**kwargs)

    with open("raw.log", "rb") as log:
        results, inconsistent = process_results(log, args.iterations)

    if results:
        if inconsistent:
            write_inconsistent(inconsistent, args.iterations)
            retcode = 2
        else:
            logger.info("All results were stable\n")
        write_results(results, args.iterations)
    else:
        logger.info("No tests run.")

    try:
        if gh_handler:
            gh_handler.send()
    except Exception:
        logger.error(traceback.format_exc())
    return retcode


if __name__ == "__main__":
    try:
        retcode = main()
    except:
        raise
    else:
        sys.exit(retcode)

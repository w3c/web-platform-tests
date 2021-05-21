from . import chrome_spki_certs
from .base import Browser, ExecutorBrowser, require_arg
from .base import NullBrowser  # noqa: F401
from .base import get_timeout_multiplier   # noqa: F401
from ..webdriver_server import ChromeDriverServer
from ..executors import executor_kwargs as base_executor_kwargs
from ..executors.executorwebdriver import (WebDriverTestharnessExecutor,  # noqa: F401
                                           WebDriverRefTestExecutor,  # noqa: F401
                                           WebDriverCrashtestExecutor)  # noqa: F401
from ..executors.executorchrome import (ChromeDriverWdspecExecutor,  # noqa: F401
                                        ChromeDriverPrintRefTestExecutor)  # noqa: F401


__wptrunner__ = {"product": "chrome",
                 "check_args": "check_args",
                 "browser": {None: "ChromeBrowser",
                             "wdspec": "NullBrowser"},
                 "executor": {"testharness": "WebDriverTestharnessExecutor",
                              "reftest": "WebDriverRefTestExecutor",
                              "print-reftest": "ChromeDriverPrintRefTestExecutor",
                              "wdspec": "ChromeDriverWdspecExecutor",
                              "crashtest": "WebDriverCrashtestExecutor"},
                 "browser_kwargs": "browser_kwargs",
                 "executor_kwargs": "executor_kwargs",
                 "env_extras": "env_extras",
                 "env_options": "env_options",
                 "timeout_multiplier": "get_timeout_multiplier",}

def check_args(**kwargs):
    require_arg(kwargs, "webdriver_binary")


def browser_kwargs(logger, test_type, run_info_data, config, **kwargs):
    return {"binary": kwargs["binary"],
            "webdriver_binary": kwargs["webdriver_binary"],
            "webdriver_args": kwargs.get("webdriver_args")}


def executor_kwargs(logger, test_type, test_environment, run_info_data,
                    **kwargs):
    executor_kwargs = base_executor_kwargs(test_type, test_environment, run_info_data,
                                           **kwargs)
    executor_kwargs["close_after_done"] = True
    executor_kwargs["supports_eager_pageload"] = False

    capabilities = {
        "goog:chromeOptions": {
            "prefs": {
                "profile": {
                    "default_content_setting_values": {
                        "popups": 1
                    }
                }
            },
            "excludeSwitches": ["enable-automation"],
            "w3c": True
        }
    }

    if test_type == "testharness":
        capabilities["pageLoadStrategy"] = "none"

    chrome_options = capabilities["goog:chromeOptions"]
    if kwargs["binary"] is not None:
        chrome_options["binary"] = kwargs["binary"]

    # Here we set a few Chrome flags that are always passed.
    # ChromeDriver's "acceptInsecureCerts" capability only controls the current
    # browsing context, whereas the CLI flag works for workers, too.
    chrome_options["args"] = []

    chrome_options["args"].append("--ignore-certificate-errors-spki-list=%s" %
                                  ','.join(chrome_spki_certs.IGNORE_CERTIFICATE_ERRORS_SPKI_LIST))

    # Allow audio autoplay without a user gesture.
    chrome_options["args"].append("--autoplay-policy=no-user-gesture-required")
    # Allow WebRTC tests to call getUserMedia.
    chrome_options["args"].append("--use-fake-ui-for-media-stream")
    chrome_options["args"].append("--use-fake-device-for-media-stream")
    # Shorten delay for Reporting <https://w3c.github.io/reporting/>.
    chrome_options["args"].append("--short-reporting-delay")
    # Point all .test domains to localhost for Chrome
    chrome_options["args"].append("--host-resolver-rules=MAP nonexistent.*.test ~NOTFOUND, MAP *.test 127.0.0.1")

    if kwargs["enable_mojojs"]:
        chrome_options["args"].append("--enable-blink-features=MojoJS,MojoJSTest")

    # Copy over any other flags that were passed in via --binary_args
    if kwargs["binary_args"] is not None:
        chrome_options["args"].extend(kwargs["binary_args"])

    # Pass the --headless flag to Chrome if WPT's own --headless flag was set
    # or if we're running print reftests because of crbug.com/753118
    if ((kwargs["headless"] or test_type == "print-reftest") and
        "--headless" not in chrome_options["args"]):
        chrome_options["args"].append("--headless")

    executor_kwargs["capabilities"] = capabilities

    return executor_kwargs


def env_extras(**kwargs):
    return []


def env_options():
    return {"server_host": "127.0.0.1"}


class ChromeBrowser(Browser):
    """Chrome is backed by chromedriver, which is supplied through
    ``wptrunner.webdriver.ChromeDriverServer``.
    """

    def __init__(self, logger, binary, webdriver_binary="chromedriver",
                 webdriver_args=None, **kwargs):
        """Creates a new representation of Chrome.  The `binary` argument gives
        the browser binary to use for testing."""
        Browser.__init__(self, logger)
        self.binary = binary
        self.server = ChromeDriverServer(self.logger,
                                         binary=webdriver_binary,
                                         args=webdriver_args)

    def start(self, **kwargs):
        self.server.start(block=False)

    def stop(self, force=False):
        self.server.stop(force=force)

    def pid(self):
        return self.server.pid

    def is_alive(self):
        # TODO(ato): This only indicates the driver is alive,
        # and doesn't say anything about whether a browser session
        # is active.
        return self.server.is_alive()

    def cleanup(self):
        self.stop()

    def executor_browser(self):
        return ExecutorBrowser, {"webdriver_url": self.server.url}

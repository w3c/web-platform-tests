import pickle
import platform
import os

import pytest

import localpaths
from . import serve
from .serve import Config


@pytest.mark.skipif(platform.uname()[0] == "Windows",
                    reason="Expected contents are platform-dependent")
def test_make_hosts_file_nix():
    c = Config(browser_host="foo.bar",
               alternate_hosts={"alt": "foo2.bar"},
               subdomains={"a", "b"},
               not_subdomains={"x, y"})
    hosts = serve.make_hosts_file(c, "192.168.42.42")
    lines = hosts.split("\n")
    assert set(lines) == {"",
                          "192.168.42.42\tfoo.bar",
                          "192.168.42.42\tfoo2.bar",
                          "192.168.42.42\ta.foo.bar",
                          "192.168.42.42\ta.foo2.bar",
                          "192.168.42.42\tb.foo.bar",
                          "192.168.42.42\tb.foo2.bar"}
    assert lines[-1] == ""

@pytest.mark.skipif(platform.uname()[0] != "Windows",
                    reason="Expected contents are platform-dependent")
def test_make_hosts_file_windows():
    c = Config(browser_host="foo.bar",
               alternate_hosts={"alt": "foo2.bar"},
               subdomains={"a", "b"},
               not_subdomains={"x, y"})
    hosts = serve.make_hosts_file(c, "192.168.42.42")
    lines = hosts.split("\n")
    assert set(lines) == {"",
                          "0.0.0.0\tx.foo.bar",
                          "0.0.0.0\tx.foo2.bar",
                          "0.0.0.0\ty.foo.bar",
                          "0.0.0.0\ty.foo2.bar",
                          "192.168.42.42\tfoo.bar",
                          "192.168.42.42\tfoo2.bar",
                          "192.168.42.42\ta.foo.bar",
                          "192.168.42.42\ta.foo2.bar",
                          "192.168.42.42\tb.foo.bar",
                          "192.168.42.42\tb.foo2.bar"}
    assert lines[-1] == ""


def test_ws_doc_root_default():
    c = Config()
    assert c.ws_doc_root == os.path.join(localpaths.repo_root, "websockets", "handlers")


def test_init_ws_doc_root():
    c = Config(ws_doc_root="/")
    assert c.doc_root == localpaths.repo_root  # check this hasn't changed
    assert c._ws_doc_root == "/"
    assert c.ws_doc_root == "/"


def test_set_ws_doc_root():
    c = Config()
    c.ws_doc_root = "/"
    assert c.doc_root == localpaths.repo_root  # check this hasn't changed
    assert c._ws_doc_root == "/"
    assert c.ws_doc_root == "/"


def test_pickle():
    # Ensure that the config object can be pickled
    pickle.dumps(Config())

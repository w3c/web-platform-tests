import logging
import os

import pytest

import localpaths

from . import config


def test_renamed_are_renamed():
    assert len(set(config._renamed_props.viewkeys()) & set(config._default.viewkeys())) == 0


def test_renamed_exist():
    assert set(config._renamed_props.viewvalues()).issubset(set(config._default.viewkeys()))


@pytest.mark.parametrize("base, override, expected", [
    ({"a": 1}, {"a": 2}, {"a": 2}),
    ({"a": 1}, {"b": 2}, {"a": 1}),
    ({"a": {"b": 1}}, {"a": {}}, {"a": {"b": 1}}),
    ({"a": {"b": 1}}, {"a": {"b": 2}}, {"a": {"b": 2}}),
    ({"a": {"b": 1}}, {"a": {"b": 2, "c": 3}}, {"a": {"b": 2}}),
    pytest.param({"a": {"b": 1}}, {"a": 2}, {"a": 1}, marks=pytest.mark.xfail),
    pytest.param({"a": 1}, {"a": {"b": 2}}, {"a": 1}, marks=pytest.mark.xfail),
])
def test_merge_dict(base, override, expected):
    assert expected == config._merge_dict(base, override)


def test_logger_created():
    c = config.Config()
    assert c.logger is not None


def test_logger_preserved():
    logger = logging.getLogger("test_logger_preserved")
    logger.setLevel(logging.DEBUG)

    c = config.Config(logger=logger)
    assert c.logger is logger


def test_init_basic_prop():
    c = config.Config(browser_host="foo.bar")
    assert c.browser_host == "foo.bar"


def test_init_prefixed_prop():
    c = config.Config(doc_root="/")
    assert c._doc_root == "/"


def test_init_renamed_host():
    logger = logging.getLogger("test_init_renamed_host")
    logger.setLevel(logging.DEBUG)
    handler = logging.handlers.BufferingHandler(100)
    logger.addHandler(handler)

    c = config.Config(logger=logger, host="foo.bar")
    assert c.logger is logger
    assert len(handler.buffer) == 1
    assert "browser_host" in handler.buffer[0].getMessage()  # check we give the new name in the message
    assert not hasattr(c, "host")
    assert c.browser_host == "foo.bar"


def test_init_bogus():
    with pytest.raises(TypeError):
        config.Config(foobar=1)


def test_getitem():
    c = config.Config(browser_host="foo.bar")
    assert c["browser_host"] == "foo.bar"


def test_no_setitem():
    c = config.Config()
    with pytest.raises(TypeError):
        c["browser_host"] = "foo.bar"


def test_iter():
    c = config.Config()
    s = set(iter(c))
    assert "browser_host" in s
    assert "host" not in s
    assert "__getitem__" not in s
    assert "_browser_host" not in s


def test_assignment():
    c = config.Config()
    c.browser_host = "foo.bar"
    assert c.browser_host == "foo.bar"


def test_load_override_basic():
    c = config.Config()
    c.load_overrides({"browser_host": "foo.bar"})
    assert c.browser_host == "foo.bar"


def test_load_override_prefixed():
    c = config.Config()
    c.load_overrides({"doc_root": "/"})
    assert c._doc_root == "/"


def test_load_override_renamed_host():
    logger = logging.getLogger("test_load_override_renamed_host")
    logger.setLevel(logging.DEBUG)
    handler = logging.handlers.BufferingHandler(100)
    logger.addHandler(handler)

    c = config.Config(logger=logger)
    assert c.logger is logger
    assert len(handler.buffer) == 0

    c.load_overrides({"host": "foo.bar"})

    assert len(handler.buffer) == 1
    assert "browser_host" in handler.buffer[0].getMessage()  # check we give the new name in the message
    assert not hasattr(c, "host")
    assert c.browser_host == "foo.bar"


def test_load_override_bogus():
    c = config.Config()
    with pytest.raises(KeyError):
        c.load_overrides({"foobar": 1})


@pytest.mark.xfail(reason="get_port depends on serve.run being called first to setup global logger")
def test_ports_auto():
    c = config.Config(ports={"http": ["auto"]},
                      ssl={"type": "none"})
    ports = c.ports
    assert set(ports.keys()) == {"http"}
    assert isinstance(ports["http"], int)


@pytest.mark.xfail(reason="get_port depends on serve.run being called first to setup global logger")
def test_ports_auto_mutate():
    c = config.Config(ports={"http": [1001]},
                      ssl={"type": "none"})
    orig_ports = c.ports
    assert set(orig_ports.keys()) == {"http"}
    assert orig_ports["http"] == 1001

    c.ports = {"http": ["auto"]}
    new_ports = c.ports
    assert set(new_ports.keys()) == {"http"}
    assert isinstance(new_ports["http"], int)


def test_ports_explicit():
    c = config.Config(ports={"http": [1001]},
                      ssl={"type": "none"})
    ports = c.ports
    assert set(ports.keys()) == {"http"}
    assert ports["http"] == [1001]


def test_ports_no_ssl():
    c = config.Config(ports={"http": [1001], "https": [1002], "ws": [1003], "wss": [1004]},
                      ssl={"type": "none"})
    ports = c.ports
    assert set(ports.keys()) == {"http", "https", "ws", "wss"}
    assert ports["http"] == [1001]
    assert ports["https"] == [None]
    assert ports["ws"] == [1003]
    assert ports["wss"] == [None]


def test_ports_openssl():
    c = config.Config(ports={"http": [1001], "https": [1002], "ws": [1003], "wss": [1004]},
                      ssl={"type": "openssl"})
    ports = c.ports
    assert set(ports.keys()) == {"http", "https", "ws", "wss"}
    assert ports["http"] == [1001]
    assert ports["https"] == [1002]
    assert ports["ws"] == [1003]
    assert ports["wss"] == [1004]


def test_doc_root_default():
    c = config.Config()
    assert c.doc_root == localpaths.repo_root


def test_init_doc_root():
    c = config.Config(doc_root="/")
    assert c._doc_root == "/"
    assert c.doc_root == "/"


def test_set_doc_root():
    c = config.Config()
    c.doc_root = "/"
    assert c._doc_root == "/"
    assert c.doc_root == "/"


def test_ws_doc_root_default():
    c = config.Config()
    assert c.ws_doc_root == os.path.join(localpaths.repo_root, "websockets", "handlers")


def test_ws_doc_root_from_doc_root():
    c = config.Config(doc_root="/foo")
    assert c.ws_doc_root == os.path.join("/foo", "websockets", "handlers")


def test_init_ws_doc_root():
    c = config.Config(ws_doc_root="/")
    assert c.doc_root == localpaths.repo_root  # check this hasn't changed
    assert c._ws_doc_root == "/"
    assert c.ws_doc_root == "/"


def test_set_ws_doc_root():
    c = config.Config()
    c.ws_doc_root = "/"
    assert c.doc_root == localpaths.repo_root  # check this hasn't changed
    assert c._ws_doc_root == "/"
    assert c.ws_doc_root == "/"


def test_server_host_from_browser_host():
    c = config.Config(browser_host="foo.bar")
    assert c.server_host == "foo.bar"


def test_init_server_host():
    c = config.Config(server_host="foo.bar")
    assert c.browser_host == "web-platform.test"  # check this hasn't changed
    assert c._server_host == "foo.bar"
    assert c.server_host == "foo.bar"


def test_set_server_host():
    c = config.Config()
    c.server_host = "/"
    assert c.browser_host == "web-platform.test"  # check this hasn't changed
    assert c._server_host == "/"
    assert c.server_host == "/"


def test_domains():
    c = config.Config(browser_host="foo.bar")
    domains = c.domains
    assert "" in domains
    for k, v in domains.iteritems():
        if k == "":
            assert v == c.browser_host
        else:
            assert v.endswith("." + c.browser_host)


def test_not_domains():
    c = config.Config(browser_host="foo.bar")
    not_domains = c.not_domains
    for k, v in not_domains.iteritems():
        assert v.endswith("." + c.browser_host)


def test_domains_not_domains_intersection():
    c = config.Config(browser_host="foo.bar")
    domains = c.domains
    not_domains = c.not_domains
    assert len(set(domains.iterkeys()) & set(not_domains.iterkeys())) == 0
    assert len(set(domains.itervalues()) & set(not_domains.itervalues())) == 0


def test_all_domains():
    c = config.Config(browser_host="foo.bar")
    domains = c.domains
    not_domains = c.not_domains
    all_domains = c.all_domains
    assert len(all_domains) == (len(domains) + len(not_domains))
    assert all_domains[""] == "foo.bar"


def test_domains_set():
    c = config.Config(browser_host="foo.bar")
    domains_set = c.domains_set
    assert "www.foo.bar" in domains_set


def test_not_domains_set():
    c = config.Config(browser_host="foo.bar")
    not_domains_set = c.not_domains_set
    assert "nonexistent-origin.foo.bar" in not_domains_set


def test_all_domains_set():
    c = config.Config(browser_host="foo.bar")
    all_domains_set = c.all_domains_set
    assert "www.foo.bar" in all_domains_set
    assert "nonexistent-origin.foo.bar" in all_domains_set


def test_ssl_env_override():
    c = config.Config(override_ssl_env="foobar")
    assert c.ssl_env == "foobar"


def test_ssl_env_none():
    c = config.Config(ssl={"type": "none"})
    assert c.ssl_env is not None
    assert c.ssl_env.ssl_enabled is False


def test_ssl_env_openssl():
    c = config.Config(ssl={"type": "openssl", "openssl": {"openssl_binary": "foobar"}})
    assert c.ssl_env is not None
    assert c.ssl_env.ssl_enabled is True
    assert c.ssl_env.binary == "foobar"


def test_ssl_env_bogus():
    c = config.Config(ssl={"type": "foobar"})
    with pytest.raises(ValueError):
        c.ssl_env

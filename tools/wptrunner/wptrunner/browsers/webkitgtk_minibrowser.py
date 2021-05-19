from .base import get_timeout_multiplier, maybe_add_args, certificate_domain_list  # noqa: F401
from .webkit import WebKitBrowser
from ..executors import executor_kwargs as base_executor_kwargs
from ..executors.executorwebdriver import (WebDriverTestharnessExecutor,  # noqa: F401
                                           WebDriverRefTestExecutor,  # noqa: F401
                                           WebDriverCrashtestExecutor)  # noqa: F401
from ..executors.executorwebkit import WebKitDriverWdspecExecutor  # noqa: F401

__wptrunner__ = {"product": "webkitgtk_minibrowser",
                 "check_args": "check_args",
                 "browser": "WebKitGTKMiniBrowser",
                 "browser_kwargs": "browser_kwargs",
                 "executor": {"testharness": "WebDriverTestharnessExecutor",
                              "reftest": "WebDriverRefTestExecutor",
                              "wdspec": "WebKitDriverWdspecExecutor",
                              "crashtest": "WebDriverCrashtestExecutor"},
                 "executor_kwargs": "executor_kwargs",
                 "env_extras": "env_extras",
                 "env_options": "env_options",
                 "run_info_extras": "run_info_extras",
                 "timeout_multiplier": "get_timeout_multiplier"}


def check_args(**kwargs):
    pass


def browser_kwargs(logger, test_type, run_info_data, config, **kwargs):
    # Workaround for https://gitlab.gnome.org/GNOME/libsoup/issues/172
    webdriver_required_args = ["--host=127.0.0.1"]
    webdriver_args = maybe_add_args(webdriver_required_args, kwargs.get("webdriver_args"))
    return {"binary": kwargs["binary"],
            "webdriver_binary": kwargs["webdriver_binary"],
            "webdriver_args": webdriver_args}


def capabilities(server_config, **kwargs):
    browser_required_args = ["--automation",
                            "--javascript-can-open-windows-automatically=true",
                            "--enable-xss-auditor=false",
                            "--enable-media-capabilities=true",
                            "--enable-encrypted-media=true",
                            "--enable-media-stream=true",
                            "--enable-mock-capture-devices=true",
                            "--enable-webaudio=true"]
    args = kwargs.get("binary_args", [])
    args = maybe_add_args(browser_required_args, args)
    return {
        "browserName": "MiniBrowser",
        "webkitgtk:browserOptions": {
            "binary": kwargs["binary"],
            "args": args,
            "certificates": certificate_domain_list(server_config.domains_set, kwargs["host_cert_path"])}}


def executor_kwargs(logger, test_type, test_environment, run_info_data,
                    **kwargs):
    executor_kwargs = base_executor_kwargs(test_type, test_environment, run_info_data, **kwargs)
    executor_kwargs["close_after_done"] = True
    executor_kwargs["capabilities"] = capabilities(test_environment.config, **kwargs)
    return executor_kwargs


def env_extras(**kwargs):
    return []


def env_options():
    return {}


def run_info_extras(**kwargs):
    return {"webkit_port": "gtk"}


class WebKitGTKMiniBrowser(WebKitBrowser):
    def __init__(self, logger, binary=None, webdriver_binary=None,
                 webdriver_args=None, **kwargs):
        WebKitBrowser.__init__(self, logger, binary, webdriver_binary,
                               webdriver_args)

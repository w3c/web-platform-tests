import pytest
import time

from tests.support.asserts import assert_error, assert_success, assert_dialog_handled
from tests.support.fixtures import create_dialog
from tests.support.inline import inline

def read_global(session, name):
    return session.execute_script("return %s;" % name)


def test_title_from_closed_context(session, create_window):
    new_window = create_window()
    session.window_handle = new_window
    session.close()

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_error(result, "no such window")


def test_title_handle_prompt_dismiss(new_session, add_browser_capabilites):
    _, session = new_session({"capabilities": {"alwaysMatch": add_browser_capabilites({"unhandledPromptBehavior": "dismiss"})}})
    session.url = inline("<title>WD doc title</title>")

    expected_title = read_global(session, "document.title")
    create_dialog(session)("alert", text="dismiss #1", result_var="dismiss1")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, expected_title)
    assert_dialog_handled(session, "dismiss #1")
    assert read_global(session, "dismiss1") == None

    expected_title = read_global(session, "document.title")
    create_dialog(session)("confirm", text="dismiss #2", result_var="dismiss2")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, expected_title)
    assert_dialog_handled(session, "dismiss #2")
    assert read_global(session, "dismiss2") == False

    expected_title = read_global(session, "document.title")
    create_dialog(session)("prompt", text="dismiss #3", result_var="dismiss3")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, expected_title)
    assert_dialog_handled(session, "dismiss #3")
    assert read_global(session, "dismiss3") == None


def test_title_handle_prompt_accept(new_session, add_browser_capabilites):
    _, session = new_session({"capabilities": {"alwaysMatch": add_browser_capabilites({"unhandledPromptBehavior": "accept"})}})
    session.url = inline("<title>WD doc title</title>")
    create_dialog(session)("alert", text="accept #1", result_var="accept1")

    expected_title = read_global(session, "document.title")
    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, expected_title)
    assert_dialog_handled(session, "accept #1")
    assert read_global(session, "accept1") == None

    expected_title = read_global(session, "document.title")
    create_dialog(session)("confirm", text="accept #2", result_var="accept2")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, expected_title)
    assert_dialog_handled(session, "accept #2")
    assert read_global(session, "accept2") == True

    expected_title = read_global(session, "document.title")
    create_dialog(session)("prompt", text="accept #3", result_var="accept3")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, expected_title)
    assert_dialog_handled(session, "accept #3")
    assert read_global(session, "accept3") == "" or read_global(session, "accept3") == "undefined"


def test_title_handle_prompt_missing_value(session, create_dialog):
    session.url = inline("<title>WD doc title</title>")
    create_dialog("alert", text="dismiss #1", result_var="dismiss1")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_error(result, "unexpected alert open")
    assert_dialog_handled(session, "dismiss #1")
    assert read_global(session, "dismiss1") == None

    create_dialog("confirm", text="dismiss #2", result_var="dismiss2")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_error(result, "unexpected alert open")
    assert_dialog_handled(session, "dismiss #2")
    assert read_global(session, "dismiss2") == False

    create_dialog("prompt", text="dismiss #3", result_var="dismiss3")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_error(result, "unexpected alert open")
    assert_dialog_handled(session, "dismiss #3")
    assert read_global(session, "dismiss3") == None

# The behavior of the `window.print` function is platform-dependent and may not
# trigger the creation of a dialog at all. Therefore, this test should only be
# run in contexts that support the dialog (a condition that may not be
# determined automatically).
#def test_title_with_non_simple_dialog(session):
#    document = "<title>With non-simple dialog</title><h2>Hello</h2>"
#    spawn = """
#        var done = arguments[0];
#        setTimeout(function() {
#            done();
#        }, 0);
#        setTimeout(function() {
#            window['print']();
#        }, 0);
#    """
#    session.url = inline(document)
#    session.execute_async_script(spawn)
#
#    result = session.transport.send("GET",
#                                    "session/%s/title" % session.session_id)
#    assert_error(result, "unexpected alert open")


def test_title_from_top_context(session):
    session.url = inline("<title>Foobar</title><h2>Hello</h2>")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)
    assert_success(result, read_global(session, "document.title"))


def test_title_with_duplicate_element(session):
    session.url = inline("<title>First</title><title>Second</title>")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, read_global(session, "document.title"))


def test_title_without_element(session):
    session.url = inline("<h2>Hello</h2>")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, read_global(session, "document.title"))


def test_title_after_modification(session):
    session.url = inline("<title>Initial</title><h2>Hello</h2>")
    session.execute_script("document.title = 'updated'")

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, read_global(session, "document.title"))


def test_title_strip_and_collapse(session):
    document = "<title>   a b\tc\nd\t \n e\t\n </title><h2>Hello</h2>"
    session.url = inline(document)

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, read_global(session, "document.title"))


def test_title_from_frame(session, create_frame):
    session.url = inline("<title>Parent</title>parent")

    session.switch_frame(create_frame())
    session.switch_frame(create_frame())

    result = session.transport.send("GET",
                                    "session/%s/title" % session.session_id)

    assert_success(result, "Parent")

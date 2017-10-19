from tests.support.asserts import assert_error, assert_dialog_handled, assert_success
from tests.support.inline import inline
from tests.support.fixtures import create_dialog


# 13.6 Get Element Tag Name

def test_no_browsing_context(session, create_window):
    # 13.6 step 1
    session.window_handle = create_window()
    session.close()

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_error(result, "no such window")


def test_handle_prompt_dismiss(new_session):
    # 13.6 step 2
    _, session = new_session({"capabilities": {"alwaysMatch": {"unhandledPromptBehavior": "dismiss"}}})
    session.url = inline("<input id=foo>")

    create_dialog(session)("alert", text="dismiss #1", result_var="dismiss1")

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_success(result, "foo")
    assert_dialog_handled(session, "dismiss #1")

    create_dialog(session)("confirm", text="dismiss #2", result_var="dismiss2")

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_success(result, "foo")
    assert_dialog_handled(session, "dismiss #2")

    create_dialog(session)("prompt", text="dismiss #3", result_var="dismiss3")

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_success(result, "foo")
    assert_dialog_handled(session, "dismiss #3")


def test_handle_prompt_accept(new_session):
    # 13.6 step 2
    _, session = new_session({"capabilities": {"alwaysMatch": {"unhandledPromptBehavior": "accept"}}})
    session.url = inline("<input id=foo>")

    create_dialog(session)("alert", text="dismiss #1", result_var="dismiss1")

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_success(result, "foo")
    assert_dialog_handled(session, "dismiss #1")

    create_dialog(session)("confirm", text="dismiss #2", result_var="dismiss2")

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_success(result, "foo")
    assert_dialog_handled(session, "dismiss #2")

    create_dialog(session)("prompt", text="dismiss #3", result_var="dismiss3")

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_success(result, "foo")
    assert_dialog_handled(session, "dismiss #3")


def test_handle_prompt_missing_value(session, create_dialog):
    # 13.6 step 2
    session.url = inline("<input id=foo>")

    create_dialog(session)("alert", text="dismiss #1", result_var="dismiss1")

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_error(result, "unexpected alert open")
    assert_dialog_handled(session, "dismiss #1")

    create_dialog(session)("confirm", text="dismiss #2", result_var="dismiss2")

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_error(result, "unexpected alert open")
    assert_dialog_handled(session, "dismiss #2")

    create_dialog(session)("prompt", text="dismiss #3", result_var="dismiss3")

    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_error(result, "unexpected alert open")
    assert_dialog_handled(session, "dismiss #3")


def test_element_not_found(session):
    # 13.6 Step 3
    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id="foo"))

    assert_error(result, "no such element")


def test_element_stale(session):
    # 13.6 step 4
    session.url = inline("<input id=foo>")
    element = session.find.css("input", all=False)
    session.refresh()
    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id=element.id))

    assert_error(result, "stale element reference")


def test_get_element_tag_name(session):
    # 13.6 step 6
    session.url = inline("<input id=foo>")
    element = session.find.css("input", all=False)
    result = session.transport.send("GET", "session/{session_id}/element/{element_id}/name"
                                    .format(session_id=session.session_id,
                                            element_id=element.id))
    assert_success(result, "input")

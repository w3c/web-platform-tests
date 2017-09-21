from tests.support.asserts import assert_error, assert_success
from tests.support.inline import inline

def send_alert_text(session, body=None):
    return session.transport.send("POST", "session/{session_id}/alert/text"
                                  .format(session_id=session.session_id), body)


# 18.4 Send Alert Text

def test_non_string_input(session):
    # 18.4 step 2
    session.url = inline("<p>This is not an editable paragraph.")
    element = session.find.css("p", all=False)
    arr = [1, 2, 3, 4, 5]
    elements = {"null": None,
                "object": element,
                "array": arr,
                "number": 123}
    session.execute_script("window.result = window.prompt(\"Enter Your Name: \", \"Name\");")
    for item in elements:
        body = {"text": elements[item]}
        response = send_alert_text(session, body)
        assert_error(response, "invalid argument")


def test_no_browsing_context(session, create_window):
    # 18.4 step 3
    session.window_handle = create_window()
    session.close()
    body = {"text": "Federer"}
    response = send_alert_text(session, body)
    assert_error(response, "no such window")


def test_no_user_prompt(session):
    # 18.4 step 4
    body = {"text": "Federer"}
    response = send_alert_text(session, body)
    assert_error(response, "no such alert")


def test_alert_element_not_interactable(session):
    # 18.4 step 5
    session.execute_script("window.alert(\"Hello\");")
    body = {"text": "Federer"}
    response = send_alert_text(session, body)
    assert_error(response, "element not interactable")


def test_confirm_element_not_interactable(session):
    # 18.4 step 5
    session.execute_script("window.confirm(\"Hello\");")
    body = {"text": "Federer"}
    response = send_alert_text(session, body)
    assert_error(response, "element not interactable")


def test_send_alert_text(session):
    # 18.4 step 6
    session.execute_script("window.result = window.prompt(\"Enter Your Name: \", \"Name\");")
    body = {"text": "Federer"}
    send_response = send_alert_text(session, body)
    assert_success(send_response)
    accept_response = session.transport.send("POST", "session/{session_id}/alert/accept"
                                             .format(session_id=session.session_id))
    assert_success(accept_response)
    assert session.execute_script("return window.result") == "Federer"


def test_send_alert_text_with_whitespace(session):
    # 18.4 step 6
    session.execute_script("window.result = window.prompt(\"Enter Your Name: \", \"Name\");")
    body = {"text": " Fed erer "}
    send_response = send_alert_text(session, body)
    assert_success(send_response)
    accept_response = session.transport.send("POST", "session/{session_id}/alert/accept"
                                             .format(session_id=session.session_id))
    assert_success(accept_response)
    assert session.execute_script("return window.result") == " Fed erer "

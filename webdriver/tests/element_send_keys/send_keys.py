import pytest

from webdriver import Element
from webdriver.transport import Response

from tests.support.asserts import assert_error, assert_success


def element_send_keys(session, element, text):
    return session.transport.send(
        "POST", "/session/{session_id}/element/{element_id}/value".format(
            session_id=session.session_id,
            element_id=element.id),
        {"text": text})


def test_null_parameter_value(session, http, inline):
    session.url = inline("<input>")
    element = session.find.css("input", all=False)

    path = "/session/{session_id}/element/{element_id}/value".format(
        session_id=session.session_id, element_id=element.id)
    with http.post(path, None) as response:
        assert_error(Response.from_http(response), "invalid argument")


def test_null_response_value(session, inline):
    session.url = inline("<input>")
    element = session.find.css("input", all=False)

    response = element_send_keys(session, element, "foo")
    value = assert_success(response)
    assert value is None


def test_no_top_browsing_context(session, closed_window):
    element = Element("foo", session)
    response = element_send_keys(session, element, "foo")
    assert_error(response, "no such window")

    original_handle, element = closed_window
    response = element_send_keys(session, element, "foo")
    assert_error(response, "no such window")

    session.window_handle = original_handle
    response = element_send_keys(session, element, "foo")
    assert_error(response, "no such element")


def test_no_browsing_context(session, closed_frame):
    element = Element("foo", session)

    response = element_send_keys(session, element, "foo")
    assert_error(response, "no such window")


@pytest.mark.parametrize("value", [True, None, 1, [], {}])
def test_invalid_text_type(session, inline, value):
    session.url = inline("<input>")
    element = session.find.css("input", all=False)

    response = element_send_keys(session, element, value)
    assert_error(response, "invalid argument")


def test_stale_element(session, inline):
    session.url = inline("<input>")
    element = session.find.css("input", all=False)

    session.refresh()

    response = element_send_keys(session, element, "foo")
    assert_error(response, "stale element reference")

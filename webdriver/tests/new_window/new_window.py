from tests.support.asserts import assert_success

from . import opener, window_name


def new_window(session, type_hint=None):
    return session.transport.send(
        "POST", "session/{session_id}/window/new".format(**vars(session)),
        {"type": type_hint})


def test_type_with_window(session):
    original_handles = session.handles

    response = new_window(session, type_hint="window")
    value = assert_success(response)
    handles = session.handles
    assert len(handles) == len(original_handles) + 1
    assert value["handle"] in handles
    assert value["handle"] not in original_handles
    assert value["type"] == "window"


def test_new_window_opens_about_blank(session):
    response = new_window(session, type_hint="window")
    value = assert_success(response)
    assert value["type"] == "window"

    original_handle = session.window_handle
    session.window_handle = value["handle"]
    new_window_url = session.url
    session.window_handle = original_handle
    assert new_window_url == "about:blank"


def test_new_window_sets_no_window_name(session):
    response = new_window(session, type_hint="window")
    value = assert_success(response)
    assert value["type"] == "window"

    original_handle = session.window_handle
    session.window_handle = value["handle"]
    new_window_name = window_name(session)
    session.window_handle = original_handle
    assert new_window_name == ""


def test_new_window_sets_no_opener(session):
    response = new_window(session, type_hint="window")
    value = assert_success(response)
    assert value["type"] == "window"

    original_handle = session.window_handle
    session.window_handle = value["handle"]
    new_window_opener = opener(session)
    session.window_handle = original_handle
    assert new_window_opener is None

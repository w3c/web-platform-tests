from tests.support.asserts import assert_success


def get_window_handles(session):
    return session.transport.send(
        "GET", "session/{session_id}/window/handles".format(**vars(session)))


def test_no_browsing_context(session, create_window):
    window_handles = session.handles

    new_handle = create_window()
    session.window_handle = new_handle
    session.close()

    response = get_window_handles(session)
    assert_success(response, window_handles)


def test_single_window(session):
    response = get_window_handles(session)
    value = assert_success(response)

    assert len(value) == 1
    assert value == session.handles
    assert value[0] == session.window_handle


def test_multiple_windows(session, create_window):
    original_handle = session.window_handle
    new_handle = create_window()

    response = get_window_handles(session)
    value = assert_success(response)

    assert len(value) == 2
    assert original_handle in value
    assert new_handle in value

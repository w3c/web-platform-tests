import pytest

from webdriver.error import NoSuchWindowException


@pytest.fixture
def session_new_window(capabilities, session):
    # Prevent unreleased dragged elements by running the test in a new window.
    original_handle = session.window_handle
    session.window_handle = session.new_window()

    yield session

    try:
        session.window.close()
    except NoSuchWindowException:
        pass

    session.window_handle = original_handle

@pytest.fixture
def key_chain(session):
    return session.actions.sequence("key", "keyboard_id")


@pytest.fixture
def mouse_chain(session):
    return session.actions.sequence(
        "pointer",
        "pointer_id",
        {"pointerType": "mouse"})


@pytest.fixture
def none_chain(session):
    return session.actions.sequence("none", "none_id")


@pytest.fixture(autouse=True)
def release_actions(session, request):
    # release all actions after each test
    # equivalent to a teardown_function, but with access to session fixture
    request.addfinalizer(session.actions.release)


@pytest.fixture
def key_reporter(session, test_actions_page, request):
    """Represents focused input element from `test_keys_page` fixture."""
    input_el = session.find.css("#keys", all=False)
    input_el.click()
    session.execute_script("resetEvents();")
    return input_el


@pytest.fixture
def test_actions_page(session, url):
    session.url = url("/webdriver/tests/perform_actions/support/test_actions_wdspec.html")

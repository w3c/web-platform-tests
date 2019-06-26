import pytest

from webdriver.transport import Response

from tests.support.asserts import assert_error, assert_success


def execute_async_script(session, script, args=None):
    if args is None:
        args = []
    body = {"script": script, "args": args}

    return session.transport.send(
        "POST", "/session/{session_id}/execute/async".format(**vars(session)),
        body)


def test_null_parameter_value(session, http):
    path = "/session/{session_id}/execute/async".format(**vars(session))
    with http.post(path, None) as response:
        assert_error(Response.from_http(response), "invalid argument")


def test_no_browsing_context(session, closed_window):
    response = execute_async_script(session, "argument[0](1);")
    assert_error(response, "no such window")


@pytest.mark.parametrize("expression,expected", [
      ("null", None),
      ("undefined", None),
      ("true", True),
      ("false", False),
      ("23", 23),
      ("'a string'", "a string"),
      (
          # Compute value in the runtime to reduce the potential for
          # interference from encoding literal bytes or escape sequences in
          # Python and HTTP.
          "'a string with a null byte: [' + String.fromCharCode(0) + ']'",
          "a string with a null byte: [\x00]"
      )
    ])
def test_primitive_serialization(session, expression, expected):
    response = execute_async_script(
        session, "arguments[0](%s);" % (expression,)
    )
    assert_success(response)
    assert response.body["value"] == expected


@pytest.mark.parametrize("dialog_type", ["alert", "confirm", "prompt"])
def test_abort_by_user_prompt(session, dialog_type):
    response = execute_async_script(
        session,
        "window.{}('Hello'); arguments[0](1);".format(dialog_type))
    assert_success(response, None)

    session.alert.accept()


@pytest.mark.parametrize("dialog_type", ["alert", "confirm", "prompt"])
def test_abort_by_user_prompt_twice(session, dialog_type):
    response = execute_async_script(
        session,
        "window.{0}('Hello'); window.{0}('Bye'); arguments[0](1);".format(dialog_type))
    assert_success(response, None)

    session.alert.accept()

    # The first alert has been accepted by the user prompt handler, the second one remains.
    # FIXME: this is how browsers currently work, but the spec should clarify if this is the
    #        expected behavior, see https://github.com/w3c/webdriver/issues/1153.
    assert session.alert.text == "Bye"

    session.alert.accept()

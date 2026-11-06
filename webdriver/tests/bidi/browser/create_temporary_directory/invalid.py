import base64
import pytest

import webdriver.bidi.error as error
from tests.bidi import get_invalid_cases

pytestmark = pytest.mark.asyncio


@pytest.mark.parametrize("value", get_invalid_cases("list"))
async def test_params_entries_invalid_type(bidi_session, value):
    with pytest.raises(error.InvalidArgumentException):
        await bidi_session.browser.create_temporary_directory(entries=value)


@pytest.mark.parametrize("value", get_invalid_cases("dict"))
async def test_params_entry_invalid_type(bidi_session, value):
    with pytest.raises(error.InvalidArgumentException):
        await bidi_session.browser.create_temporary_directory(entries=[value])


@pytest.mark.parametrize(
    "invalid_path",
    [
        "",
        "/absolute/path.txt",
        "../escape.txt",
        "a/../../escape.txt",
    ],
)
async def test_params_entry_invalid_path(bidi_session, invalid_path):
    with pytest.raises(error.InvalidArgumentException):
        await bidi_session.browser.create_temporary_directory(
            entries=[{"type": "file", "path": invalid_path}]
        )


async def test_params_file_both_data_and_size(bidi_session):
    with pytest.raises(error.InvalidArgumentException):
        await bidi_session.browser.create_temporary_directory(
            entries=[
                {
                    "type": "file",
                    "path": "both.txt",
                    "data": base64.b64encode(b"abc").decode("ascii"),
                    "size": 3,
                }
            ]
        )


async def test_params_file_invalid_base64(bidi_session):
    with pytest.raises(error.InvalidBase64Exception):
        await bidi_session.browser.create_temporary_directory(
            entries=[
                {
                    "type": "file",
                    "path": "bad.txt",
                    "data": "!!!not_valid_base64!!!",
                }
            ]
        )


async def test_params_symlink_target_escaping_root(bidi_session):
    with pytest.raises(error.InvalidArgumentException):
        await bidi_session.browser.create_temporary_directory(
            entries=[
                {
                    "type": "symlink",
                    "path": "sub/link",
                    "target": "../outside",
                }
            ]
        )

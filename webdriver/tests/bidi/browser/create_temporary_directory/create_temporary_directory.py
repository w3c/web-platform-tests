import base64
import pytest

pytestmark = pytest.mark.asyncio


async def test_create_empty_temporary_directory(bidi_session):
    result = await bidi_session.browser.create_temporary_directory()
    assert isinstance(result["path"], str)
    assert len(result["path"]) > 0


async def test_create_temporary_directory_with_entries(bidi_session):
    data = base64.b64encode(b"Hello BiDi\n").decode("ascii")
    result = await bidi_session.browser.create_temporary_directory(
        entries=[
            {
                "type": "directory",
                "path": "nested/dir",
            },
            {
                "type": "file",
                "path": "nested/dir/hello.txt",
                "data": data,
            },
            {
                "type": "file",
                "path": "zeroes.bin",
                "size": 32,
            },
            {
                "type": "symlink",
                "path": "link_to_hello.txt",
                "target": "nested/dir/hello.txt",
            },
        ]
    )
    assert isinstance(result["path"], str)
    assert len(result["path"]) > 0


async def test_create_temporary_directory_permissions_descending_depth(
    bidi_session,
):
    # Setting writable=False on a parent directory before creating a child file
    # inside it must succeed because permissions are applied in descending
    # depth order in a second pass.
    result = await bidi_session.browser.create_temporary_directory(
        entries=[
            {
                "type": "directory",
                "path": "ro_parent",
                "permissions": {
                    "readable": True,
                    "writable": False,
                    "executable": True,
                },
            },
            {
                "type": "file",
                "path": "ro_parent/child.txt",
                "data": base64.b64encode(b"inside ro_parent").decode("ascii"),
            },
        ]
    )
    assert isinstance(result["path"], str)

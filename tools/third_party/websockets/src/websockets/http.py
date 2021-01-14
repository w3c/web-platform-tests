"""
:mod:`websockets.http` module provides basic HTTP/1.1 support. It is merely
:adequate for WebSocket handshake messages.

These APIs cannot be imported from :mod:`websockets`. They must be imported
from :mod:`websockets.http`.

"""

import asyncio
import re
import sys
from typing import (
    Any,
    Dict,
    Iterable,
    Iterator,
    List,
    Mapping,
    MutableMapping,
    Tuple,
    Union,
)

from .version import version as websockets_version


__all__ = [
    "read_request",
    "read_response",
    "Headers",
    "MultipleValuesError",
    "USER_AGENT",
]

MAX_HEADERS = 256
MAX_LINE = 4096

USER_AGENT = f"Python/{sys.version[:3]} websockets/{websockets_version}"


def d(value: bytes) -> str:
    """
    Decode a bytestring for interpolating into an error message.

    """
    return value.decode(errors="backslashreplace")


# See https://tools.ietf.org/html/rfc7230#appendix-B.

# Regex for validating header names.

_token_re = re.compile(rb"[-!#$%&\'*+.^_`|~0-9a-zA-Z]+")

# Regex for validating header values.

# We don't attempt to support obsolete line folding.

# Include HTAB (\x09), SP (\x20), VCHAR (\x21-\x7e), obs-text (\x80-\xff).

# The ABNF is complicated because it attempts to express that optional
# whitespace is ignored. We strip whitespace and don't revalidate that.

# See also https://www.rfc-editor.org/errata_search.php?rfc=7230&eid=4189

_value_re = re.compile(rb"[\x09\x20-\x7e\x80-\xff]*")


async def read_request(stream: asyncio.StreamReader) -> Tuple[str, "Headers"]:
    """
    Read an HTTP/1.1 GET request and return ``(path, headers)``.

    ``path`` isn't URL-decoded or validated in any way.

    ``path`` and ``headers`` are expected to contain only ASCII characters.
    Other characters are represented with surrogate escapes.

    :func:`read_request` doesn't attempt to read the request body because
    WebSocket handshake requests don't have one. If the request contains a
    body, it may be read from ``stream`` after this coroutine returns.

    :param stream: input to read the request from
    :raises EOFError: if the connection is closed without a full HTTP request
    :raises SecurityError: if the request exceeds a security limit
    :raises ValueError: if the request isn't well formatted

    """
    # https://tools.ietf.org/html/rfc7230#section-3.1.1

    # Parsing is simple because fixed values are expected for method and
    # version and because path isn't checked. Since WebSocket software tends
    # to implement HTTP/1.1 strictly, there's little need for lenient parsing.

    try:
        request_line = await read_line(stream)
    except EOFError as exc:
        raise EOFError("connection closed while reading HTTP request line") from exc

    try:
        method, raw_path, version = request_line.split(b" ", 2)
    except ValueError:  # not enough values to unpack (expected 3, got 1-2)
        raise ValueError(f"invalid HTTP request line: {d(request_line)}") from None

    if method != b"GET":
        raise ValueError(f"unsupported HTTP method: {d(method)}")
    if version != b"HTTP/1.1":
        raise ValueError(f"unsupported HTTP version: {d(version)}")
    path = raw_path.decode("ascii", "surrogateescape")

    headers = await read_headers(stream)

    return path, headers


async def read_response(stream: asyncio.StreamReader) -> Tuple[int, str, "Headers"]:
    """
    Read an HTTP/1.1 response and return ``(status_code, reason, headers)``.

    ``reason`` and ``headers`` are expected to contain only ASCII characters.
    Other characters are represented with surrogate escapes.

    :func:`read_request` doesn't attempt to read the response body because
    WebSocket handshake responses don't have one. If the response contains a
    body, it may be read from ``stream`` after this coroutine returns.

    :param stream: input to read the response from
    :raises EOFError: if the connection is closed without a full HTTP response
    :raises SecurityError: if the response exceeds a security limit
    :raises ValueError: if the response isn't well formatted

    """
    # https://tools.ietf.org/html/rfc7230#section-3.1.2

    # As in read_request, parsing is simple because a fixed value is expected
    # for version, status_code is a 3-digit number, and reason can be ignored.

    try:
        status_line = await read_line(stream)
    except EOFError as exc:
        raise EOFError("connection closed while reading HTTP status line") from exc

    try:
        version, raw_status_code, raw_reason = status_line.split(b" ", 2)
    except ValueError:  # not enough values to unpack (expected 3, got 1-2)
        raise ValueError(f"invalid HTTP status line: {d(status_line)}") from None

    if version != b"HTTP/1.1":
        raise ValueError(f"unsupported HTTP version: {d(version)}")
    try:
        status_code = int(raw_status_code)
    except ValueError:  # invalid literal for int() with base 10
        raise ValueError(f"invalid HTTP status code: {d(raw_status_code)}") from None
    if not 100 <= status_code < 1000:
        raise ValueError(f"unsupported HTTP status code: {d(raw_status_code)}")
    if not _value_re.fullmatch(raw_reason):
        raise ValueError(f"invalid HTTP reason phrase: {d(raw_reason)}")
    reason = raw_reason.decode()

    headers = await read_headers(stream)

    return status_code, reason, headers


async def read_headers(stream: asyncio.StreamReader) -> "Headers":
    """
    Read HTTP headers from ``stream``.

    Non-ASCII characters are represented with surrogate escapes.

    """
    # https://tools.ietf.org/html/rfc7230#section-3.2

    # We don't attempt to support obsolete line folding.

    headers = Headers()
    for _ in range(MAX_HEADERS + 1):
        try:
            line = await read_line(stream)
        except EOFError as exc:
            raise EOFError("connection closed while reading HTTP headers") from exc
        if line == b"":
            break

        try:
            raw_name, raw_value = line.split(b":", 1)
        except ValueError:  # not enough values to unpack (expected 2, got 1)
            raise ValueError(f"invalid HTTP header line: {d(line)}") from None
        if not _token_re.fullmatch(raw_name):
            raise ValueError(f"invalid HTTP header name: {d(raw_name)}")
        raw_value = raw_value.strip(b" \t")
        if not _value_re.fullmatch(raw_value):
            raise ValueError(f"invalid HTTP header value: {d(raw_value)}")

        name = raw_name.decode("ascii")  # guaranteed to be ASCII at this point
        value = raw_value.decode("ascii", "surrogateescape")
        headers[name] = value

    else:
        raise websockets.exceptions.SecurityError("too many HTTP headers")

    return headers


async def read_line(stream: asyncio.StreamReader) -> bytes:
    """
    Read a single line from ``stream``.

    CRLF is stripped from the return value.

    """
    # Security: this is bounded by the StreamReader's limit (default = 32 KiB).
    line = await stream.readline()
    # Security: this guarantees header values are small (hard-coded = 4 KiB)
    if len(line) > MAX_LINE:
        raise websockets.exceptions.SecurityError("line too long")
    # Not mandatory but safe - https://tools.ietf.org/html/rfc7230#section-3.5
    if not line.endswith(b"\r\n"):
        raise EOFError("line without CRLF")
    return line[:-2]


class MultipleValuesError(LookupError):
    """
    Exception raised when :class:`Headers` has more than one value for a key.

    """

    def __str__(self) -> str:
        # Implement the same logic as KeyError_str in Objects/exceptions.c.
        if len(self.args) == 1:
            return repr(self.args[0])
        return super().__str__()


class Headers(MutableMapping[str, str]):
    """
    Efficient data structure for manipulating HTTP headers.

    A :class:`list` of ``(name, values)`` is inefficient for lookups.

    A :class:`dict` doesn't suffice because header names are case-insensitive
    and multiple occurrences of headers with the same name are possible.

    :class:`Headers` stores HTTP headers in a hybrid data structure to provide
    efficient insertions and lookups while preserving the original data.

    In order to account for multiple values with minimal hassle,
    :class:`Headers` follows this logic:

    - When getting a header with ``headers[name]``:
        - if there's no value, :exc:`KeyError` is raised;
        - if there's exactly one value, it's returned;
        - if there's more than one value, :exc:`MultipleValuesError` is raised.

    - When setting a header with ``headers[name] = value``, the value is
      appended to the list of values for that header.

    - When deleting a header with ``del headers[name]``, all values for that
      header are removed (this is slow).

    Other methods for manipulating headers are consistent with this logic.

    As long as no header occurs multiple times, :class:`Headers` behaves like
    :class:`dict`, except keys are lower-cased to provide case-insensitivity.

    Two methods support support manipulating multiple values explicitly:

    - :meth:`get_all` returns a list of all values for a header;
    - :meth:`raw_items` returns an iterator of ``(name, values)`` pairs.

    """

    __slots__ = ["_dict", "_list"]

    def __init__(self, *args: Any, **kwargs: str) -> None:
        self._dict: Dict[str, List[str]] = {}
        self._list: List[Tuple[str, str]] = []
        # MutableMapping.update calls __setitem__ for each (name, value) pair.
        self.update(*args, **kwargs)

    def __str__(self) -> str:
        return "".join(f"{key}: {value}\r\n" for key, value in self._list) + "\r\n"

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}({self._list!r})"

    def copy(self) -> "Headers":
        copy = self.__class__()
        copy._dict = self._dict.copy()
        copy._list = self._list.copy()
        return copy

    # Collection methods

    def __contains__(self, key: object) -> bool:
        return isinstance(key, str) and key.lower() in self._dict

    def __iter__(self) -> Iterator[str]:
        return iter(self._dict)

    def __len__(self) -> int:
        return len(self._dict)

    # MutableMapping methods

    def __getitem__(self, key: str) -> str:
        value = self._dict[key.lower()]
        if len(value) == 1:
            return value[0]
        else:
            raise MultipleValuesError(key)

    def __setitem__(self, key: str, value: str) -> None:
        self._dict.setdefault(key.lower(), []).append(value)
        self._list.append((key, value))

    def __delitem__(self, key: str) -> None:
        key_lower = key.lower()
        self._dict.__delitem__(key_lower)
        # This is inefficent. Fortunately deleting HTTP headers is uncommon.
        self._list = [(k, v) for k, v in self._list if k.lower() != key_lower]

    def __eq__(self, other: Any) -> bool:
        if not isinstance(other, Headers):
            return NotImplemented
        return self._list == other._list

    def clear(self) -> None:
        """
        Remove all headers.

        """
        self._dict = {}
        self._list = []

    # Methods for handling multiple values

    def get_all(self, key: str) -> List[str]:
        """
        Return the (possibly empty) list of all values for a header.

        :param key: header name

        """
        return self._dict.get(key.lower(), [])

    def raw_items(self) -> Iterator[Tuple[str, str]]:
        """
        Return an iterator of all values as ``(name, value)`` pairs.

        """
        return iter(self._list)


HeadersLike = Union[Headers, Mapping[str, str], Iterable[Tuple[str, str]]]


# at the bottom to allow circular import, because AbortHandshake depends on HeadersLike
import websockets.exceptions  # isort:skip # noqa

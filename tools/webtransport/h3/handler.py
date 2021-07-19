from typing import List, Tuple

from .webtransport_h3_server import WebTransportSession

# This file exists for documentation purpose.

def connect_received(path: str, response_headers: List[Tuple[bytes, bytes]]) -> None:
    """
    Called whenever an extended CONNECT method is received.

    :param path: Value of ``:path`` pseudo header in the CONNECT method.
    :param response_headers: The response headers which will be sent to the peer. ``:status`` is set
                             to 200 when it isn't specified.
    """
    pass


def session_established(session: WebTransportSession) -> None:
    """
    Called whenever a WebTransport session is established.

    :param session: A WebTransport session object.
    """
    pass


def stream_data_received(session: WebTransportSession, stream_id: int, data: bytes, stream_ended: bool) -> None:
    """
    Called whenever data is received on a WebTransport stream.

    :param session: A WebTransport session object.
    :param stream_id: The ID of the stream.
    :param data: The received data.
    :param stream_ended: Whether the stream is ended.
    """
    pass


def datagram_received(session: WebTransportSession, data: bytes) -> None:
    """
    Called whenever a datagram is received on a WebTransport session.

    :param session: A WebTransport session object.
    :param data: The received data.
    """
    pass

# Message passing API

`dispatcher.js` (and its server-side backend `dispatcher.py`) provide
a universal queue-based message passing API.
Each queue is identified by a UUID, and accessed via the following APIs:

- `send()` pushes a string.
- `receive()` pops the first item.
- `showRequestHeaders()` and `cacheableShowRequestHeaders()` return URLs,
  that push request headers upon fetching.
- `reportToHeaders()` and `receiveReport()` for reporting API.

It works cross-origin, and even access different browser context groups.

Messages are queued, this means one doesn't need to wait for the receiver to
listen, before sending the first message
(but still need to wait for the resolution of the promise returned by `send()`
to ensure the order between `send()`s).

# Executor framework

The message passing API can be used for sending arbitrary javascript to be
evaluated in another page or worker (the "executor").

`executor.html` (as a Document) or `executor.js` (as a Web Worker) are examples
of executors.
Test can send arbitrary javascript to these executors to evaluate in its
execution context.

This is universal and avoids introducing many specific `XXX-helper.html`
resources.
Moreover, tests are easier to read,
because the whole logic of the test can be defined in a single file.

// META: script=websocket.sub.js

var testOpen = async_test("W3C WebSocket API - Create WebSocket - Pass a valid URL and a protocol string - Connection should be opened");
var testClose = async_test("W3C WebSocket API - Create WebSocket - Pass a valid URL and a protocol string - Connection should be closed");

var wsocket = CreateWebSocket(false, true, false);
var isOpenCalled = false;

wsocket.addEventListener('open', testOpen.step_func(function(evt) {
  assert_equals(wsocket.readyState, 1, "readyState should be 1(OPEN)");
  wsocket.close();
  isOpenCalled = true;
  testOpen.done();
}), true);

wsocket.addEventListener('close', testClose.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be open");
  assert_equals(evt.wasClean, true, "wasClean should be true");
  testClose.done();
}), true);

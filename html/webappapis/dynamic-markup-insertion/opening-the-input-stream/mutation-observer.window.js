async_test(t => {
  const frame = document.body.appendChild(document.createElement("iframe"));
  t.add_cleanup(() => { frame.remove(); });
  const originalHTMLElement = frame.contentDocument.documentElement;
  assert_equals(originalHTMLElement.localName, "html");
  let sync = true;
  const observer = new frame.contentWindow.MutationObserver(t.step_func_done(records => {
    assert_false(sync);
    assert_equals(records.length, 1);
    assert_equals(records[0].type, "childList");
    assert_equals(records[0].target, frame.contentDocument);
    assert_array_equals(records[0].addedNodes, []);
    assert_array_equals(records[0].removedNodes, [originalHTMLElement]);
  }));
  observer.observe(frame.contentDocument, { childList: true });
  assert_equals(frame.contentDocument.open(), frame.contentDocument);
  sync = false;
}, "document.open() should inform mutation observer of node removal");

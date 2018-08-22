async_test(t => {
  const iframe = document.body.appendChild(document.createElement("iframe"));
  t.add_cleanup(() => { iframe.remove(); });
  self.testSynchronousScript = t.step_func(() => {
    // Here, the entry settings object is still the iframe's. Delay it in such
    // a way that makes the entry settings object the top-level page's, but
    // without delaying too much that the parser becomes inactive. A microtask
    // is perfect as it's executed in "clean up after running script".
    Promise.resolve().then(t.step_func_done(() => {
      assert_throws("InvalidStateError", () => {
        iframe.contentDocument.open();
      }, "opening an XML document should throw");
    }));
  });
  iframe.src = "resources/bailout-order-xml-with-synchronous-script-frame.xhtml";
}, "document.open should throw an InvalidStateError with XML document even when there is an active parser executing script");

for (const ev of ["beforeunload", "pagehide", "unload"]) {
  async_test(t => {
    const iframe = document.body.appendChild(document.createElement("iframe"));
    t.add_cleanup(() => { iframe.remove(); });
    iframe.addEventListener("load", t.step_func(() => {
      iframe.contentWindow.addEventListener(ev, t.step_func_done(() => {
        assert_throws("InvalidStateError", () => {
          iframe.contentDocument.open();
        }, "opening an XML document should throw");
      }));
      iframe.src = "about:blank";
    }), { once: true });
    iframe.src = "/common/dummy.xhtml";
  }, `document.open should throw an InvalidStateError with XML document even when the ignore-opens-during-unload counter is greater than 0 (during ${ev} event)`);
}

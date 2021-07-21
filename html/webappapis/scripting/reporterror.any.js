test(t => {
  let happened = false;
  self.onerror = e => {
    happened = true;
    alert(typeof e);
    assert_equals(e.error, 1);
  };
  self.addEventListener("x", () => { throw 1 });
  self.dispatchEvent(new Event("x"));
  //self.reportError(1);
  assert_true(happened);
});

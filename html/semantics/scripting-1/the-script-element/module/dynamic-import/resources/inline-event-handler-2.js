const div = document.getElementById('div');

promise_test(t => {
  const promise = new Promise(resolve => window.continueTest = resolve);

  // Here, the mousedown event handler is called synchronously here, so the
  // execution context stack at the time of dynamic import call there
  // should be:
  // #0. realm execution context, with [[ScriptOrModule]] == null
  //       (pushed by #prepare-to-run-script from #run-a-classic-script)
  // #1. scriptContext,
  //       with [[ScriptOrModule]] == `inline-event-handler-2.js`'s record
  //       (pushed by ScriptEvaluation from #run-a-classic-script)
  // #2. realm execution context, with [[ScriptOrModule]] == null
  //       (pushed by #prepare-to-run-script from
  //        https://heycam.github.io/webidl/#call-a-user-objects-operation)
  // #3. calleeContext, with [[ScriptOrModule]] == null set in
  //     #getting-the-current-value-of-the-event-handler
  //       (pushed by PrepareForOrdinaryCall from
  //        https://heycam.github.io/webidl/#call-a-user-objects-operation)
  // And https://tc39.es/ecma262/#sec-getactivescriptormodule
  // should return #1's ScriptOrModule.
  // Therefore, the base URL used for the dynamic import should be
  // `.../dynamic-import/resources/inline-event-handler-2.js`, not the settings
  // object's base URL == `.../dynamic-import/inline-event-handler-2.html`.
  const event = new MouseEvent('mousedown', {'button': 1});
  div.dispatchEvent(event);

  return promise.then(module => {
    assert_true(window.evaluated_imports_a);
    assert_equals(module.A["from"], "dynamic-import/imports-a.js");
    div.parentNode.removeChild(div);
  });
},
"When triggered from inline event handlers triggered from external scripts, " +
"dynamic import's base URL should be that of the external scripts");

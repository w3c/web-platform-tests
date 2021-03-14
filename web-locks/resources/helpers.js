// Test helpers used by multiple Web Locks API tests.
(() => {

  // Generate a unique resource identifier, using the script path and
  // test case name. This is useful to avoid lock interference between
  // test cases.
  let res_num = 0;
  self.uniqueName = (testCase, prefix) => {
    return `${self.location.pathname}-${prefix}-${testCase.name}-${++res_num}`;
  };

  // Inject an iframe showing the given url into the page, and resolve
  // the returned promise when the frame is loaded.
  self.iframe = url => new Promise(resolve => {
    const element = document.createElement('iframe');
    element.addEventListener(
      'load', () => { resolve(element); }, { once: true });
    element.src = url;
    document.documentElement.appendChild(element);
  });

  // Post a message to the target frame, and resolve the returned
  // promise when a response comes back. The posted data is annotated
  // with unique id to track the response. This assumes the use of
  // 'iframe.html' as the frame, which implements this protocol.
  let next_request_id = 0;
  self.postToFrameAndWait = (frame, data) => {
    const iframe_window = frame.contentWindow;
    data.rqid = next_request_id++;
    iframe_window.postMessage(data, '*');
    return new Promise(resolve => {
      const listener = event => {
        if (event.source !== iframe_window || event.data.rqid !== data.rqid)
          return;
        self.removeEventListener('message', listener);
        resolve(event.data);
      };
      self.addEventListener('message', listener);
    });
  };

  // Post a message to the target worker, and resolve the returned
  // promise when a response comes back. The posted data is annotated
  // with unique id to track the response. This assumes the use of
  // 'worker.js' as the worker, which implements this protocol.
  self.postToWorkerAndWait = (worker, data) => {
    return new Promise((resolve, reject) => {
      data.rqid = next_request_id++;
      worker.postMessage(data);
      const listener = event => {
        if (event.data.rqid !== data.rqid)
          return;
        worker.removeEventListener('message', listener);
        resolve(event.data);
      };
      worker.addEventListener('message', listener);

      // Registering this handler helps to avoid test timeouts in browsers that
      // do not implement the API. This approach is not used in
      // `postToFrameAndWait` because iframe elements are not specified to emit
      // an `error` event for uncaught exceptions.
      worker.addEventListener('error', e => reject(e && e.message));
    });
  };

})();

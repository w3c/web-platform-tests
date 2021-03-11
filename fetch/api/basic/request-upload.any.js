// META: global=window,worker
// META: script=../resources/utils.js
// META: script=/common/utils.js
// META: script=/common/get-host-info.sub.js

function testUpload(desc, url, method, createBody, expectedBody) {
  const requestInit = {"method": method}
  promise_test(function(test){
    const body = createBody();
    if (body) {
      requestInit["body"] = body;
    }
    return fetch(url, requestInit).then(function(resp) {
      return resp.text().then((text)=> {
        assert_equals(text, expectedBody);
      });
    });
  }, desc);
}

function testUploadFailure(desc, url, method, createBody) {
  const requestInit = {"method": method};
  promise_test(t => {
    const body = createBody();
    if (body) {
      requestInit["body"] = body;
    }
    return promise_rejects_js(t, TypeError, fetch(url, requestInit));
  }, desc);
}

const url = RESOURCES_DIR + "echo-content.py"

testUpload("Fetch with PUT with body", url,
  "PUT",
  () => "Request's body",
  "Request's body");
testUpload("Fetch with POST with text body", url,
  "POST",
  () => "Request's body",
  "Request's body");
testUpload("Fetch with POST with URLSearchParams body", url,
  "POST",
  () => new URLSearchParams("name=value"),
  "name=value");
testUpload("Fetch with POST with Blob body", url,
  "POST",
  () => new Blob(["Test"]),
  "Test");
testUpload("Fetch with POST with ArrayBuffer body", url,
  "POST",
  () => new ArrayBuffer(4),
  "\0\0\0\0");
testUpload("Fetch with POST with Uint8Array body", url,
  "POST",
  () => new Uint8Array(4),
  "\0\0\0\0");
testUpload("Fetch with POST with Int8Array body", url,
  "POST",
  () => new Int8Array(4),
  "\0\0\0\0");
testUpload("Fetch with POST with Float32Array body", url,
  "POST",
  () => new Float32Array(1),
  "\0\0\0\0");
testUpload("Fetch with POST with Float64Array body", url,
  "POST",
  () => new Float64Array(1),
  "\0\0\0\0\0\0\0\0");
testUpload("Fetch with POST with DataView body", url,
  "POST",
  () => new DataView(new ArrayBuffer(8), 0, 4),
  "\0\0\0\0");
testUpload("Fetch with POST with Blob body with mime type", url,
  "POST",
  () => new Blob(["Test"], { type: "text/maybe" }),
  "Test");
testUpload("Fetch with POST with ReadableStream", url,
  "POST",
  () => {
    return new ReadableStream({start: controller => {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode("Test"));
      controller.close();
    }})
  },
  "Test");
testUploadFailure("Fetch with POST with ReadableStream containing String", url,
  "POST",
  () => {
    return new ReadableStream({start: controller => {
      controller.enqueue("Test");
      controller.close();
    }})
  });
testUploadFailure("Fetch with POST with ReadableStream containing null", url,
  "POST",
  () => {
    return new ReadableStream({start: controller => {
      controller.enqueue(null);
      controller.close();
    }})
  });
testUploadFailure("Fetch with POST with ReadableStream containing number", url,
  "POST",
  () => {
    return new ReadableStream({start: controller => {
      controller.enqueue(99);
      controller.close();
    }})
  });
testUploadFailure("Fetch with POST with ReadableStream containing ArrayBuffer", url,
  "POST",
  () => {
    return new ReadableStream({start: controller => {
      controller.enqueue(new ArrayBuffer());
      controller.close();
    }})
  });
testUploadFailure("Fetch with POST with ReadableStream containing Blob", url,
  "POST",
  () => {
    return new ReadableStream({start: controller => {
      controller.enqueue(new Blob());
      controller.close();
    }})
  });

promise_test(async (test) => {
  const resp = await fetch(
    "/fetch/connection-pool/resources/network-partition-key.py?"
    + `status=421&uuid=${token()}&partition_id=${get_host_info().ORIGIN}`
    + `&dispatch=check_partition&addcounter=true`,
    {method: "POST", body: "foobar"});
  assert_equals(resp.status, 421);
  const text = await resp.text();
  assert_equals(text, "ok. Request was sent 2 times. 2 connections were created.");
}, "Fetch with POST with text body on 421 response should be retried once on new connection.");

promise_test(async (test) => {
  const body = new ReadableStream({start: controller => {
    const encoder = new TextEncoder();
    controller.enqueue(encoder.encode("Test"));
    controller.close();
  }});
  const resp = await fetch(
    "/fetch/connection-pool/resources/network-partition-key.py?"
    + `status=421&uuid=${token()}&partition_id=${get_host_info().ORIGIN}`
    + `&dispatch=check_partition&addcounter=true`,
    {method: "POST", body: body});
  assert_equals(resp.status, 421);
  const text = await resp.text();
  assert_equals(text, "ok. Request was sent 1 times. 1 connections were created.");
}, "Fetch with POST with ReadableStream on 421 response should return the response and not retry.");


promise_test(async (test) => {
  const resp = await fetch(
    "/fetch/connection-pool/resources/network-partition-key.py?"
    + `status=425&uuid=${token()}&partition_id=${get_host_info().ORIGIN}`
    + `&dispatch=check_partition&addcounter=true`,
    {method: "POST", body: "foobar"});
  assert_equals(resp.status, 425);
  const text = await resp.text();
  assert_equals(text, "ok. Request was sent 2 times. 2 connections were created.");
}, "Fetch with POST with text body on 425 response should be retried once on new connection.");

promise_test(async (test) => {
  const body = new ReadableStream({start: controller => {
    const encoder = new TextEncoder();
    controller.enqueue(encoder.encode("Test"));
    controller.close();
  }});
  const resp = await fetch(
    "/fetch/connection-pool/resources/network-partition-key.py?"
    + `status=425&uuid=${token()}&partition_id=${get_host_info().ORIGIN}`
    + `&dispatch=check_partition&addcounter=true`,
    {method: "POST", body: body});
  assert_equals(resp.status, 425);
  const text = await resp.text();
  assert_equals(text, "ok. Request was sent 1 times. 1 connections were created.");
}, "Fetch with POST with ReadableStream on 425 response should return the response and not retry.");
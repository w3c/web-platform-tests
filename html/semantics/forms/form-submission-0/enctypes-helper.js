(() => {
  // Using echo-content-escaped.py rather than
  // /fetch/api/resources/echo-content.py to work around WebKit not
  // percent-encoding \x00, which causes the response to be detected as
  // a binary file and served as a download.
  const ACTION_URL = "/FileAPI/file/resources/echo-content-escaped.py";

  const IFRAME_NAME = "formtargetframe";

  // Undoes the escapes from /fetch/api/resources/echo-content.py
  function unescape(str) {
    return str
      .replace(/\r\n?|\n/g, "\r\n")
      .replace(
        /\\x[0-9A-Fa-f]{2}/g,
        (escape) => String.fromCodePoint(parseInt(escape.substring(2), 16)),
      )
      .replace(/\\\\/g, "\\");
  }

  // `expectedBuilder` is a function that takes in the actual form body
  // (necessary to get the multipart/form-data payload) and returns the form
  // body that should be expected.
  // If `testFormData` is false, the form entry will be submitted in for
  // controls. If it is true, it will submitted by modifying the entry list
  // during the `formdata` event.
  async function formSubmissionTest({
    name,
    value,
    expectedBuilder,
    enctype,
    formEncoding,
    testFormData = false,
    testCase,
  }) {
    if (document.readyState !== "complete") {
      await new Promise((resolve) => addEventListener("load", resolve));
    }

    const formTargetFrame = Object.assign(document.createElement("iframe"), {
      name: IFRAME_NAME,
    });
    document.body.append(formTargetFrame);
    testCase.add_cleanup(() => {
      document.body.removeChild(formTargetFrame);
    });

    const form = Object.assign(document.createElement("form"), {
      acceptCharset: formEncoding,
      action: ACTION_URL,
      method: "POST",
      enctype,
      target: IFRAME_NAME,
    });
    document.body.append(form);
    testCase.add_cleanup(() => {
      document.body.removeChild(form);
    });

    if (!testFormData) {
      const input = document.createElement("input");
      input.name = name;
      if (value instanceof File) {
        input.type = "file";
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(value);
        input.files = dataTransfer.files;
      } else {
        input.type = "hidden";
        input.value = value;
      }
      form.append(input);
    } else {
      form.addEventListener("formdata", (evt) => {
        evt.formData.append(name, value);
      });
    }

    await new Promise((resolve) => {
      form.submit();
      formTargetFrame.onload = resolve;
    });

    const serialized = unescape(
      formTargetFrame.contentDocument.body.textContent,
    );
    const expected = expectedBuilder(serialized);
    assert_equals(serialized, expected);
  }

  // This function returns a function to add individual form tests corresponding
  // to some enctype.
  // `expectedBuilder` is a function that takes two parameters: `expected` (the
  // `expected` value of a test) and `serialized` (the actual form body
  // submitted by the browser), and returns the correct form body that should
  // have been submitted. This is necessary in order to account for th
  // multipart/form-data boundary.
  window.formSubmissionTemplate = (enctype, expectedBuilder) => {
    function form({
      name,
      value,
      expected,
      formEncoding = "utf-8",
      description,
    }) {
      const commonParams = {
        name,
        value,
        expectedBuilder: expectedBuilder.bind(null, expected),
        enctype,
        formEncoding,
      };

      // Normal form
      promise_test(
        (testCase) =>
          formSubmissionTest({
            ...commonParams,
            testCase,
          }),
        `${enctype}: ${description} (normal form)`,
      );

      // formdata event
      promise_test(
        (testCase) =>
          formSubmissionTest({
            ...commonParams,
            testFormData: true,
            testCase,
          }),
        `${enctype}: ${description} (formdata event)`,
      );
    }

    return form;
  };
})();

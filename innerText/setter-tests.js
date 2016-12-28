testText("<div>", "abc", "abc", "Simplest possible test");
testHTML("<div>", "abc\ndef", "abc<br>def", "Newlines convert to <br> in non-white-space:pre elements");
testHTML("<pre>", "abc\ndef", "abc<br>def", "Newlines convert to <br> in <pre> element");
testHTML("<div style='white-space:pre'>", "abc\ndef", "abc<br>def", "Newlines convert to <br> in white-space:pre element");
testHTML("<div>", "abc\rdef", "abc<br>def", "CRs convert to <br> in non-white-space:pre elements");
testHTML("<pre>", "abc\rdef", "abc<br>def", "CRs convert to <br> in <pre> element");
testHTML("<div>", "abc\r\ndef", "abc<br>def", "Newline/CR pair converts to <br> in non-white-space:pre element");
testHTML("<div>", "abc\n\ndef", "abc<br><br>def", "Newline/newline pair converts to two <br>s in non-white-space:pre element");
testHTML("<div>", "abc\r\rdef", "abc<br><br>def", "CR/CR pair converts to two <br>s in non-white-space:pre element");
testHTML("<div style='white-space:pre'>", "abc\rdef", "abc<br>def", "CRs convert to <br> in white-space:pre element");
testText("<div>", "abc<def", "abc<def", "< preserved");
testText("<div>", "abc>def", "abc>def", "> preserved");
testText("<div>", "abc&", "abc&", "& preserved");
testText("<div>", "abc\"def", "abc\"def", "\" preserved");
testText("<div>", "abc\'def", "abc\'def", "\' preserved");
testHTML("<svg>", "abc", "", "innerText not supported on SVG elements");
testHTML("<math>", "abc", "", "innerText not supported on MathML elements");
testText("<div>", "abc\0def", "abc\0def", "Null characters preserved");
testText("<div>", "abc\tdef", "abc\tdef", "Tabs preserved");
testText("<div>", " abc", " abc", "Leading whitespace preserved");
testText("<div>", "abc ", "abc ", "Trailing whitespace preserved");
testText("<div>", "abc  def", "abc  def", "Whitespace not compressed");
testHTML("<div>abc\n\n", "abc", "abc", "Existing text deleted");
testHTML("<div><br>", "abc", "abc", "Existing <br> deleted");
testHTML("<div>", "", "", "Assigning the empty string");
testHTML("<div>", null, "", "Assigning null");
testHTML("<div>", undefined, "undefined", "Assigning undefined");

[
  "area",
  "base",
  "br",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
].forEach(name => {
  testText(`<${name}>`, "abc", "abc", `Assigning to an <${name}> element should work (even though it's void)`);
});

[
  "basefont",
  "menuitem"
].forEach(name => {
  testText(`<${name}>`, "abc", "abc",
    `Assigning to an <${name}> element should work (even though Chrome historically didn't allow it for some reason)`);
});

const image = document.createElement("image");
testTextPrecreatedContext(image, "abc", "abc",
  `Assigning to an <image> element should work (even though Chrome historically didn't allow it for some reason)`);

const col = document.createElement("col");
testTextPrecreatedContext(col, "abc", "abc",
  `Assigning to an <col> element should work (even though it's void)`);

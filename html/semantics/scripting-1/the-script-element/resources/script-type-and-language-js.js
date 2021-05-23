function testAttribute(attr, val, shouldRun) {
  test(function() {
    assert_false(ran, "ran variable not reset");
    var script = document.createElement("script");
    script.setAttribute(attr, val);
    script.textContent = "ran = true;"
    document.body.appendChild(script);
    assert_equals(ran, shouldRun);
  }, "Script should" + (shouldRun ? "" : "n't") + " run with " + attr + "=" + format_value(val));
  ran = false
}
function testType(type) {
  testAttribute("type", type, true);
}
function testLanguage(lang) {
  testAttribute("language", lang, true);
}
function testTypeIgnored(type) {
  testAttribute("type", type, false);
}
function testLanguageIgnored(lang) {
  testAttribute("language", lang, false);
}

function testParserInsertedIgnored(description) {
  test(() => assert_false(ran), "Script shouldn't run with " + description + " (parser-inserted)");
  ran = false;
}

var application = [
  "ecmascript",
  "javascript",
  "x-ecmascript",
  "x-javascript"
];
var text = [
  "ecmascript",
  "javascript",
  "javascript1.0",
  "javascript1.1",
  "javascript1.2",
  "javascript1.3",
  "javascript1.4",
  "javascript1.5",
  "jscript",
  "livescript",
  "x-ecmascript",
  "x-javascript"
];

const legacyTypes = [
  "javascript",
  "javascript1.0",
  "javascript1.1",
  "javascript1.2",
  "javascript1.3",
  "javascript1.4",
  "javascript1.5",
  "javascript1.6",
  "javascript1.7",
  "livescript",
  "ecmascript",
  "jscript"
];

var spaces = [" ", "\t", "\n", "\r", "\f"];

var ran = false;

// Type attribute

testType("");
testTypeIgnored(" ");

application.map(function(t) { return "application/" + t; }).forEach(testType);
application.map(function(t) { return ("application/" + t).toUpperCase(); }).forEach(testType);

legacyTypes.forEach(testTypeIgnored);

spaces.forEach(function(s) {
  application.map(function(t) { return "application/" + t + s; }).forEach(testType);
  application.map(function(t) { return s + "application/" + t; }).forEach(testType);
})

application.map(function(t) { return "application/" + t + "\0"; }).forEach(testTypeIgnored);
application.map(function(t) { return "application/" + t + "\0foo"; }).forEach(testTypeIgnored);

text.map(function(t) { return "text/" + t; }).forEach(testType);
text.map(function(t) { return ("text/" + t).toUpperCase(); }).forEach(testType);

spaces.forEach(function(s) {
  text.map(function(t) { return "text/" + t + s; }).forEach(testType);
  text.map(function(t) { return s + "text/" + t; }).forEach(testType);
})

text.map(function(t) { return "text/" + t + "\0"; }).forEach(testTypeIgnored);
text.map(function(t) { return "text/" + t + "\0foo"; }).forEach(testTypeIgnored);

// Language attribute

testLanguage("");
testLanguageIgnored(" ");

text.forEach(testLanguage);
text.map(function(t) { return t.toUpperCase(); }).forEach(testLanguage);

text.map(function(t) { return t + " "; }).forEach(testLanguageIgnored);
text.map(function(t) { return " " + t; }).forEach(testLanguageIgnored);
text.map(function(t) { return t + "xyz"; }).forEach(testLanguageIgnored);
text.map(function(t) { return "xyz" + t; }).forEach(testLanguageIgnored);

text.map(function(t) { return t + "\0"; }).forEach(testLanguageIgnored);
text.map(function(t) { return t + "\0foo"; }).forEach(testLanguageIgnored);

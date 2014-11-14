(function () {

  // Get values from the substitution engine.
  // We can't just pull these from the document context
  // because this script is intended to be transcluded into
  // another document, and we want the GET values used to request it,
  // not the values for the including document

  // XXX these are unencoded, so there's an unavoidable
  // injection vulnerability in constructing this file...
  // need to upgrade the template engine.
  var reportField  = "{{GET[reportField]}}";
  var reportValue  = "{{GET[reportValue]}}";
  var reportExists = "{{GET[reportExists]}}";

  var location = window.location;
  var thisTestName = location.pathname.split('/')[location.pathname.split('/').length - 1].split('.')[0];

  var reportID = "";

  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookieName = cookies[i].split('=')[0].trim();
    var cookieValue = cookies[i].split('=')[1].trim();

    if (cookieName == thisTestName) {
      reportID = cookieValue;
      var cookieToDelete = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + document.location.pathname.substring(0, document.location.pathname.lastIndexOf('/') + 1);
      document.cookie = cookieToDelete;
      break;
    }
  }

  var reportLocation = location.protocol + "//" + location.host + "/content-security-policy/support/report.py?op=take&timeout=1&reportID=" + reportID;

  var reportTest = async_test("Violation report status OK.");
  reportTest.step(function () {

    var report = new XMLHttpRequest();
    report.onload = reportTest.step_func(function () {

        var data = JSON.parse(report.responseText);

        if (data.error) {
          assert_equals("false", reportExists, reportExists ? "Report sent in error" : "No report sent.");
        } else {
          // Firefox expands 'self' or origins in a policy to the actual origin value
          // so "www.example.com" becomes "http://www.example.com:80".
          // Accomodate this by just testing that the correct directive name
          // is reported, not the details...

          assert_true(data["csp-report"][reportField].indexOf(reportValue.split(" ")[0]) != -1, reportField + " value of  \"" + data["csp-report"][reportField] + "\" did not match " + reportValue.split(" ")[0] + ".");
        }

        reportTest.done();
    });

    report.open("GET", reportLocation, true);
    report.send();
  });

})();

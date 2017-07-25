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
  var noCookies = "{{GET[noCookies]}}";
  var reportCookieName = "{{GET[reportCookieName]}}";
  var testName = "{{GET[testName]}}";
  var cookiePresent = "{{GET[cookiePresent]}}";
  var reportCount = "{{GET[reportCount]}}";

  var location = window.location;
//  if (true) {
    // fallback on test file name if cookie name not specified
    reportCookieName = location.pathname.split('/')[location.pathname.split('/').length - 1].split('.')[0];
//  }

  var reportID = "";

  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookieName = cookies[i].split('=')[0].trim();
    var cookieValue = cookies[i].split('=')[1].trim();

    if (cookieName == reportCookieName) {
      reportID = cookieValue;
      var cookieToDelete = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + document.location.pathname.substring(0, document.location.pathname.lastIndexOf('/') + 1);
      document.cookie = cookieToDelete;
      break;
    }
  }

  var timeout = document.querySelector("meta[name=timeout][content=long]") ? 50 : 5;
  var reportLocation = location.protocol + "//" + location.host + "/content-security-policy/support/report.py?op=take&timeout=" + timeout + "&reportID=" + reportID;

  if (testName == "") testName = "Violation report status OK.";
  var reportTest = async_test(testName);
  reportTest.step(function () {

    var report = new XMLHttpRequest();
    report.onload = reportTest.step_func(function () {

        var data = JSON.parse(report.responseText);

        if (data.error) {
          assert_equals("false", reportExists, data.error);
        } else {
          if(reportExists != "" && reportExists == "false" && data["csp-report"]) {
              assert_unreached("CSP report sent, but not expecting one: " + JSON.stringify(data["csp-report"]));
          }
          // Firefox expands 'self' or origins in a policy to the actual origin value
          // so "www.example.com" becomes "http://www.example.com:80".
          // Accomodate this by just testing that the correct directive name
          // is reported, not the details...

          if(data["csp-report"] != undefined && data["csp-report"][reportField] != undefined) {
            assert_true(data["csp-report"][reportField].indexOf(reportValue.split(" ")[0]) != -1,
                reportField + " value of  \"" + data["csp-report"][reportField] + "\" did not match " +
                reportValue.split(" ")[0] + ".");
          }
        }

        reportTest.done();
    });

    report.open("GET", reportLocation, true);
    report.send();
  });

  if (noCookies/* || cookiePresent*/) {
      var cookieTest = async_test("Test report cookies.");
      var cookieReport = new XMLHttpRequest();
      // timeout = 0.1;
      cookieReport.onload = cookieTest.step_func(function () {
        var data = JSON.parse(cookieReport.responseText);
        if (noCookies) {
          assert_equals(data.reportCookies, "None", "Report should not contain any cookies");
        }

//        if (cookiePresent) {
//          assert_true(data.reportCookies.hasOwnProperty(cookiePresent), "Report should contain cookie: " + cookiePresent);
//        }
        cookieTest.done();
      });
      var cReportLocation = location.protocol + "//" + location.host + "/content-security-policy/support/report.py?op=cookies&timeout=" + timeout + "&reportID=" + reportID;
      cookieReport.open("GET", cReportLocation, true);
      cookieReport.send();
  };

//  if (reportCount) {
//      var reportCountTest = async_test("Test number of sent reports.");
//      var reportCountReport = new XMLHttpRequest();
//      // timeout = 0.1;
//      reportCountReport.onload = reportCountTest.step_func(function () {
//        var data = JSON.parse(reportCountReport.responseText);
//
//        assert_equals(data.report_count, reportCount, "Report count was not what was expected.");
//
//        reportCountTest.done();
//      });
//      var cReportLocation = location.protocol + "//" + location.host + "/content-security-policy/support/report.py?op=retrieve_count&timeout=" + timeout + "&reportID=" + reportID;
//      reportCountReport.open("GET", cReportLocation, true);
//      reportCountReport.send();
//  }

})();

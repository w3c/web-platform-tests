<?php
/*****
* First, some generic setup.  It is good to define the policy string as a variable once
* as we are likely to need to reference it later in describing the policy and checking
* reports.  For the same reason, we set the report-uri as a distinct variable and 
* combine it to form the full CSP header.
*****/
$policy_string = "default-src *";
$title = "Inline script should not run with policy \"$policy_string\".";

/*****
* The support script setReportAsCookie.php will echo the contents of the CSP report
* back as a cookie.  Note that you can't read this value immediately in this context
* because the reporting is asynchronous and non-deterministic. As a rule of thumb,
* you can test it in an iframe. 
*****/
$reportID=rand();
$report_string = "report-uri support/setReportAsCookie.php?reportID=$reportID";

header("Content-Security-Policy: $policy_string; $report_string");
/*****
* Run tests with prefixed headers if requested.
* Note this will not really work for Mozilla, as they use
* the old, pre-1.0 directive grammar and vocabulary
*****/
if($_GET['prefixed'] == 'true') {
	header("X-Content-Security-Policy: $policy_string; $report_string");
	header("X-Webkit-CSP: $policy_string; $report_string");
}
?>
<!DOCTYPE html>
<html>
	<head>
		<!-- Yes, this metadata is important in making these test cases useful
		in assessing conformance.  Please preserve and update it. -->
		<title><?php echo $title ?></title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta description="<?php echo $title ?>" />
		<link rel="author" title="bhill@paypal-inc.com" />
		<script src="http://www.w3c-test.org/resources/testharness.js"></script>
		<script src="http://www.w3c-test.org/resources/testharnessreport.js"></script>
	</head>
	<body>
		<h1><?php echo $title ?></h1>
		<div id=log></div>
	</body>

	<!-- Often when testing CSP you want something *not* to happen. Including this support script
	(from an allowed source!) will give you and the test runner a guaranteed positive signal that
	something is happening.  -->
	<script src="support/success.php"></script>

	<!-- This is our test case, but we don't expect it to actually execute if CSP is working. -->
	<script>
		test(function() {assert_false(true, "Unsafe inline script ran.")});
	</script>

        <!-- This iframe will execute a test on the report contents.  It will pull a field out of
        the report, specified by reportField, and compare it's value to to reportValue.  It will
	also delete the report cookie to prevent the overall cookie header from becoming too long. -->
	<iframe width="100%" height="300" 
	  src="support/checkReportFieldHtml.php?reportID=<?php echo $reportID ?>&reportField=violated-directive&reportValue=<?php echo urlencode($policy_string) ?>"
	>
	</iframe>

</html>

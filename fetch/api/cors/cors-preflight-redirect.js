if (this.document === undefined) {
  importScripts("/resources/testharness.js");
  importScripts("../resources/utils.js");
  importScripts("/common/utils.js");
}

function corsPreflightRedirect(desc, redirectUrl, redirectLocation, redirectStatus, redirectPreflight) {
  var uuid_token = token();
  var url = redirectUrl;
  var urlParameters = "?token=" + uuid_token + "&max_age=0";
  urlParameters += "&redirect_status=" + redirectStatus;
  urlParameters += "&location=" + encodeURIComponent(redirectLocation);

  if (redirectPreflight)
    urlParameters += "&redirect_preflight";
  var requestInit = {"mode": "cors", "redirect": "follow"};

  /* Force preflight */
  requestInit["headers"] = {"x-force-preflight": ""};
  urlParameters += "&allow_headers=x-force-preflight";

  promise_test(function(test) {
    fetch(RESOURCES_DIR + "clean-stash.py?token=" + uuid_token).then(function(resp) {
      assert_equals(resp.status, 200, "Clean stash response's status is 200");
      return promise_rejects(test, new TypeError(), fetch(url + urlParameters, requestInit));
    });
  }, desc);
}

var redirectUrl = "http://www1.{{host}}:{{ports[http][0]}}" + dirname(location.pathname) + RESOURCES_DIR + "redirect.py";
var locationUrl = "http://www1.{{host}}:{{ports[http][0]}}" + dirname(location.pathname) + RESOURCES_DIR + "preflight.py";

for (var code of [301, 302, 303, 307, 308]) {
  /* preflight should not follow the redirection */
  corsPreflightRedirect("Redirection " + code + " on preflight failed", redirectUrl, locationUrl, code, true);
  /* preflight is done before redirection: preflight force redirect to error */
  corsPreflightRedirect("Redirection " + code + " after preflight failed", redirectUrl, locationUrl, code, false);
}

done();

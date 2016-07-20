if (this.document === undefined) {
  importScripts("/resources/testharness.js");
  importScripts("../resources/utils.js");
  importScripts("../resources/get-host-info.sub.js")
}

function corsRedirectCredentials(desc, redirectUrl, redirectLocation, redirectStatus, locationCredentials) {

  var url = redirectUrl
  var urlParameters = "?redirect_status=" + redirectStatus;
  urlParameters += "&location=" + encodeURIComponent(redirectLocation.replace("://", "://" + locationCredentials + "@"));

  var requestInit = {"mode": "cors", "redirect": "follow", "credentials":"include"};

  promise_test(function(test) {
    return promise_rejects(test, new TypeError(), fetch(url + urlParameters, requestInit));
  }, desc);
}

var redirPath = dirname(location.pathname) + RESOURCES_DIR + "redirect.py";
var preflightPath = dirname(location.pathname) + RESOURCES_DIR + "preflight.py";

var host_info = get_host_info();

var localRedirect = host_info.HTTP_ORIGIN + redirPath;
var remoteRedirect = host_info.HTTP_ORIGIN_WITH_DIFFERENT_PORT + redirPath;

var localLocation = host_info.HTTP_ORIGIN + preflightPath;
var remoteLocation = host_info.HTTP_ORIGIN_WITH_DIFFERENT_PORT + preflightPath;
var remoteLocation2 = host_info.HTTP_REMOTE_ORIGIN + preflightPath;

for (var code of [301, 302, 303, 307, 308]) {
  corsRedirectCredentials("Redirect " + code + " from same origin to remote with user and password", localRedirect, remoteLocation, code, "user:password");
  corsRedirectCredentials("Redirect " + code + " from same origin to remote with user", localRedirect, remoteLocation, code, "user:");
  corsRedirectCredentials("Redirect " + code + " from same origin to remote with password", localRedirect, remoteLocation, code, ":password");

  corsRedirectCredentials("Redirect " + code + " from remote to same origin with user and password", remoteRedirect, localLocation, code, "user:password");
  corsRedirectCredentials("Redirect " + code + " from remote to same origin with user", remoteRedirect, localLocation, code, "user:");
  corsRedirectCredentials("Redirect " + code + " from remote to same origin with password", remoteRedirect, localLocation, code, ":password");

  corsRedirectCredentials("Redirect " + code + " from remote to same remote with user and password", remoteRedirect, remoteLocation, code, "user:password");
  corsRedirectCredentials("Redirect " + code + " from remote to same remote with user", remoteRedirect, remoteLocation, code, "user:");
  corsRedirectCredentials("Redirect " + code + " from remote to same remote with password", remoteRedirect, remoteLocation, code, ":password");

  corsRedirectCredentials("Redirect " + code + " from remote to another remote with user and password", remoteRedirect, remoteLocation2, code, "user:password");
  corsRedirectCredentials("Redirect " + code + " from remote to another remote with user", remoteRedirect, remoteLocation2, code, "user:");
  corsRedirectCredentials("Redirect " + code + " from remote to another remote with password", remoteRedirect, remoteLocation2, code, ":password");
}

done();

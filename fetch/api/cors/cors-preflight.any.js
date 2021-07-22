// META: script=/common/utils.js
// META: script=../resources/utils.js
// META: script=/common/get-host-info.sub.js
// META: script=resources/corspreflight.js

var corsUrl = get_host_info().HTTP_REMOTE_ORIGIN + dirname(location.pathname) + RESOURCES_DIR + "preflight.py";

corsPreflight("CORS [DELETE], server allows", corsUrl, "DELETE", true);
corsPreflight("CORS [DELETE], server refuses", corsUrl, "DELETE", false);
corsPreflight("CORS [PUT], server allows", corsUrl, "PUT", true);
corsPreflight("CORS [PUT], server allows, check preflight has user agent", corsUrl + "?checkUserAgentHeaderInPreflight", "PUT", true);
corsPreflight("CORS [PUT], server refuses", corsUrl, "PUT", false);
corsPreflight("CORS [PATCH], server allows", corsUrl, "PATCH", true);
corsPreflight("CORS [PATCH], server refuses", corsUrl, "PATCH", false);
corsPreflight("CORS [NEW], server allows", corsUrl, "NEW", true);
corsPreflight("CORS [NEW], server refuses", corsUrl, "NEW", false);

corsPreflight("CORS [GET] [x-test-header: allowed], server allows", corsUrl, "GET", true, [["x-test-header1", "allowed"]]);
corsPreflight("CORS [GET] [x-test-header: refused], server refuses", corsUrl, "GET", false, [["x-test-header1", "refused"]]);

corsPreflight("CORS [POST] [Content-Type: text/plain;charset=UTF-8,text/xml], server allows", corsUrl, "POST", true, [["Content-Type", "text/plain;charset=UTF-8,text/xml"]]);
corsPreflight("CORS [POST] [Content-Type: text/plain;charset=UTF-8,text/xml], server refuses", corsUrl, "POST", false, [["Content-Type", "text/plain;charset=UTF-8,text/xml"]]);
corsPreflight("CORS [POST] [Content-Type: text/plain;charset=UTF-8, Content-Type: text/xml], server allows", corsUrl, "POST", true, [["Content-Type", "text/xml"]], [["Content-Type", "text/plain;charset=UTF-8"]]);
corsPreflight("CORS [POST] [Content-Type: text/plain;charset=UTF-8, Content-Type: text/xml], server refuses", corsUrl, "POST", false, [["Content-Type", "text/xml"]], [["Content-Type", "text/plain;charset=UTF-8"]]);

var headers = [
    ["x-test-header1", "allowedOrRefused"],
    ["x-test-header2", "allowedOrRefused"],
    ["X-test-header3", "allowedOrRefused"],
    ["x-test-header-b", "allowedOrRefused"],
    ["x-test-header-D", "allowedOrRefused"],
    ["x-test-header-C", "allowedOrRefused"],
    ["x-test-header-a", "allowedOrRefused"],
    ["Content-Type", "allowedOrRefused"],
];
var safeHeaders= [
    ["Accept", "*"],
    ["Accept-Language", "bzh"],
    ["Content-Language", "eu"],
];

corsPreflight("CORS [GET] [several headers], server allows", corsUrl, "GET", true, headers, safeHeaders);
corsPreflight("CORS [GET] [several headers], server refuses", corsUrl, "GET", false, headers, safeHeaders);
corsPreflight("CORS [PUT] [several headers], server allows", corsUrl, "PUT", true, headers, safeHeaders);
corsPreflight("CORS [PUT] [several headers], server refuses", corsUrl, "PUT", false, headers, safeHeaders);

corsPreflight("CORS [PUT] [only safe headers], server allows", corsUrl, "PUT", true, null, safeHeaders);

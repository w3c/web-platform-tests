// For ignoring exception names (just for testing)
/*
_real_assert_throws = assert_throws;
function assert_throws(d, func, desc) {
    try {
        func();
    } catch(e) {
        return true;
    }
    assert_unreached("Didn't throw!");
}
*/

function dirname(path) {
    return path.replace(/\/[^\/]*$/, '/')
}

/* This subdomain should point to this same location */
var SUBDOMAIN = 'www1'
var SUBDOMAIN2 = 'www2'
var PORT = "81"
var PORTS = "83"

/* Changes http://example.com/abc/def/cool.htm to http://www1.example.com/abc/def/ */
var CROSSDOMAIN = dirname(location.href)
    .replace('://', '://' + SUBDOMAIN + '.')

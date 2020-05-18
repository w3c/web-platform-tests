import json
import helpers

from wptserve.utils import isomorphic_decode

def main(request, response):
    headers = helpers.setNoCacheAndCORSHeaders(request, response)
    cookies = helpers.readCookies(request)
    new_cookies = { isomorphic_decode(key): isomorphic_decode(val) for key, val in cookies.items() }
    return headers, json.dumps(new_cookies)

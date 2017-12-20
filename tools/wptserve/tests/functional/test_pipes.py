import os
import unittest
import time
import json

import pytest

wptserve = pytest.importorskip("wptserve")
from .base import TestUsingServer, doc_root


class TestStatus(TestUsingServer):
    def test_status(self):
        resp = self.request("/document.txt", query="pipe=status(202)")
        self.assertEqual(resp.getcode(), 202)

class TestHeader(TestUsingServer):
    def test_not_set(self):
        resp = self.request("/document.txt", query="pipe=header(X-TEST,PASS)")
        self.assertEqual(resp.info()["X-TEST"], "PASS")

    def test_set(self):
        resp = self.request("/document.txt", query="pipe=header(Content-Type,text/html)")
        self.assertEqual(resp.info()["Content-Type"], "text/html")

    def test_multiple(self):
        resp = self.request("/document.txt", query="pipe=header(X-Test,PASS)|header(Content-Type,text/html)")
        self.assertEqual(resp.info()["X-TEST"], "PASS")
        self.assertEqual(resp.info()["Content-Type"], "text/html")

    def test_multiple_same(self):
        resp = self.request("/document.txt", query="pipe=header(Content-Type,FAIL)|header(Content-Type,text/html)")
        self.assertEqual(resp.info()["Content-Type"], "text/html")

    def test_multiple_append(self):
        resp = self.request("/document.txt", query="pipe=header(X-Test,1)|header(X-Test,2,True)")
        self.assertEqual(resp.info()["X-Test"], "1, 2")

class TestSlice(TestUsingServer):
    def test_both_bounds(self):
        resp = self.request("/document.txt", query="pipe=slice(1,10)")
        expected = open(os.path.join(doc_root, "document.txt"), 'rb').read()
        self.assertEqual(resp.read(), expected[1:10])

    def test_no_upper(self):
        resp = self.request("/document.txt", query="pipe=slice(1)")
        expected = open(os.path.join(doc_root, "document.txt"), 'rb').read()
        self.assertEqual(resp.read(), expected[1:])

    def test_no_lower(self):
        resp = self.request("/document.txt", query="pipe=slice(null,10)")
        expected = open(os.path.join(doc_root, "document.txt"), 'rb').read()
        self.assertEqual(resp.read(), expected[:10])

class TestSub(TestUsingServer):
    def test_sub_config(self):
        resp = self.request("/sub.txt", query="pipe=sub")
        expected = "localhost localhost %i" % self.server.port
        self.assertEqual(resp.read().rstrip(), expected)

    def test_sub_headers(self):
        resp = self.request("/sub_headers.txt", query="pipe=sub", headers={"X-Test": "PASS"})
        expected = "PASS"
        self.assertEqual(resp.read().rstrip(), expected)

    def test_sub_location(self):
        resp = self.request("/sub_location.sub.txt?query_string")
        expected = """
host: localhost:{0}
hostname: localhost
path: /sub_location.sub.txt
pathname: /sub_location.sub.txt
port: {0}
query: ?query_string
scheme: http
server: http://localhost:{0}""".format(self.server.port)
        self.assertEqual(resp.read().rstrip(), expected.strip())

    def test_sub_params(self):
        resp = self.request("/sub_params.txt", query="test=PASS&pipe=sub")
        expected = "PASS"
        self.assertEqual(resp.read().rstrip(), expected)

    def test_sub_url_base(self):
        resp = self.request("/sub_url_base.sub.txt")
        self.assertEqual(resp.read().rstrip(), "Before / After")

    def test_sub_uuid(self):
        resp = self.request("/sub_uuid.sub.txt")
        self.assertRegexpMatches(resp.read().rstrip(), r"Before [a-f0-9-]+ After")

    def test_sub_var(self):
        resp = self.request("/sub_var.sub.txt")
        port = self.server.port
        expected = "localhost %s A %s B localhost C" % (port, port)
        self.assertEqual(resp.read().rstrip(), expected)

class TestTrickle(TestUsingServer):
    def test_trickle(self):
        #Actually testing that the response trickles in is not that easy
        t0 = time.time()
        resp = self.request("/document.txt", query="pipe=trickle(1:d2:5:d1:r2)")
        t1 = time.time()
        expected = open(os.path.join(doc_root, "document.txt"), 'rb').read()
        self.assertEqual(resp.read(), expected)
        self.assertGreater(6, t1-t0)

    def test_headers(self):
        resp = self.request("/document.txt", query="pipe=trickle(d0.01)")
        self.assertEqual(resp.info()["Cache-Control"], "no-cache, no-store, must-revalidate")
        self.assertEqual(resp.info()["Pragma"], "no-cache")
        self.assertEqual(resp.info()["Expires"], "0")

class TestPipesWithVariousHandlers(TestUsingServer):
    def test_with_python_file_handler(self):
        resp = self.request("/test_string.py", query="pipe=slice(null,2)")
        self.assertEqual(resp.read(), "PA")

    def test_with_python_func_handler(self):
        @wptserve.handlers.handler
        def handler(request, response):
            return "PASS"
        route = ("GET", "/test/test_pipes_1/", handler)
        self.server.router.register(*route)
        resp = self.request(route[1], query="pipe=slice(null,2)")
        self.assertEqual(resp.read(), "PA")

    def test_with_python_func_handler_using_response_writer(self):
        @wptserve.handlers.handler
        def handler(request, response):
            response.writer.write_content("PASS")
        route = ("GET", "/test/test_pipes_1/", handler)
        self.server.router.register(*route)
        resp = self.request(route[1], query="pipe=slice(null,2)")
        # slice has not been applied to the response, because response.writer was used.
        self.assertEqual(resp.read(), "PASS")

    def test_header_pipe_with_python_func_using_response_writer(self):
        @wptserve.handlers.handler
        def handler(request, response):
            response.writer.write_content("CONTENT")
        route = ("GET", "/test/test_pipes_1/", handler)
        self.server.router.register(*route)
        resp = self.request(route[1], query="pipe=header(X-TEST,FAIL)")
        # header pipe was ignored, because response.writer was used.
        self.assertFalse(resp.info().get("X-TEST"))
        self.assertEqual(resp.read(), "CONTENT")

    def test_with_json_handler(self):
        @wptserve.handlers.json_handler
        def handler(request, response):
            return json.dumps({'data': 'PASS'})
        route = ("GET", "/test/test_pipes_2/", handler)
        self.server.router.register(*route)
        resp = self.request(route[1], query="pipe=slice(null,2)")
        self.assertEqual(resp.read(), '"{')

    def test_slice_with_as_is_handler(self):
        resp = self.request("/test.asis", query="pipe=slice(null,2)")
        self.assertEqual(202, resp.getcode())
        self.assertEqual("Giraffe", resp.msg)
        self.assertEqual("PASS", resp.info()["X-Test"])
        # slice has not been applied to the response, because response.writer was used.
        self.assertEqual("Content", resp.read())

    def test_headers_with_as_is_handler(self):
        resp = self.request("/test.asis", query="pipe=header(X-TEST,FAIL)")
        self.assertEqual(202, resp.getcode())
        self.assertEqual("Giraffe", resp.msg)
        # header pipe was ignored.
        self.assertEqual("PASS", resp.info()["X-TEST"])
        self.assertEqual("Content", resp.read())

    def test_trickle_with_as_is_handler(self):
        t0 = time.time()
        resp = self.request("/test.asis", query="pipe=trickle(1:d2:5:d1:r2)")
        t1 = time.time()
        self.assertTrue('Content' in resp.read())
        self.assertGreater(6, t1-t0)

if __name__ == '__main__':
    unittest.main()

def main(request, response):
    return 301, [('Location', 'expect-received.py'),('Accept-CH', 'device-memory, DPR')], ''

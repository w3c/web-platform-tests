def main(request, response):
    """
    Respond with a blank HTML document and a `Link` header which describes
    a link relation specified by the requests `location` and `rel` query string
    parameters
    """
    headers = [
        (b'Content-Type', b'text/html'),
        (b'Link', b'<{}>; rel={}'.format(request.GET.first(b'location'), request.GET.first(b'rel')))
    ]
    return (200, headers, b'')


import time
def main(request, response):
    time.sleep(1)
    headers = [(b"Content-Type", b"text/html")]
    return headers, u'''
<!DOCTYPE html>
<head>
</head>
<body>
    DELAYED FRAME
<script>
    top.postMessage('delayed_frame_loaded', '*');
</script>
</body>
'''

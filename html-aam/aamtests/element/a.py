# Testing: https://w3c.github.io/aria/html-aam/#el-a

TEST_HTML = "<a id='target' href='#'>link</a>"

def test_atspi(atspi, session, inline):
    session.url = inline(TEST_HTML)

    # Spec:
    # Use WAI-ARIA mapping

    node = atspi.find_node("target", session.url)
    atspi.assert_role_mapping(node, "link")

# def test_axapi(axapi, session, inline):
#     session.url = inline(TEST_HTML)
#
#     # Spec:
#     # Use WAI-ARIA mapping

# def test_ia2(ia2, session, inline):
#     session.url = inline(TEST_HTML)
#
#     # Spec:
#     # Use WAI-ARIA mapping

# def test_uia(uia, session, inline):
#     session.url = inline(TEST_HTML)
#
#     # Spec:
#     # Use WAI-ARIA mapping

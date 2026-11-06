# Testing: https://w3c.github.io/aria/html-aam/#el-nav

TEST_HTML = "<nav id='target'>content</nav>"

def test_atspi(atspi, session, inline):
    session.url = inline(TEST_HTML)

    # Spec:
    # Use WAI-ARIA mapping

    node = atspi.find_node("target", session.url)
    atspi.assert_role_mapping(node, "navigation")

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

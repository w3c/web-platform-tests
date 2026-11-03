# Testing: https://w3c.github.io/core-aam/#role-map-navigation

TEST_HTML = "<div role='navigation' id='test'>content</div>"

def test_atspi(atspi, session, inline):
    session.url = inline(TEST_HTML)

    # Spec:
    # Role: ROLE_LANDMARK
    # Object Attribute: xml-roles:navigation

    node = atspi.find_node("test", session.url)
    atspi.assert_role_mapping(node, "navigation")

# def test_axapi(axapi, session, inline):
#     session.url = inline(TEST_HTML)
#
#     # Spec:
#     # AXRole: AXGroup
#     # AXSubrole: AXLandmarkNavigation

# def test_ia2(ia2, session, inline):
#     session.url = inline(TEST_HTML)
#
#     # Spec:
#     # Role: IA2_ROLE_LANDMARK
#     # Object Attribute: xml-roles:navigation

def test_uia(uia, session, inline):
    session.url = inline(TEST_HTML)

    # Spec:
    # Control Type: Group
    # Localized Control Type: navigation
    # Landmark Type: Navigation

    node = uia.find_node("test", session.url)
    assert node.CurrentControlType == uia.ControlType.Group
    assert node.CurrentLocalizedControlType == "navigation"
    assert node.GetCurrentPropertyValue(uia.PropertyId.LandmarkType) == uia.LandmarkType.Navigation

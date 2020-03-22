#!/usr/bin/python

from lxml import etree
from utils.misc import downloadWithProgressBar, UnicodeXMLURL, InlineAxisOperatorsURL
import json, re
from utils import mathfont

NonBreakingSpace = 0x00A0

def parseHexaNumber(string):
    return int("0x%s" % string, 16)

def parseHexaSequence(string):
    return tuple(map(parseHexaNumber, string[1:].split("-")))

def parseSpaces(value, entry, names):
    for name in names:
        attributeValue = entry.get(name)
        if attributeValue is not None:
            value[name] = int(attributeValue)

def parseProperties(value, entry, names):
    attributeValue = entry.get("properties")
    if attributeValue is not None:
        for name in names:
            if attributeValue.find(name) >= 0:
                value[name] = True

def buildKeyAndValueFrom(characters, form):
    # Concatenate characters and form to build the key.
    key = ""
    for c in characters:
        key += unichr(c)
    key += " " + form
    # But save characters as an individual property for easier manipulation in
    # this Python script.
    value = {
        "characters": characters,
    }
    return key, value

def createSizeVariants(aFont):
    for size in (0, 1, 2, 3):
        g = aFont.createChar(-1, "v%d" % size)
        mathfont.drawRectangleGlyph(g, mathfont.em, (size + 1) * mathfont.em, 0)
        g = aFont.createChar(-1, "h%d" % size)
        mathfont.drawRectangleGlyph(g, (size + 1) * mathfont.em, mathfont.em, 0)

def createStretchy(aFont, codePoint, isHorizontal):
    if isHorizontal:
        aFont[codePoint].horizontalVariants = "h0 h1 h2 h3"
        # Part: (glyphName, isExtender, startConnector, endConnector, fullAdvance)
        aFont[codePoint].horizontalComponents = \
            (("h2", False, 0, mathfont.em, 3 * mathfont.em), \
             ("h1", True, mathfont.em, mathfont.em, 2 * mathfont.em))
    else:
        aFont[codePoint].verticalVariants = "v0 v1 v2 v3"
        # Part: (glyphName, isExtender, startConnector, endConnector, fullAdvance)
        aFont[codePoint].verticalComponents = \
            (("v2", False, 0, mathfont.em, 3 * mathfont.em), \
             ("v1", True, mathfont.em, mathfont.em, 2 * mathfont.em))

# Retrieve the spec files.
inlineAxisOperatorsTXT = downloadWithProgressBar(InlineAxisOperatorsURL)
unicodeXML = downloadWithProgressBar(UnicodeXMLURL)

# Extract the operator dictionary.
xsltTransform = etree.XSLT(etree.parse("./operator-dictionary.xsl"))

# Put the operator dictionary into a Python structure.
inlineAxisOperators = {}
with open(inlineAxisOperatorsTXT, mode="r") as f:
    for line in f:
        hexaString = re.match("^U\+([0-9A-F]+)", line).group(1)
        inlineAxisOperators[parseHexaNumber(hexaString)] = True

operatorDictionary = {}
root = xsltTransform(etree.parse(unicodeXML)).getroot()
for entry in root:
    characters = parseHexaSequence(entry.get("unicode"))
    assert characters != (NonBreakingSpace)
    key, value = buildKeyAndValueFrom(characters, entry.get("form"))
    # There is no dictionary-specified minsize/maxsize values, so no need to
    # parse them.
    # The fence, separator and priority properties don't have any effect on math
    # layout, so they are not added to the JSON file.
    parseSpaces(value, entry, ["lspace", "rspace"])
    parseProperties(value, entry, ["stretchy", "symmetric", "largeop",
                                   "movablelimits", "accent"])
    if (len(characters) == 1 and characters[0] in inlineAxisOperators):
        value["horizontal"] = True
    operatorDictionary[key] = value

# Create entries for the non-breaking space in all forms in order to test the
# default for operators outside the official dictionary.
for form in ["infix", "prefix", "suffix"]:
    key, value = buildKeyAndValueFrom(tuple([NonBreakingSpace]), form)
    operatorDictionary[key] = value

# Create a WOFF font with glyphs for all the operator strings.
font = mathfont.create("operators", "Copyright (c) 2019 Igalia S.L.")

# Set parameters for largeop and stretchy tests.
font.math.DisplayOperatorMinHeight = 2 * mathfont.em
font.math.MinConnectorOverlap = mathfont.em / 2

# Set parameters for accent tests so that we only have large gap when
# overscript is an accent.
font.math.UpperLimitBaselineRiseMin = 0
font.math.StretchStackTopShiftUp = 0
font.math.AccentBaseHeight = 2 * mathfont.em
font.math.OverbarVerticalGap = 0

createSizeVariants(font)
for key in operatorDictionary:
    value = operatorDictionary[key]
    for c in value["characters"]:
        if c in font:
            continue
        if c == NonBreakingSpace:
            g = font.createChar(c)
            mathfont.drawRectangleGlyph(g, mathfont.em, mathfont.em / 3, 0)
        else:
            mathfont.createSquareGlyph(font, c)
        createStretchy(font, c, c in inlineAxisOperators)
mathfont.save(font)

# Generate the python file.
for key in operatorDictionary:
    del operatorDictionary[key]["characters"] # Remove this temporary value.
JSON = {
    "comment": "This file was automatically generated by operator-dictionary.py. Do not edit.",
    "dictionary": operatorDictionary
}
with open('../support/operator-dictionary.json', 'w') as fp:
    json.dump(JSON, fp, sort_keys=True, ensure_ascii=True)

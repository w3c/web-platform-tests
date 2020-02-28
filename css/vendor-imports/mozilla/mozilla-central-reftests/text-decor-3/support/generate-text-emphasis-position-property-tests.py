#!/usr/bin/env python
# - * - coding: UTF-8 - * -

"""
This script generates tests text-emphasis-position-property-001 ~ 006
which cover all possible values of text-emphasis-position property with
all combination of three main writing modes and two orientations. Only
test files are generated by this script. It also outputs a list of all
tests it generated in the format of Mozilla reftest.list to the stdout.
"""

from __future__ import unicode_literals, print_function, absolute_import

import itertools

TEST_FILE = 'text-emphasis-position-property-{:03}{}.html'
REF_FILE = 'text-emphasis-position-property-{:03}-ref.html'
TEST_TEMPLATE = '''<!DOCTYPE html>
<meta charset="utf-8">
<!-- This file was generated automatically by the script
     ./support/generate-text-emphasis-position-property-tests.py -->
<title>CSS Test: text-emphasis-position: {value}, {title}</title>
<link rel="author" title="Xidorn Quan" href="https://www.upsuper.org">
<link rel="author" title="Mozilla" href="https://www.mozilla.org">
<link rel="help" href="https://drafts.csswg.org/css-text-decor-3/#text-emphasis-position-property">
<meta name="assert" content="'text-emphasis-position: {value}' with 'writing-mode: {wm}' puts emphasis marks {position} the text.">
<link rel="match" href="text-emphasis-position-property-{index:03}-ref.html">
<p>Pass if the emphasis marks are {position} the text below:</p>
<div lang="ja" style="line-height: 5; text-emphasis: circle; writing-mode: {wm}; text-orientation: {orient}; text-emphasis-position: {value}">試験テスト</div>
'''

SUFFIXES = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g']

WRITING_MODES = ["horizontal-tb", "vertical-rl", "vertical-lr"]
POSITION_HORIZONTAL = ["over", "under"]
POSITION_VERTICAL = ["right", "left"]

REF_MAP_MIXED = { "over": 1, "under": 2, "right": 3, "left": 4 }
REF_MAP_SIDEWAYS = { "right": 5, "left": 6 }
POSITION_TEXT = { "over": "over", "under": "under",
                  "right": "to the right of", "left": "to the left of" }

suffixes = [iter(SUFFIXES) for i in range(6)]

reftest_items = []

def write_file(filename, content):
    with open(filename, 'wb') as f:
        f.write(content.encode('UTF-8'))

def write_test_file(idx, suffix, wm, orient, value, position):
    filename = TEST_FILE.format(idx, suffix)
    write_file(filename, TEST_TEMPLATE.format(
        value=value, wm=wm, orient=orient, index=idx, position=position,
        title=(wm if orient == "mixed" else "{}, {}".format(wm, orient))))
    reftest_items.append("== {} {}".format(filename, REF_FILE.format(idx)))

def write_test_files(wm, orient, pos1, pos2):
    idx = (REF_MAP_MIXED if orient == "mixed" else REF_MAP_SIDEWAYS)[pos1]
    position = POSITION_TEXT[pos1]
    suffix = suffixes[idx - 1]
    write_test_file(idx, next(suffix), wm, orient, pos1 + " " + pos2, position)
    write_test_file(idx, next(suffix), wm, orient, pos2 + " " + pos1, position)

for wm in WRITING_MODES:
    if wm == "horizontal-tb":
        effective_pos = POSITION_HORIZONTAL
        ineffective_pos = POSITION_VERTICAL
    else:
        effective_pos = POSITION_VERTICAL
        ineffective_pos = POSITION_HORIZONTAL
    for pos1, pos2 in itertools.product(effective_pos, ineffective_pos):
        write_test_files(wm, "mixed", pos1, pos2)
        if wm != "horizontal-tb":
            write_test_files(wm, "sideways", pos1, pos2)

print("# START tests from {}".format(__file__))
reftest_items.sort()
for item in reftest_items:
    print(item)
print("# END tests from {}".format(__file__))

// For documentation of the format, see README in this directory.
var browserTests = [
["foo[]bar",
    [["unlink",""]],
    "foo[]bar",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<p>[foo</p> <p>bar]</p>",
    [["unlink",""]],
    "<p>[foo</p> <p>bar]</p>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<span>[foo</span> <span>bar]</span>",
    [["unlink",""]],
    "<span>[foo</span> <span>bar]</span>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<p>[foo</p><p> <span>bar</span> </p><p>baz]</p>",
    [["unlink",""]],
    "<p>[foo</p><p> <span>bar</span> </p><p>baz]</p>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<b>foo[]bar</b>",
    [["unlink",""]],
    "<b>foo[]bar</b>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<i>foo[]bar</i>",
    [["unlink",""]],
    "<i>foo[]bar</i>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<span>foo</span>{}<span>bar</span>",
    [["unlink",""]],
    "<span>foo</span>{}<span>bar</span>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<span>foo[</span><span>]bar</span>",
    [["unlink",""]],
    "<span>foo[</span><span>]bar</span>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo[bar]baz",
    [["unlink",""]],
    "foo[bar]baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo[bar<b>baz]qoz</b>quz",
    [["unlink",""]],
    "foo[bar<b>baz]qoz</b>quz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo[bar<i>baz]qoz</i>quz",
    [["unlink",""]],
    "foo[bar<i>baz]qoz</i>quz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["{<p><p> <p>foo</p>}",
    [["unlink",""]],
    "{<p></p><p> </p><p>foo</p>}",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<a href=http://www.google.com/>foo[bar]baz</a>",
    [["unlink",""]],
    "foo[bar]baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<a href=http://www.google.com/>foo[barbaz</a>}",
    [["unlink",""]],
    "foo[barbaz}",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["{<a href=http://www.google.com/>foobar]baz</a>",
    [["unlink",""]],
    "{foobar]baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["{<a href=http://www.google.com/>foobarbaz</a>}",
    [["unlink",""]],
    "{foobarbaz}",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<a href=http://www.google.com/>[foobarbaz]</a>",
    [["unlink",""]],
    "[foobarbaz]",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo<a href=http://www.google.com/>b[]ar</a>baz",
    [["unlink",""]],
    "foob[]arbaz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo<a href=http://www.google.com/>[bar]</a>baz",
    [["unlink",""]],
    "foo[bar]baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo[<a href=http://www.google.com/>bar</a>]baz",
    [["unlink",""]],
    "foo[bar]baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo<a href=http://www.google.com/>[bar</a>baz]",
    [["unlink",""]],
    "foo[barbaz]",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["[foo<a href=http://www.google.com/>bar]</a>baz",
    [["unlink",""]],
    "[foobar]baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["[foo<a href=http://www.google.com/>bar</a>baz]",
    [["unlink",""]],
    "[foobarbaz]",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<a id=foo href=http://www.google.com/>foobar[]baz</a>",
    [["unlink",""]],
    "<a id=\"foo\">foobar[]baz</a>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<a id=foo href=http://www.google.com/>foo[bar]baz</a>",
    [["unlink",""]],
    "<a id=\"foo\">foo[bar]baz</a>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<a id=foo href=http://www.google.com/>[foobarbaz]</a>",
    [["unlink",""]],
    "<a id=\"foo\">[foobarbaz]</a>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo<a id=foo href=http://www.google.com/>[bar]</a>baz",
    [["unlink",""]],
    "foo<a id=\"foo\">[bar]</a>baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo[<a id=foo href=http://www.google.com/>bar</a>]baz",
    [["unlink",""]],
    "foo[<a id=\"foo\">bar</a>]baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["[foo<a id=foo href=http://www.google.com/>bar</a>baz]",
    [["unlink",""]],
    "[foo<a id=\"foo\">bar</a>baz]",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<a name=foo>foobar[]baz</a>",
    [["unlink",""]],
    "<a name=\"foo\">foobar[]baz</a>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<a name=foo>foo[bar]baz</a>",
    [["unlink",""]],
    "<a name=\"foo\">foo[bar]baz</a>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["<a name=foo>[foobarbaz]</a>",
    [["unlink",""]],
    "<a name=\"foo\">[foobarbaz]</a>",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo<a name=foo>[bar]</a>baz",
    [["unlink",""]],
    "foo<a name=\"foo\">[bar]</a>baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["foo[<a name=foo>bar</a>]baz",
    [["unlink",""]],
    "foo[<a name=\"foo\">bar</a>]baz",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["[foo<a name=foo>bar</a>baz]",
    [["unlink",""]],
    "[foo<a name=\"foo\">bar</a>baz]",
    [true],
    {"unlink":[false,false,"",false,false,""]}],
["[foo<a href=https://example.com class=bold>bar</a>baz]",
    [["stylewithcss", "false"], ["unlink",""]],
    "foobarbaz",
    [true, true],
    {"unlink":[false,false,"",false,false,""]}],
["foo<a href=https://example.com class=bold>[bar]</a>baz",
    [["stylewithcss", "false"], ["unlink",""]],
    "foobarbaz",
    [true, true],
    {"unlink":[false,false,"",false,false,""]}],
["[foo<a href=https://example.com class=bold>bar</a>baz]",
    [["stylewithcss", "true"], ["unlink",""]],
    "foobarbaz",
    [true, true],
    {"unlink":[false,false,"",false,false,""]}],
["foo<a href=https://example.com class=bold>[bar]</a>baz",
    [["stylewithcss", "true"], ["unlink",""]],
    "foobarbaz",
    [true, true],
    {"unlink":[false,false,"",false,false,""]}],
["[foo<a href=https://example.com style=font-weight:bold>bar</a>baz]",
    [["stylewithcss", "false"], ["unlink",""]],
    "foo<b>bar</b>baz",
    [true, true],
    {"unlink":[false,false,"",false,false,""]}],
["foo<a href=https://example.com style=font-weight:bold>[bar]</a>baz",
    [["stylewithcss", "false"], ["unlink",""]],
    "foo<b>bar</b>baz",
    [true, true],
    {"unlink":[false,false,"",false,false,""]}],
["[foo<a href=https://example.com style=font-weight:bold>bar</a>baz]",
    [["stylewithcss", "true"], ["unlink",""]],
    "foo<span style=\"font-weight:bold\">bar</span>baz",
    [true, true],
    {"unlink":[false,false,"",false,false,""]}],
["foo<a href=https://example.com style=font-weight:bold>[bar]</a>baz",
    [["stylewithcss", "true"], ["unlink",""]],
    "foo<span style=\"font-weight:bold\">bar</span>baz",
    [true, true],
    {"unlink":[false,false,"",false,false,""]}],
]

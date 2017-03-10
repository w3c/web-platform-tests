var browserTests = [
["foo[]bar",
    [["removeformat",""]],
    "foo[]bar",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["<span>foo</span>{}<span>bar</span>",
    [["removeformat",""]],
    "<span>foo</span>{}<span>bar</span>",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["<span>foo[</span><span>]bar</span>",
    [["removeformat",""]],
    "<span>foo[</span><span>]bar</span>",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<b>bar</b>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<b>bar</b>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo[<b>bar</b>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "foo[barbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo[<b>bar</b>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "foo[barbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo[<b>bar</b>]baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo[<b>bar</b>]baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<b>[bar]</b>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<b>[bar]</b>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<b>b[a]r</b>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<b>b</b>[a]<b>r</b>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<b>b[a]r</b>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<b>b</b>[a]<b>r</b>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<span style=\"font-weight: bold\">bar</span>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<span style=\"font-weight: bold\">bar</span>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<span style=\"font-weight: bold\">b[a]r</span>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<span style=\"font-weight:bold\">b</span>[a]<span style=\"font-weight:bold\">r</span>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<span style=\"font-weight: bold\">b[a]r</span>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<span style=\"font-weight:bold\">b</span>[a]<span style=\"font-weight:bold\">r</span>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<span style=\"font-variant: small-caps\">bar</span>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<span style=\"font-variant: small-caps\">bar</span>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<span style=\"font-variant: small-caps\">b[a]r</span>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<span style=\"font-variant:small-caps\">b</span>[a]<span style=\"font-variant:small-caps\">r</span>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<span style=\"font-variant: small-caps\">b[a]r</span>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<span style=\"font-variant:small-caps\">b</span>[a]<span style=\"font-variant:small-caps\">r</span>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<b id=foo>bar</b>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<b id=foo>bar</b>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<b id=foo>b[a]r</b>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<b id=\"foo\">b</b>[a]<b>r</b>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<b id=foo>b[a]r</b>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<b id=\"foo\">b</b>[a]<b>r</b>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<a>bar</a>baz]",
    [["removeformat",""]],
    "[foo<a>bar</a>baz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<a>b[a]r</a>baz",
    [["removeformat",""]],
    "foo<a>b[a]r</a>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<a href=foo>bar</a>baz]",
    [["removeformat",""]],
    "[foo<a href=\"foo\">bar</a>baz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<a href=foo>b[a]r</a>baz",
    [["removeformat",""]],
    "foo<a href=\"foo\">b[a]r</a>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<abbr>bar</abbr>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<abbr>b[a]r</abbr>baz",
    [["removeformat",""]],
    "foo<abbr>b</abbr>[a]<abbr>r</abbr>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<acronym>bar</acronym>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<acronym>b[a]r</acronym>baz",
    [["removeformat",""]],
    "foo<acronym>b</acronym>[a]<acronym>r</acronym>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<bdi dir=rtl>bar</bdi>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<bdi dir=rtl>b[a]r</bdi>baz",
    [["removeformat",""]],
    "foo<bdi dir=\"rtl\">b</bdi>[a]<bdi dir=\"rtl\">r</bdi>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<bdo dir=rtl>bar</bdo>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<bdo dir=rtl>b[a]r</bdo>baz",
    [["removeformat",""]],
    "foo<bdo dir=\"rtl\">b</bdo>[a]<bdo dir=\"rtl\">r</bdo>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<big>bar</big>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<big>b[a]r</big>baz",
    [["removeformat",""]],
    "foo<big>b</big>[a]<big>r</big>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<blink>bar</blink>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<blink>b[a]r</blink>baz",
    [["removeformat",""]],
    "foo<blink>b</blink>[a]<blink>r</blink>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<cite>bar</cite>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<cite>b[a]r</cite>baz",
    [["removeformat",""]],
    "foo<cite>b</cite>[a]<cite>r</cite>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<code>bar</code>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<code>b[a]r</code>baz",
    [["removeformat",""]],
    "foo<code>b</code>[a]<code>r</code>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<del>bar</del>baz]",
    [["removeformat",""]],
    "[foo<del>bar</del>baz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<del>b[a]r</del>baz",
    [["removeformat",""]],
    "foo<del>b[a]r</del>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<dfn>bar</dfn>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<dfn>b[a]r</dfn>baz",
    [["removeformat",""]],
    "foo<dfn>b</dfn>[a]<dfn>r</dfn>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<em>bar</em>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<em>b[a]r</em>baz",
    [["removeformat",""]],
    "foo<em>b</em>[a]<em>r</em>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<font>bar</font>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<font>bar</font>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<font>b[a]r</font>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<font>b</font>[a]<font>r</font>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<font>b[a]r</font>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<font>b</font>[a]<font>r</font>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<font color=blue>bar</font>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<font color=blue>bar</font>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<font color=blue>b[a]r</font>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<font color=\"blue\">b</font>[a]<font color=\"blue\">r</font>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<font color=blue>b[a]r</font>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<font color=\"blue\">b</font>[a]<font color=\"blue\">r</font>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<i>bar</i>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<i>bar</i>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<i>b[a]r</i>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<i>b</i>[a]<i>r</i>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<i>b[a]r</i>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<i>b</i>[a]<i>r</i>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<ins>bar</ins>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<ins>b[a]r</ins>baz",
    [["removeformat",""]],
    "foo<ins>b</ins>[a]<ins>r</ins>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<kbd>bar</kbd>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<kbd>b[a]r</kbd>baz",
    [["removeformat",""]],
    "foo<kbd>b</kbd>[a]<kbd>r</kbd>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<mark>bar</mark>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<mark>b[a]r</mark>baz",
    [["removeformat",""]],
    "foo<mark>b</mark>[a]<mark>r</mark>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<nobr>bar</nobr>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<nobr>b[a]r</nobr>baz",
    [["removeformat",""]],
    "foo<nobr>b</nobr>[a]<nobr>r</nobr>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<q>bar</q>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<q>b[a]r</q>baz",
    [["removeformat",""]],
    "foo<q>b</q>[a]<q>r</q>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<samp>bar</samp>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<samp>b[a]r</samp>baz",
    [["removeformat",""]],
    "foo<samp>b</samp>[a]<samp>r</samp>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<s>bar</s>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<s>bar</s>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<s>b[a]r</s>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<s>b</s>[a]<s>r</s>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<s>b[a]r</s>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<s>b</s>[a]<s>r</s>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<small>bar</small>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<small>b[a]r</small>baz",
    [["removeformat",""]],
    "foo<small>b</small>[a]<small>r</small>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<span>bar</span>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<span>b[a]r</span>baz",
    [["removeformat",""]],
    "foo<span>b</span>[a]<span>r</span>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<strike>bar</strike>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<strike>bar</strike>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<strike>b[a]r</strike>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<strike>b</strike>[a]<strike>r</strike>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<strike>b[a]r</strike>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<strike>b</strike>[a]<strike>r</strike>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<strong>bar</strong>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<strong>b[a]r</strong>baz",
    [["removeformat",""]],
    "foo<strong>b</strong>[a]<strong>r</strong>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<sub>bar</sub>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<sub>bar</sub>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<sub>b[a]r</sub>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<sub>b</sub>[a]<sub>r</sub>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<sub>b[a]r</sub>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<sub>b</sub>[a]<sub>r</sub>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<sup>bar</sup>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<sup>bar</sup>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<sup>b[a]r</sup>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<sup>b</sup>[a]<sup>r</sup>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<sup>b[a]r</sup>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<sup>b</sup>[a]<sup>r</sup>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<tt>bar</tt>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<tt>b[a]r</tt>baz",
    [["removeformat",""]],
    "foo<tt>b</tt>[a]<tt>r</tt>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<u>bar</u>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<u>bar</u>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<u>b[a]r</u>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<u>b</u>[a]<u>r</u>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<u>b[a]r</u>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<u>b</u>[a]<u>r</u>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<var>bar</var>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<var>b[a]r</var>baz",
    [["removeformat",""]],
    "foo<var>b</var>[a]<var>r</var>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<br>bar]",
    [["removeformat",""]],
    "[foo<br>bar]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<hr>bar]",
    [["removeformat",""]],
    "[foo<hr>bar]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<wbr>bar]",
    [["removeformat",""]],
    "[foo<wbr>bar]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<img>bar]",
    [["removeformat",""]],
    "[foo<img>bar]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<img src=abc>bar]",
    [["removeformat",""]],
    "[foo<img src=\"abc\">bar]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<video></video>bar]",
    [["removeformat",""]],
    "[foo<video></video>bar]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<video src=abc></video>bar]",
    [["removeformat",""]],
    "[foo<video src=\"abc\"></video>bar]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<svg><circle fill=blue r=20 cx=20 cy=20 /></svg>bar]",
    [["removeformat",""]],
    "[foo<svg><circle fill=\"blue\" r=\"20\" cx=\"20\" cy=\"20\"></circle></svg>bar]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<nonexistentelement>bar</nonexistentelement>baz]",
    [["removeformat",""]],
    "[foo<nonexistentelement>bar</nonexistentelement>baz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<nonexistentelement>b[a]r</nonexistentelement>baz",
    [["removeformat",""]],
    "foo<nonexistentelement>b[a]r</nonexistentelement>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<nonexistentelement style=\"display: block\">bar</nonexistentelement>baz]",
    [["removeformat",""]],
    "[foo<nonexistentelement style=\"display:block\">bar</nonexistentelement>baz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<nonexistentelement style=\"display: block\">b[a]r</nonexistentelement>baz",
    [["removeformat",""]],
    "foo<nonexistentelement style=\"display:block\">b[a]r</nonexistentelement>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<span id=foo>bar</span>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<span id=foo>b[a]r</span>baz",
    [["removeformat",""]],
    "foo<span id=\"foo\">b</span>[a]<span>r</span>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<span class=foo>bar</span>baz]",
    [["removeformat",""]],
    "[foobarbaz]",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["foo<span class=foo>b[a]r</span>baz",
    [["removeformat",""]],
    "foo<span class=\"foo\">b</span>[a]<span class=\"foo\">r</span>baz",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["[foo<b style=\"font-weight: normal\">bar</b>baz]",
    [["stylewithcss","true"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["[foo<b style=\"font-weight: normal\">bar</b>baz]",
    [["stylewithcss","false"],["removeformat",""]],
    "[foobarbaz]",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["foo<b style=\"font-weight: normal\">b[a]r</b>baz",
    [["stylewithcss","true"],["removeformat",""]],
    "foo<b style=\"font-weight:normal\">b</b>[a]<b style=\"font-weight:normal\">r</b>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["foo<b style=\"font-weight: normal\">b[a]r</b>baz",
    [["stylewithcss","false"],["removeformat",""]],
    "foo<b style=\"font-weight:normal\">b</b>[a]<b style=\"font-weight:normal\">r</b>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["<p style=\"background-color: aqua\">foo[bar]baz</p>",
    [["removeformat",""]],
    "<p style=\"background-color:rgb(0, 255, 255)\">foo[bar]baz</p>",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["<p><span style=\"background-color: aqua\">foo[bar]baz</span></p>",
    [["stylewithcss","true"],["removeformat",""]],
    "<p><span style=\"background-color:rgb(0, 255, 255)\">foo</span>[bar]<span style=\"background-color:rgb(0, 255, 255)\">baz</span></p>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["<p><span style=\"background-color: aqua\">foo[bar]baz</span></p>",
    [["stylewithcss","false"],["removeformat",""]],
    "<p><span style=\"background-color:rgb(0, 255, 255)\">foo</span>[bar]<span style=\"background-color:rgb(0, 255, 255)\">baz</span></p>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["<p style=\"font-weight: bold\">foo[bar]baz</p>",
    [["stylewithcss","true"],["removeformat",""]],
    "<p><span style=\"font-weight:bold\">foo</span>[bar]<span style=\"font-weight:bold\">baz</span></p>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["<p style=\"font-weight: bold\">foo[bar]baz</p>",
    [["stylewithcss","false"],["removeformat",""]],
    "<p><b>foo</b>[bar]<b>baz</b></p>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["<b><p style=\"font-weight: bold\">foo[bar]baz</p></b>",
    [["stylewithcss","true"],["removeformat",""]],
    "<p><span style=\"font-weight:bold\">foo</span>[bar]<span style=\"font-weight:bold\">baz</span></p>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["<b><p style=\"font-weight: bold\">foo[bar]baz</p></b>",
    [["stylewithcss","false"],["removeformat",""]],
    "<p><b>foo</b>[bar]<b>baz</b></p>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}],
["<p style=\"font-variant: small-caps\">foo[bar]baz</p>",
    [["removeformat",""]],
    "<p style=\"font-variant:small-caps\">foo[bar]baz</p>",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["{<p style=\"font-variant: small-caps\">foobarbaz</p>}",
    [["removeformat",""]],
    "{<p style=\"font-variant:small-caps\">foobarbaz</p>}",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["<p style=\"text-indent: 2em\">foo[bar]baz</p>",
    [["removeformat",""]],
    "<p style=\"text-indent:2em\">foo[bar]baz</p>",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["{<p style=\"text-indent: 2em\">foobarbaz</p>}",
    [["removeformat",""]],
    "{<p style=\"text-indent:2em\">foobarbaz</p>}",
    [true],
    {"removeformat":[false,false,"",false,false,""]}],
["<table data-start=0 data-end=1><tr><td><b>foo</b></table>",
    [["stylewithcss","true"],["removeformat",""]],
    "<table>{<tbody><tr><td>foo</td></tr></tbody>}</table>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"removeformat":[false,false,"",false,false,""]}],
["<table data-start=0 data-end=1><tr><td><b>foo</b></table>",
    [["stylewithcss","false"],["removeformat",""]],
    "<table>{<tbody><tr><td>foo</td></tr></tbody>}</table>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"removeformat":[false,false,"",false,false,""]}]
]

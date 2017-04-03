// For documentation of the format, see README in this directory.
var browserTests = [
["foo[]bar",
    [["italic",""]],
    "foo[]bar",
    [true],
    {"italic":[false,false,"",false,true,""]}],
["<p>[foo</p> <p>bar]</p>",
    [["stylewithcss","true"],["italic",""]],
    "<p><span style=\"font-style:italic\">[foo</span></p> <p><span style=\"font-style:italic\">bar]</span></p>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["<p>[foo</p> <p>bar]</p>",
    [["stylewithcss","false"],["italic",""]],
    "<p><i>[foo</i></p> <p><i>bar]</i></p>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["<span>[foo</span> <span>bar]</span>",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:italic\"><span>[foo</span> <span>bar]</span></span>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["<span>[foo</span> <span>bar]</span>",
    [["stylewithcss","false"],["italic",""]],
    "<i><span>[foo</span> <span>bar]</span></i>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["<p>[foo</p><p> <span>bar</span> </p><p>baz]</p>",
    [["stylewithcss","true"],["italic",""]],
    "<p><span style=\"font-style:italic\">[foo</span></p><p> <span style=\"font-style:italic\"><span>bar</span></span> </p><p><span style=\"font-style:italic\">baz]</span></p>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["<p>[foo</p><p> <span>bar</span> </p><p>baz]</p>",
    [["stylewithcss","false"],["italic",""]],
    "<p><i>[foo</i></p><p> <i><span>bar</span></i> </p><p><i>baz]</i></p>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["<p>[foo<p><br><p>bar]",
    [["stylewithcss","true"],["italic",""]],
    "<p><span style=\"font-style:italic\">[foo</span></p><p><span style=\"font-style:italic\"><br></span></p><p><span style=\"font-style:italic\">bar]</span></p>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["<p>[foo<p><br><p>bar]",
    [["stylewithcss","false"],["italic",""]],
    "<p><i>[foo</i></p><p><i><br></i></p><p><i>bar]</i></p>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["<b>foo[]bar</b>",
    [["italic",""]],
    "<b>foo[]bar</b>",
    [true],
    {"italic":[false,false,"",false,true,""]}],
["<i>foo[]bar</i>",
    [["italic",""]],
    "<i>foo[]bar</i>",
    [true],
    {"italic":[false,true,"",false,false,""]}],
["<span>foo</span>{}<span>bar</span>",
    [["italic",""]],
    "<span>foo</span>{}<span>bar</span>",
    [true],
    {"italic":[false,false,"",false,true,""]}],
["<span>foo[</span><span>]bar</span>",
    [["italic",""]],
    "<span>foo[</span><span>]bar</span>",
    [true],
    {"italic":[false,false,"",false,true,""]}],
["foo[bar]baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<span style=\"font-style:italic\">[bar]</span>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["foo[bar]baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<i>[bar]</i>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["foo[bar<b>baz]qoz</b>quz",
    [["stylewithcss","true"],["italic",""]],
    "foo<span style=\"font-style:italic\">[bar</span><b><span style=\"font-style:italic\">baz]</span>qoz</b>quz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["foo[bar<b>baz]qoz</b>quz",
    [["stylewithcss","false"],["italic",""]],
    "foo<i>[bar</i><b><i>baz]</i>qoz</b>quz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["foo[bar<i>baz]qoz</i>quz",
    [["italic",""]],
    "foo<i>[barbaz]qoz</i>quz",
    [true],
    {"italic":[true,false,"",false,true,""]}],
["{<p><p> <p>foo</p>}",
    [["stylewithcss","true"],["italic",""]],
    "{<p></p><p> </p><p><span style=\"font-style:italic\">foo</span></p>}",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["{<p><p> <p>foo</p>}",
    [["stylewithcss","false"],["italic",""]],
    "{<p></p><p> </p><p><i>foo</i></p>}",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["<table><tbody><tr><td>foo<td>b[a]r<td>baz</table>",
    [["stylewithcss","true"],["italic",""]],
    "<table><tbody><tr><td>foo</td><td>b<span style=\"font-style:italic\">[a]</span>r</td><td>baz</td></tr></tbody></table>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["<table><tbody><tr><td>foo<td>b[a]r<td>baz</table>",
    [["stylewithcss","false"],["italic",""]],
    "<table><tbody><tr><td>foo</td><td>b<i>[a]</i>r</td><td>baz</td></tr></tbody></table>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["<table><tbody><tr data-start=1 data-end=2><td>foo<td>bar<td>baz</table>",
    [["stylewithcss","true"],["italic",""]],
    "<table><tbody><tr><td>foo</td>{<td><span style=\"font-style:italic\">bar</span></td>}<td>baz</td></tr></tbody></table>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["<table><tbody><tr data-start=1 data-end=2><td>foo<td>bar<td>baz</table>",
    [["stylewithcss","false"],["italic",""]],
    "<table><tbody><tr><td>foo</td>{<td><i>bar</i></td>}<td>baz</td></tr></tbody></table>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["<table><tbody><tr data-start=0 data-end=2><td>foo<td>bar<td>baz</table>",
    [["stylewithcss","true"],["italic",""]],
    "<table><tbody><tr>{<td><span style=\"font-style:italic\">foo</span></td><td><span style=\"font-style:italic\">bar</span></td>}<td>baz</td></tr></tbody></table>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["<table><tbody><tr data-start=0 data-end=2><td>foo<td>bar<td>baz</table>",
    [["stylewithcss","false"],["italic",""]],
    "<table><tbody><tr>{<td><i>foo</i></td><td><i>bar</i></td>}<td>baz</td></tr></tbody></table>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["<table><tbody data-start=0 data-end=1><tr><td>foo<td>bar<td>baz</table>",
    [["stylewithcss","true"],["italic",""]],
    "<table><tbody>{<tr><td><span style=\"font-style:italic\">foo</span></td><td><span style=\"font-style:italic\">bar</span></td><td><span style=\"font-style:italic\">baz</span></td></tr>}</tbody></table>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["<table><tbody data-start=0 data-end=1><tr><td>foo<td>bar<td>baz</table>",
    [["stylewithcss","false"],["italic",""]],
    "<table><tbody>{<tr><td><i>foo</i></td><td><i>bar</i></td><td><i>baz</i></td></tr>}</tbody></table>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["<table data-start=0 data-end=1><tbody><tr><td>foo<td>bar<td>baz</table>",
    [["stylewithcss","true"],["italic",""]],
    "<table>{<tbody><tr><td><span style=\"font-style:italic\">foo</span></td><td><span style=\"font-style:italic\">bar</span></td><td><span style=\"font-style:italic\">baz</span></td></tr></tbody>}</table>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["<table data-start=0 data-end=1><tbody><tr><td>foo<td>bar<td>baz</table>",
    [["stylewithcss","false"],["italic",""]],
    "<table>{<tbody><tr><td><i>foo</i></td><td><i>bar</i></td><td><i>baz</i></td></tr></tbody>}</table>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["{<table><tr><td>foo<td>bar<td>baz</table>}",
    [["stylewithcss","true"],["italic",""]],
    "{<table><tbody><tr><td><span style=\"font-style:italic\">foo</span></td><td><span style=\"font-style:italic\">bar</span></td><td><span style=\"font-style:italic\">baz</span></td></tr></tbody></table>}",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["{<table><tr><td>foo<td>bar<td>baz</table>}",
    [["stylewithcss","false"],["italic",""]],
    "{<table><tbody><tr><td><i>foo</i></td><td><i>bar</i></td><td><i>baz</i></td></tr></tbody></table>}",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["foo<address>[bar]</address>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<address><span style=\"font-style:normal\">[bar]</span></address>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<address>[bar]</address>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<address><span style=\"font-style:normal\">[bar]</span></address>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<cite>[bar]</cite>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<cite><span style=\"font-style:normal\">[bar]</span></cite>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<cite>[bar]</cite>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<cite><span style=\"font-style:normal\">[bar]</span></cite>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<dfn>[bar]</dfn>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<dfn><span style=\"font-style:normal\">[bar]</span></dfn>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<dfn>[bar]</dfn>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<dfn><span style=\"font-style:normal\">[bar]</span></dfn>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<em>[bar]</em>baz",
    [["italic",""]],
    "foo[bar]baz",
    [true],
    {"italic":[false,true,"",false,false,""]}],
["foo<var>[bar]</var>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<var><span style=\"font-style:normal\">[bar]</span></var>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<var>[bar]</var>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<var><span style=\"font-style:normal\">[bar]</span></var>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo{<address>bar</address>}baz",
    [["stylewithcss","true"],["italic",""]],
    "foo{<address><span style=\"font-style:normal\">bar</span></address>}baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo{<address>bar</address>}baz",
    [["stylewithcss","false"],["italic",""]],
    "foo{<address><span style=\"font-style:normal\">bar</span></address>}baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo{<cite>bar</cite>}baz",
    [["stylewithcss","true"],["italic",""]],
    "foo{<cite><span style=\"font-style:normal\">bar</span></cite>}baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo{<cite>bar</cite>}baz",
    [["stylewithcss","false"],["italic",""]],
    "foo{<cite><span style=\"font-style:normal\">bar</span></cite>}baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo{<dfn>bar</dfn>}baz",
    [["stylewithcss","true"],["italic",""]],
    "foo{<dfn><span style=\"font-style:normal\">bar</span></dfn>}baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo{<dfn>bar</dfn>}baz",
    [["stylewithcss","false"],["italic",""]],
    "foo{<dfn><span style=\"font-style:normal\">bar</span></dfn>}baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo{<em>bar</em>}baz",
    [["italic",""]],
    "foo{bar}baz",
    [true],
    {"italic":[false,true,"",false,false,""]}],
["foo{<var>bar</var>}baz",
    [["stylewithcss","true"],["italic",""]],
    "foo{<var><span style=\"font-style:normal\">bar</span></var>}baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo{<var>bar</var>}baz",
    [["stylewithcss","false"],["italic",""]],
    "foo{<var><span style=\"font-style:normal\">bar</span></var>}baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<address>b[a]r</address>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<address>b<span style=\"font-style:normal\">[a]</span>r</address>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<address>b[a]r</address>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<address>b<span style=\"font-style:normal\">[a]</span>r</address>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<cite>b[a]r</cite>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<cite>b<span style=\"font-style:normal\">[a]</span>r</cite>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<cite>b[a]r</cite>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<cite>b<span style=\"font-style:normal\">[a]</span>r</cite>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<dfn>b[a]r</dfn>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<dfn>b<span style=\"font-style:normal\">[a]</span>r</dfn>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<dfn>b[a]r</dfn>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<dfn>b<span style=\"font-style:normal\">[a]</span>r</dfn>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<em>b[a]r</em>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<span style=\"font-style:italic\">b</span>[a]<span style=\"font-style:italic\">r</span>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<em>b[a]r</em>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<i>b</i>[a]<i>r</i>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<i>b[a]r</i>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<span style=\"font-style:italic\">b</span>[a]<span style=\"font-style:italic\">r</span>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<i>b[a]r</i>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<i>b</i>[a]<i>r</i>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<var>b[a]r</var>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<var>b<span style=\"font-style:normal\">[a]</span>r</var>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<var>b[a]r</var>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<var>b<span style=\"font-style:normal\">[a]</span>r</var>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["fo[o<address>bar</address>b]az",
    [["stylewithcss","true"],["italic",""]],
    "fo<span style=\"font-style:italic\">[o</span><address>bar</address><span style=\"font-style:italic\">b]</span>az",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["fo[o<address>bar</address>b]az",
    [["stylewithcss","false"],["italic",""]],
    "fo<i>[o</i><address>bar</address><i>b]</i>az",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["fo[o<cite>bar</cite>b]az",
    [["stylewithcss","true"],["italic",""]],
    "fo<span style=\"font-style:italic\">[o<cite>bar</cite>b]</span>az",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["fo[o<cite>bar</cite>b]az",
    [["stylewithcss","false"],["italic",""]],
    "fo<i>[o<cite>bar</cite>b]</i>az",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["fo[o<dfn>bar</dfn>b]az",
    [["stylewithcss","true"],["italic",""]],
    "fo<span style=\"font-style:italic\">[o<dfn>bar</dfn>b]</span>az",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["fo[o<dfn>bar</dfn>b]az",
    [["stylewithcss","false"],["italic",""]],
    "fo<i>[o<dfn>bar</dfn>b]</i>az",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["fo[o<em>bar</em>b]az",
    [["stylewithcss","true"],["italic",""]],
    "fo<span style=\"font-style:italic\">[obarb]</span>az",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["fo[o<em>bar</em>b]az",
    [["stylewithcss","false"],["italic",""]],
    "fo<i>[obarb]</i>az",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["fo[o<var>bar</var>b]az",
    [["stylewithcss","true"],["italic",""]],
    "fo<span style=\"font-style:italic\">[o<var>bar</var>b]</span>az",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["fo[o<var>bar</var>b]az",
    [["stylewithcss","false"],["italic",""]],
    "fo<i>[o<var>bar</var>b]</i>az",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["foo[<address>bar</address>baz]",
    [["stylewithcss","true"],["italic",""]],
    "foo[<address>bar</address><span style=\"font-style:italic\">baz]</span>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["foo[<address>bar</address>baz]",
    [["stylewithcss","false"],["italic",""]],
    "foo[<address>bar</address><i>baz]</i>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["foo[<cite>bar</cite>baz]",
    [["stylewithcss","true"],["italic",""]],
    "foo[<cite>bar</cite><span style=\"font-style:italic\">baz]</span>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["foo[<cite>bar</cite>baz]",
    [["stylewithcss","false"],["italic",""]],
    "foo[<cite>bar</cite><i>baz]</i>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["foo[<dfn>bar</dfn>baz]",
    [["stylewithcss","true"],["italic",""]],
    "foo[<dfn>bar</dfn><span style=\"font-style:italic\">baz]</span>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["foo[<dfn>bar</dfn>baz]",
    [["stylewithcss","false"],["italic",""]],
    "foo[<dfn>bar</dfn><i>baz]</i>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["foo[<em>bar</em>baz]",
    [["stylewithcss","true"],["italic",""]],
    "foo[<span style=\"font-style:italic\">barbaz]</span>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["foo[<em>bar</em>baz]",
    [["stylewithcss","false"],["italic",""]],
    "foo[<i>barbaz]</i>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["foo[<i>bar</i>baz]",
    [["stylewithcss","true"],["italic",""]],
    "foo[<span style=\"font-style:italic\">barbaz]</span>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["foo[<i>bar</i>baz]",
    [["stylewithcss","false"],["italic",""]],
    "foo[<i>barbaz]</i>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["foo[<var>bar</var>baz]",
    [["stylewithcss","true"],["italic",""]],
    "foo[<var>bar</var><span style=\"font-style:italic\">baz]</span>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["foo[<var>bar</var>baz]",
    [["stylewithcss","false"],["italic",""]],
    "foo[<var>bar</var><i>baz]</i>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["[foo<address>bar</address>]baz",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:italic\">[foo</span><address>bar</address>]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["[foo<address>bar</address>]baz",
    [["stylewithcss","false"],["italic",""]],
    "<i>[foo</i><address>bar</address>]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["[foo<cite>bar</cite>]baz",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:italic\">[foo<cite>bar</cite></span>]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["[foo<cite>bar</cite>]baz",
    [["stylewithcss","false"],["italic",""]],
    "<i>[foo<cite>bar</cite></i>]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["[foo<dfn>bar</dfn>]baz",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:italic\">[foo<dfn>bar</dfn></span>]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["[foo<dfn>bar</dfn>]baz",
    [["stylewithcss","false"],["italic",""]],
    "<i>[foo<dfn>bar</dfn></i>]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["[foo<em>bar</em>]baz",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:italic\">[foobar</span>]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["[foo<em>bar</em>]baz",
    [["stylewithcss","false"],["italic",""]],
    "<i>[foobar</i>]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["[foo<i>bar</i>]baz",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:italic\">[foobar</span>]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["[foo<i>bar</i>]baz",
    [["stylewithcss","false"],["italic",""]],
    "<i>[foobar</i>]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["[foo<var>bar</var>]baz",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:italic\">[foo<var>bar</var></span>]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["[foo<var>bar</var>]baz",
    [["stylewithcss","false"],["italic",""]],
    "<i>[foo<var>bar</var></i>]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["foo<span style=\"font-style: italic\">[bar]</span>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<span style=\"font-style: italic\">[bar]</span>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<span style=\"font-style: oblique\">[bar]</span>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<span style=\"font-style: oblique\">[bar]</span>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<span style=\"font-style: oblique\">b[a]r</span>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<span style=\"font-style:oblique\">b</span>[a]<span style=\"font-style:oblique\">r</span>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<span style=\"font-style: oblique\">b[a]r</span>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<span style=\"font-style:oblique\">b</span>[a]<span style=\"font-style:oblique\">r</span>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["<i>{<p>foo</p><p>bar</p>}<p>baz</p></i>",
    [["stylewithcss","true"],["italic",""]],
    "{<p>foo</p><p>bar</p>}<p><span style=\"font-style:italic\">baz</span></p>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["<i>{<p>foo</p><p>bar</p>}<p>baz</p></i>",
    [["stylewithcss","false"],["italic",""]],
    "{<p>foo</p><p>bar</p>}<p><i>baz</i></p>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["<i><p>foo[<b>bar</b>}</p><p>baz</p></i>",
    [["stylewithcss","true"],["italic",""]],
    "<p><span style=\"font-style:italic\">foo[</span><b>bar</b>}</p><p><span style=\"font-style:italic\">baz</span></p>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["<i><p>foo[<b>bar</b>}</p><p>baz</p></i>",
    [["stylewithcss","false"],["italic",""]],
    "<p><i>foo[</i><b>bar</b>}</p><p><i>baz</i></p>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo [bar <b>baz] qoz</b> quz sic",
    [["stylewithcss","true"],["italic",""]],
    "foo <span style=\"font-style:italic\">[bar </span><b><span style=\"font-style:italic\">baz]</span> qoz</b> quz sic",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["foo [bar <b>baz] qoz</b> quz sic",
    [["stylewithcss","false"],["italic",""]],
    "foo <i>[bar </i><b><i>baz]</i> qoz</b> quz sic",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["foo bar <b>baz [qoz</b> quz] sic",
    [["stylewithcss","true"],["italic",""]],
    "foo bar <b>baz <span style=\"font-style:italic\">[qoz</span></b><span style=\"font-style:italic\"> quz]</span> sic",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,false,"",false,true,""]}],
["foo bar <b>baz [qoz</b> quz] sic",
    [["stylewithcss","false"],["italic",""]],
    "foo bar <b>baz <i>[qoz</i></b><i> quz]</i> sic",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,false,"",false,true,""]}],
["foo [bar <i>baz] qoz</i> quz sic",
    [["italic",""]],
    "foo <i>[bar baz] qoz</i> quz sic",
    [true],
    {"italic":[true,false,"",false,true,""]}],
["foo bar <i>baz [qoz</i> quz] sic",
    [["italic",""]],
    "foo bar <i>baz [qoz quz]</i> sic",
    [true],
    {"italic":[true,false,"",false,true,""]}],
["fo[o<i>b]ar</i>baz",
    [["italic",""]],
    "fo<i>[ob]ar</i>baz",
    [true],
    {"italic":[true,false,"",false,true,""]}],
["foo<i>ba[r</i>b]az",
    [["italic",""]],
    "foo<i>ba[rb]</i>az",
    [true],
    {"italic":[true,false,"",false,true,""]}],
["fo[o<i>bar</i>b]az",
    [["stylewithcss","true"],["italic",""]],
    "fo<span style=\"font-style:italic\">[obarb]</span>az",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["fo[o<i>bar</i>b]az",
    [["stylewithcss","false"],["italic",""]],
    "fo<i>[obarb]</i>az",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["foo[<i>b]ar</i>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo[b]<span style=\"font-style:italic\">ar</span>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo[<i>b]ar</i>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo[b]<i>ar</i>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<i>ba[r</i>]baz",
    [["stylewithcss","true"],["italic",""]],
    "foo<span style=\"font-style:italic\">ba</span>[r]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<i>ba[r</i>]baz",
    [["stylewithcss","false"],["italic",""]],
    "foo<i>ba</i>[r]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo[<i>bar</i>]baz",
    [["stylewithcss","true"],["italic",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo[<i>bar</i>]baz",
    [["stylewithcss","false"],["italic",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo<i>[bar]</i>baz",
    [["stylewithcss","true"],["italic",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo<i>[bar]</i>baz",
    [["stylewithcss","false"],["italic",""]],
    "foo[bar]baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["foo{<i>bar</i>}baz",
    [["stylewithcss","true"],["italic",""]],
    "foo{bar}baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["foo{<i>bar</i>}baz",
    [["stylewithcss","false"],["italic",""]],
    "foo{bar}baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["fo[o<span style=font-style:italic>b]ar</span>baz",
    [["italic",""]],
    "fo<span style=\"font-style:italic\">[ob]ar</span>baz",
    [true],
    {"italic":[true,false,"",false,true,""]}],
["fo[o<span style=font-style:oblique>b]ar</span>baz",
    [["stylewithcss","true"],["italic",""]],
    "fo<span style=\"font-style:italic\">[o</span><span style=\"font-style:oblique\"><span style=\"font-style:italic\">b]</span>ar</span>baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[true,false,"",false,true,""]}],
["fo[o<span style=font-style:oblique>b]ar</span>baz",
    [["stylewithcss","false"],["italic",""]],
    "fo<i>[o</i><span style=\"font-style:oblique\"><i>b]</i>ar</span>baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[true,false,"",false,true,""]}],
["<span style=font-style:italic>fo[o</span><span style=font-style:oblique>b]ar</span>",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:italic\">fo</span>[ob]<span style=\"font-style:oblique\">ar</span>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["<span style=font-style:italic>fo[o</span><span style=font-style:oblique>b]ar</span>",
    [["stylewithcss","false"],["italic",""]],
    "<i>fo</i>[ob]<span style=\"font-style:oblique\">ar</span>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["<span style=font-style:oblique>fo[o</span><span style=font-style:italic>b]ar</span>",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:oblique\">fo</span>[ob]<span style=\"font-style:italic\">ar</span>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["<span style=font-style:oblique>fo[o</span><span style=font-style:italic>b]ar</span>",
    [["stylewithcss","false"],["italic",""]],
    "<span style=\"font-style:oblique\">fo</span>[ob]<i>ar</i>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}],
["<i>fo[o</i><address>b]ar</address>",
    [["stylewithcss","true"],["italic",""]],
    "<span style=\"font-style:italic\">fo</span>[o<address><span style=\"font-style:normal\">b]</span>ar</address>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"italic":[false,true,"",false,false,""]}],
["<i>fo[o</i><address>b]ar</address>",
    [["stylewithcss","false"],["italic",""]],
    "<i>fo</i>[o<address><span style=\"font-style:normal\">b]</span>ar</address>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"italic":[false,true,"",false,false,""]}]
]

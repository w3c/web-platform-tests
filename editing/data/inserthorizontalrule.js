var browserTests = [
["foo[]bar",
    [["inserthorizontalrule",""]],
    "foo<hr>{}bar",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<span>foo</span>{}<span>bar</span>",
    [["inserthorizontalrule",""]],
    "<span>foo</span><hr>{}<span>bar</span>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<span>foo[</span><span>]bar</span>",
    [["inserthorizontalrule",""]],
    "<span>foo</span><hr>{}<span>bar</span>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo[bar<p>baz]quz",
    [["inserthorizontalrule",""]],
    "<p>foo</p><hr>{}<p>quz</p>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<div><b>foo</b>{}<b>bar</b></div>",
    [["inserthorizontalrule",""]],
    "<div><b>foo</b><hr>{}<b>bar</b></div>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<div><b>foo[</b><b>]bar</b></div>",
    [["inserthorizontalrule",""]],
    "<div><b>foo</b><hr>{}<b>bar</b></div>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<div><b>foo</b>{<b>bar</b>}<b>baz</b></div>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<div><b>foo</b><hr>{}<b>baz</b></div>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<div><b>foo</b>{<b>bar</b>}<b>baz</b></div>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<div><b>foo</b><hr>{}<b>baz</b></div>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<b>foo[]bar</b>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<b>foo</b><hr>{}<b>bar</b>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<b>foo[]bar</b>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<b>foo</b><hr>{}<b>bar</b>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<b id=abc>foo[]bar</b>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<b id=\"abc\">foo</b><hr>{}<b>bar</b>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<b id=abc>foo[]bar</b>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<b id=\"abc\">foo</b><hr>{}<b>bar</b>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["foo[bar]baz",
    [["inserthorizontalrule","abc"]],
    "foo<hr>{}baz",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["foo[bar]baz",
    [["inserthorizontalrule",""]],
    "foo<hr>{}baz",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["foo<b>[bar]</b>baz",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "foo<hr>{}baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["foo<b>[bar]</b>baz",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "foo<hr>{}baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["foo<b>{bar}</b>baz",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "foo<hr>{}baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["foo<b>{bar}</b>baz",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "foo<hr>{}baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["foo{<b>bar</b>}baz",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "foo<hr>{}baz",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["foo{<b>bar</b>}baz",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "foo<hr>{}baz",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo<p>[bar]<p>baz",
    [["defaultparagraphseparator","div"],["inserthorizontalrule",""]],
    "<p>foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"div",false,false,"div"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo<p>[bar]<p>baz",
    [["defaultparagraphseparator","p"],["inserthorizontalrule",""]],
    "<p>foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"div",false,false,"p"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo<p>{bar}<p>baz",
    [["defaultparagraphseparator","div"],["inserthorizontalrule",""]],
    "<p>foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"p",false,false,"div"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo<p>{bar}<p>baz",
    [["defaultparagraphseparator","p"],["inserthorizontalrule",""]],
    "<p>foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"div",false,false,"p"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo{<p>bar</p>}<p>baz",
    [["defaultparagraphseparator","div"],["inserthorizontalrule",""]],
    "<p>foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"p",false,false,"div"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo{<p>bar</p>}<p>baz",
    [["defaultparagraphseparator","p"],["inserthorizontalrule",""]],
    "<p>foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"div",false,false,"p"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo[bar]baz</p>",
    [["defaultparagraphseparator","div"],["inserthorizontalrule",""]],
    "<p>foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"p",false,false,"div"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo[bar]baz</p>",
    [["defaultparagraphseparator","p"],["inserthorizontalrule",""]],
    "<p>foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"div",false,false,"p"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p id=abc>foo[bar]baz</p>",
    [["defaultparagraphseparator","div"],["inserthorizontalrule",""]],
    "<p id=\"abc\">foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"p",false,false,"div"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p id=abc>foo[bar]baz</p>",
    [["defaultparagraphseparator","p"],["inserthorizontalrule",""]],
    "<p id=\"abc\">foo</p><hr>{}<p>baz</p>",
    [true,true],
    {"defaultparagraphseparator":[false,false,"div",false,false,"p"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo<b>b[a]r</b>baz</p>",
    [["stylewithcss","true"],["defaultparagraphseparator","div"],["inserthorizontalrule",""]],
    "<p>foo<b>b</b></p><hr>{}<p><b>r</b>baz</p>",
    [true,true,true],
    {"stylewithcss":[false,false,"",false,true,""],"defaultparagraphseparator":[false,false,"p",false,false,"div"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo<b>b[a]r</b>baz</p>",
    [["stylewithcss","false"],["defaultparagraphseparator","div"],["inserthorizontalrule",""]],
    "<p>foo<b>b</b></p><hr>{}<p><b>r</b>baz</p>",
    [true,true,true],
    {"stylewithcss":[false,true,"",false,false,""],"defaultparagraphseparator":[false,false,"div",false,false,"div"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo<b>b[a]r</b>baz</p>",
    [["stylewithcss","true"],["defaultparagraphseparator","p"],["inserthorizontalrule",""]],
    "<p>foo<b>b</b></p><hr>{}<p><b>r</b>baz</p>",
    [true,true,true],
    {"stylewithcss":[false,false,"",false,true,""],"defaultparagraphseparator":[false,false,"div",false,false,"p"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<p>foo<b>b[a]r</b>baz</p>",
    [["stylewithcss","false"],["defaultparagraphseparator","p"],["inserthorizontalrule",""]],
    "<p>foo<b>b</b></p><hr>{}<p><b>r</b>baz</p>",
    [true,true,true],
    {"stylewithcss":[false,true,"",false,false,""],"defaultparagraphseparator":[false,false,"p",false,false,"p"],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<a>foo[bar]baz</a>",
    [["inserthorizontalrule",""]],
    "<a>foo</a><hr>{}<a>baz</a>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<a href=/>foo[bar]baz</a>",
    [["inserthorizontalrule",""]],
    "<a href=\"/\">foo</a><hr>{}<a href=\"/\">baz</a>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<abbr>foo[bar]baz</abbr>",
    [["inserthorizontalrule",""]],
    "<abbr>foo</abbr><hr>{}<abbr>baz</abbr>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<address>foo[bar]baz</address>",
    [["inserthorizontalrule",""]],
    "<address>foo<hr>{}baz</address>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<article>foo[bar]baz</article>",
    [["inserthorizontalrule",""]],
    "<article>foo<hr>{}baz</article>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<aside>foo[bar]baz</aside>",
    [["inserthorizontalrule",""]],
    "<aside>foo<hr>{}baz</aside>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<b>foo[bar]baz</b>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<b>foo</b><hr>{}<b>baz</b>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<b>foo[bar]baz</b>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<b>foo</b><hr>{}<b>baz</b>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<bdi>foo[bar]baz</bdi>",
    [["inserthorizontalrule",""]],
    "<bdi>foo</bdi><hr>{}<bdi>baz</bdi>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<bdo dir=rtl>foo[bar]baz</bdo>",
    [["inserthorizontalrule",""]],
    "<bdo dir=\"rtl\">foo</bdo><hr>{}<bdo dir=\"rtl\">baz</bdo>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<blockquote>foo[bar]baz</blockquote>",
    [["inserthorizontalrule",""]],
    "<blockquote>foo<hr>{}baz</blockquote>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<table><caption>foo[bar]baz</caption><tr><td>quz</table>",
    [["inserthorizontalrule",""]],
    "<table><caption>foo<hr>{}baz</caption><tbody><tr><td>quz</td></tr></tbody></table>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<cite>foo[bar]baz</cite>",
    [["inserthorizontalrule",""]],
    "<cite>foo</cite><hr>{}<cite>baz</cite>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<code>foo[bar]baz</code>",
    [["inserthorizontalrule",""]],
    "<code>foo</code><hr>{}<code>baz</code>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<dl><dd>foo[bar]baz</dd></dl>",
    [["inserthorizontalrule",""]],
    "<dl><dd>foo<hr>{}baz</dd></dl>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<del>foo[bar]baz</del>",
    [["inserthorizontalrule",""]],
    "<del>foo<hr>{}baz</del>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<details>foo[bar]baz</details>",
    [["inserthorizontalrule",""]],
    "<details>foo<hr>{}baz</details>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<dfn>foo[bar]baz</dfn>",
    [["inserthorizontalrule",""]],
    "<dfn>foo</dfn><hr>{}<dfn>baz</dfn>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<div>foo[bar]baz</div>",
    [["inserthorizontalrule",""]],
    "<div>foo<hr>{}baz</div>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<dl><dt>foo[bar]baz</dt></dl>",
    [["inserthorizontalrule",""]],
    "<dl><dt>foo<hr>{}baz</dt></dl>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<em>foo[bar]baz</em>",
    [["inserthorizontalrule",""]],
    "<em>foo</em><hr>{}<em>baz</em>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<figure><figcaption>foo[bar]baz</figcaption>quz</figure>",
    [["inserthorizontalrule",""]],
    "<figure><figcaption>foo<hr>{}baz</figcaption>quz</figure>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<figure>foo[bar]baz</figure>",
    [["inserthorizontalrule",""]],
    "<figure>foo<hr>{}baz</figure>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<footer>foo[bar]baz</footer>",
    [["inserthorizontalrule",""]],
    "<footer>foo<hr>{}baz</footer>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<h1>foo[bar]baz</h1>",
    [["inserthorizontalrule",""]],
    "<h1>foo</h1><hr>{}<h1>baz</h1>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<h2>foo[bar]baz</h2>",
    [["inserthorizontalrule",""]],
    "<h2>foo</h2><hr>{}<h2>baz</h2>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<h3>foo[bar]baz</h3>",
    [["inserthorizontalrule",""]],
    "<h3>foo</h3><hr>{}<h3>baz</h3>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<h4>foo[bar]baz</h4>",
    [["inserthorizontalrule",""]],
    "<h4>foo</h4><hr>{}<h4>baz</h4>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<h5>foo[bar]baz</h5>",
    [["inserthorizontalrule",""]],
    "<h5>foo</h5><hr>{}<h5>baz</h5>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<h6>foo[bar]baz</h6>",
    [["inserthorizontalrule",""]],
    "<h6>foo</h6><hr>{}<h6>baz</h6>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<header>foo[bar]baz</header>",
    [["inserthorizontalrule",""]],
    "<header>foo<hr>{}baz</header>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<hgroup>foo[bar]baz</hgroup>",
    [["inserthorizontalrule",""]],
    "<hgroup>foo</hgroup><hr>{}<hgroup>baz</hgroup>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<hgroup><h1>foo[bar]baz</h1></hgroup>",
    [["inserthorizontalrule",""]],
    "<hgroup><h1>foo</h1></hgroup><hr>{}<hgroup><h1>baz</h1></hgroup>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<i>foo[bar]baz</i>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<i>foo</i><hr>{}<i>baz</i>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<i>foo[bar]baz</i>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<i>foo</i><hr>{}<i>baz</i>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<ins>foo[bar]baz</ins>",
    [["inserthorizontalrule",""]],
    "<ins>foo<hr>{}baz</ins>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<kbd>foo[bar]baz</kbd>",
    [["inserthorizontalrule",""]],
    "<kbd>foo</kbd><hr>{}<kbd>baz</kbd>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<mark>foo[bar]baz</mark>",
    [["inserthorizontalrule",""]],
    "<mark>foo</mark><hr>{}<mark>baz</mark>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<nav>foo[bar]baz</nav>",
    [["inserthorizontalrule",""]],
    "<nav>foo<hr>{}baz</nav>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<ol><li>foo[bar]baz</li></ol>",
    [["inserthorizontalrule",""]],
    "<ol><li>foo<hr>{}baz</li></ol>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<pre>foo[bar]baz</pre>",
    [["inserthorizontalrule",""]],
    "<pre>foo</pre><hr>{}<pre>baz</pre>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<q>foo[bar]baz</q>",
    [["inserthorizontalrule",""]],
    "<q>foo</q><hr>{}<q>baz</q>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<ruby>foo[bar]baz<rt>quz</rt></ruby>",
    [["inserthorizontalrule",""]],
    "<ruby>foo</ruby><hr>{}<ruby>baz<rt>quz</rt></ruby>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<ruby>foo<rt>bar[baz]quz</rt></ruby>",
    [["inserthorizontalrule",""]],
    "<ruby>foo<rt>bar</rt></ruby><hr>{}<ruby><rt>quz</rt></ruby>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<ruby>foo<rp>bar[baz]quz</rp><rt>qoz</rt><rp>qiz</rp></ruby>",
    [["inserthorizontalrule",""]],
    "<ruby>foo<rp>bar</rp></ruby><hr>{}<ruby><rp>quz</rp><rt>qoz</rt><rp>qiz</rp></ruby>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<s>foo[bar]baz</s>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<s>foo</s><hr>{}<s>baz</s>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<s>foo[bar]baz</s>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<s>foo</s><hr>{}<s>baz</s>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<samp>foo[bar]baz</samp>",
    [["inserthorizontalrule",""]],
    "<samp>foo</samp><hr>{}<samp>baz</samp>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<section>foo[bar]baz</section>",
    [["inserthorizontalrule",""]],
    "<section>foo<hr>{}baz</section>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<small>foo[bar]baz</small>",
    [["inserthorizontalrule",""]],
    "<small>foo</small><hr>{}<small>baz</small>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<span>foo[bar]baz</span>",
    [["inserthorizontalrule",""]],
    "<span>foo</span><hr>{}<span>baz</span>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<strong>foo[bar]baz</strong>",
    [["inserthorizontalrule",""]],
    "<strong>foo</strong><hr>{}<strong>baz</strong>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<sub>foo[bar]baz</sub>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<sub>foo</sub><hr>{}<sub>baz</sub>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<sub>foo[bar]baz</sub>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<sub>foo</sub><hr>{}<sub>baz</sub>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<sup>foo[bar]baz</sup>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<sup>foo</sup><hr>{}<sup>baz</sup>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<sup>foo[bar]baz</sup>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<sup>foo</sup><hr>{}<sup>baz</sup>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<table><tr><td>foo[bar]baz</td></table>",
    [["inserthorizontalrule",""]],
    "<table><tbody><tr><td>foo<hr>{}baz</td></tr></tbody></table>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<table><tr><th>foo[bar]baz</th></table>",
    [["inserthorizontalrule",""]],
    "<table><tbody><tr><th>foo<hr>{}baz</th></tr></tbody></table>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<u>foo[bar]baz</u>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<u>foo</u><hr>{}<u>baz</u>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<u>foo[bar]baz</u>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<u>foo</u><hr>{}<u>baz</u>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<ul><li>foo[bar]baz</li></ul>",
    [["inserthorizontalrule",""]],
    "<ul><li>foo<hr>{}baz</li></ul>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<var>foo[bar]baz</var>",
    [["inserthorizontalrule",""]],
    "<var>foo</var><hr>{}<var>baz</var>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<acronym>foo[bar]baz</acronym>",
    [["inserthorizontalrule",""]],
    "<acronym>foo</acronym><hr>{}<acronym>baz</acronym>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<big>foo[bar]baz</big>",
    [["inserthorizontalrule",""]],
    "<big>foo</big><hr>{}<big>baz</big>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<blink>foo[bar]baz</blink>",
    [["inserthorizontalrule",""]],
    "<blink>foo</blink><hr>{}<blink>baz</blink>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<center>foo[bar]baz</center>",
    [["inserthorizontalrule",""]],
    "<center>foo<hr>{}baz</center>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<dir>foo[bar]baz</dir>",
    [["inserthorizontalrule",""]],
    "<dir>foo</dir><hr>{}<dir>baz</dir>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<dir><li>foo[bar]baz</li></dir>",
    [["inserthorizontalrule",""]],
    "<dir><li>foo<hr>{}baz</li></dir>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<font>foo[bar]baz</font>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<font>foo</font><hr>{}<font>baz</font>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<font>foo[bar]baz</font>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<font>foo</font><hr>{}<font>baz</font>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<listing>foo[bar]baz</listing>",
    [["inserthorizontalrule",""]],
    "<listing>foo</listing><hr>{}<listing>baz</listing>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<marquee>foo[bar]baz</marquee>",
    [["inserthorizontalrule",""]],
    "<marquee>foo</marquee><hr>{}<marquee>baz</marquee>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<nobr>foo[bar]baz</nobr>",
    [["inserthorizontalrule",""]],
    "<nobr>foo</nobr><hr>{}<nobr>baz</nobr>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<strike>foo[bar]baz</strike>",
    [["stylewithcss","true"],["inserthorizontalrule",""]],
    "<strike>foo</strike><hr>{}<strike>baz</strike>",
    [true,true],
    {"stylewithcss":[false,false,"",false,true,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<strike>foo[bar]baz</strike>",
    [["stylewithcss","false"],["inserthorizontalrule",""]],
    "<strike>foo</strike><hr>{}<strike>baz</strike>",
    [true,true],
    {"stylewithcss":[false,true,"",false,false,""],"inserthorizontalrule":[false,false,"",false,false,""]}],
["<tt>foo[bar]baz</tt>",
    [["inserthorizontalrule",""]],
    "<tt>foo</tt><hr>{}<tt>baz</tt>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<xmp>foo[bar]baz</xmp>",
    [["inserthorizontalrule",""]],
    "<xmp>foo</xmp><hr>{}<xmp>baz</xmp>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<quasit>foo[bar]baz</quasit>",
    [["inserthorizontalrule",""]],
    "<quasit>foo<hr>{}baz</quasit>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["<table><tr><td>fo[o<td>b]ar</table>",
    [["inserthorizontalrule",""]],
    "<table><tbody><tr><td>fo<hr>{}</td><td>ar</td></tr></tbody></table>",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}],
["fo[o<span contenteditable=false>bar</span>b]az",
    [["inserthorizontalrule",""]],
    "fo<hr>{}<span contenteditable=\"false\">bar</span>az",
    [true],
    {"inserthorizontalrule":[false,false,"",false,false,""]}]
]

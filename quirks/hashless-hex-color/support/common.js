setup({explicit_done:true});
onload = function() {
    setupIframe();

    var tests = [
    {input:"123", q:"#000123"},
    {input:"023", q:"#000023"},
    {input:"003", q:"#000003"},
    {input:"000", q:"#000"},
    {input:"abc", q:"#abc"},
    {input:"ABC", q:"#abc"},
    {input:"1ab", q:"#0001ab"},
    {input:"1AB", q:"#0001ab"},
    {input:"112233", q:"#123"},
    {input:"012233", q:"#012233"},
    {input:"002233", q:"#023"},
    {input:"000233", q:"#000233"},
    {input:"000033", q:"#003"},
    {input:"000003", q:"#000003"},
    {input:"000000", q:"#000000"},
    {input:"aabbcc", q:"#abc"},
    {input:"AABBCC", q:"#abc"},
    {input:"11aabb", q:"#1ab"},
    {input:"11AABB", q:"#1ab"},
    {input:"\\31 23", q:"#123"},
    {input:"\\61 bc", q:"#abc"},
    {input:"\\41 BC", q:"#abc"},
    {input:"\\31 ab", q:"#1ab"},
    {input:"\\31 AB", q:"#1ab"},
    {input:"\\31 12233", q:"#123"},
    {input:"\\61 abbcc", q:"#abc"},
    {input:"\\41 ABBCC", q:"#abc"},
    {input:"\\31 1aabb", q:"#1ab"},
    {input:"\\31 1AABB", q:"#1ab"},
    {input:"12\\33 ", q:"#000123"},
    {input:"1", q:"#000001"},
    {input:"12", q:"#000012"},
    {input:"1234", q:"#001234"},
    {input:"12345", q:"#012345"},
    {input:"1234567"},
    {input:"12345678"},
    {input:"a"},
    {input:"aa"},
    {input:"aaaa"},
    {input:"aaaaa"},
    {input:"aaaaaaa"},
    {input:"aaaaaaaa"},
    {input:"A"},
    {input:"AA"},
    {input:"AAAA"},
    {input:"AAAAA"},
    {input:"AAAAAAA"},
    {input:"AAAAAAAA"},
    {input:"1a", q:"#00001a"},
    {input:"1abc", q:"#001abc"},
    {input:"1abcd", q:"#01abcd"},
    {input:"1abcdef"},
    {input:"1abcdeff"},
    {input:"+1", q:"#000001"},
    {input:"+12", q:"#000012"},
    {input:"+123", q:"#000123"},
    {input:"+1234", q:"#001234"},
    {input:"+12345", q:"#012345"},
    {input:"+123456", q:"#123456"},
    {input:"+1234567"},
    {input:"+12345678"},
    {input:"-1"},
    {input:"-12"},
    {input:"-123"},
    {input:"-1234"},
    {input:"-12345"},
    {input:"-123456"},
    {input:"-1234567"},
    {input:"-12345678"},
    {input:"+1a", q:"#00001a"},
    {input:"+12a", q:"#00012a"},
    {input:"+123a", q:"#00123a"},
    {input:"+1234a", q:"#01234a"},
    {input:"+12345a", q:"#12345a"},
    {input:"+123456a"},
    {input:"+1234567a"},
    {input:"-1a"},
    {input:"-12a"},
    {input:"-123a"},
    {input:"-1234a"},
    {input:"-12345a"},
    {input:"-123456a"},
    {input:"-1234567a"},
    {input:"-12345678a"},
    {input:"+1A", q:"#00001a"},
    {input:"+12A", q:"#00012a"},
    {input:"+123A", q:"#00123a"},
    {input:"+1234A", q:"#01234a"},
    {input:"+12345A", q:"#12345a"},
    {input:"+123456A"},
    {input:"+1234567A"},
    {input:"-1A"},
    {input:"-12A"},
    {input:"-123A"},
    {input:"-1234A"},
    {input:"-12345A"},
    {input:"-123456A"},
    {input:"-1234567A"},
    {input:"-12345678A"},
    {input:"+a"},
    {input:"+aa"},
    {input:"+aaa"},
    {input:"+aaaa"},
    {input:"+aaaaa"},
    {input:"+aaaaaa"},
    {input:"+aaaaaaa"},
    {input:"+aaaaaaaa"},
    {input:"-a"},
    {input:"-aa"},
    {input:"-aaa"},
    {input:"-aaaa"},
    {input:"-aaaaa"},
    {input:"-aaaaaa"},
    {input:"-aaaaaaa"},
    {input:"-aaaaaaaa"},
    {input:"-aaaaaaaaa"},
    {input:"+A"},
    {input:"+AA"},
    {input:"+AAA"},
    {input:"+AAAA"},
    {input:"+AAAAA"},
    {input:"+AAAAAA"},
    {input:"+AAAAAAA"},
    {input:"+AAAAAAAA"},
    {input:"-A"},
    {input:"-AA"},
    {input:"-AAA"},
    {input:"-AAAA"},
    {input:"-AAAAA"},
    {input:"-AAAAAA"},
    {input:"-AAAAAAA"},
    {input:"-AAAAAAAA"},
    {input:"-AAAAAAAAA"},
    {input:"1.1"},
    {input:"1.11"},
    {input:"1.111"},
    {input:"1.1111"},
    {input:"1.11111"},
    {input:"1.111111"},
    {input:"1.1111111"},
    {input:"+1.1"},
    {input:"+1.11"},
    {input:"+1.111"},
    {input:"+1.1111"},
    {input:"+1.11111"},
    {input:"+1.111111"},
    {input:"+1.1111111"},
    {input:"-1.1"},
    {input:"-1.11"},
    {input:"-1.111"},
    {input:"-1.1111"},
    {input:"-1.11111"},
    {input:"-1.111111"},
    {input:"-1.1111111"},
    {input:"1.1a"},
    {input:"1.11a"},
    {input:"1.111a"},
    {input:"1.1111a"},
    {input:"1.11111a"},
    {input:"1.111111a"},
    {input:"+1.1a"},
    {input:"+1.11a"},
    {input:"+1.111a"},
    {input:"+1.1111a"},
    {input:"+1.11111a"},
    {input:"+1.111111a"},
    {input:"-1.1a"},
    {input:"-1.11a"},
    {input:"-1.111a"},
    {input:"-1.1111a"},
    {input:"-1.11111a"},
    {input:"-1.111111a"},
    {input:"1.0"},
    {input:"11.0"},
    {input:"111.0"},
    {input:"1111.0"},
    {input:"11111.0"},
    {input:"111111.0"},
    {input:"1111111.0"},
    {input:"11111111.0"},
    {input:"+1.0"},
    {input:"+11.0"},
    {input:"+111.0"},
    {input:"+1111.0"},
    {input:"+11111.0"},
    {input:"+111111.0"},
    {input:"+1111111.0"},
    {input:"+11111111.0"},
    {input:"-1.0"},
    {input:"-11.0"},
    {input:"-111.0"},
    {input:"-1111.0"},
    {input:"-11111.0"},
    {input:"-111111.0"},
    {input:"-1111111.0"},
    {input:"-11111111.0"},
    {input:"1.0a"},
    {input:"11.0a"},
    {input:"111.0a"},
    {input:"1111.0a"},
    {input:"11111.0a"},
    {input:"111111.0a"},
    {input:"1111111.0a"},
    {input:"+1.0a"},
    {input:"+11.0a"},
    {input:"+111.0a"},
    {input:"+1111.0a"},
    {input:"+11111.0a"},
    {input:"+111111.0a"},
    {input:"+1111111.0a"},
    {input:"-1.0a"},
    {input:"-11.0a"},
    {input:"-111.0a"},
    {input:"-1111.0a"},
    {input:"-11111.0a"},
    {input:"-111111.0a"},
    {input:"-1111111.0a"},
    {input:"+/**/123"},
    {input:"-/**/123"},
    {input:"+/**/123456"},
    {input:"-/**/123456"},
    {input:"+/**/abc"},
    {input:"-/**/abc"},
    {input:"+/**/abcdef"},
    {input:"-/**/abcdef"},
    {input:"+/**/12a"},
    {input:"-/**/12a"},
    {input:"+/**/12345a"},
    {input:"-/**/12345a"},
    {input:"abg"},
    {input:"aabbcg"},
    {input:"1ag"},
    {input:"1122ag"},
    {input:"ABG"},
    {input:"AABBCG"},
    {input:"1AG"},
    {input:"1122AG"},
    {input:"@a"},
    {input:"@ab"},
    {input:"@abc"},
    {input:"@abcd"},
    {input:"@abcde"},
    {input:"@abcdef"},
    {input:"@1"},
    {input:"@11"},
    {input:"@111"},
    {input:"@1111"},
    {input:"@11111"},
    {input:"@111111"},
    {input:"@1a"},
    {input:"@11a"},
    {input:"@111a"},
    {input:"@1111a"},
    {input:"@11111a"},
    {input:'"a"'},
    {input:'"ab"'},
    {input:'"abc"'},
    {input:'"abcd"'},
    {input:'"abcde"'},
    {input:'"abcdef"'},
    {input:'"1"'},
    {input:'"11"'},
    {input:'"111"'},
    {input:'"1111"'},
    {input:'"11111"'},
    {input:'"111111"'},
    {input:'"1a"'},
    {input:'"11a"'},
    {input:'"111a"'},
    {input:'"1111a"'},
    {input:'"11111a"'},
    {input:"url(a)", svg:'url(a)'},
    {input:"url(aa)", svg:'url(aa)'},
    {input:"url(aaa)", svg:'url(aaa)'},
    {input:"url(aaaa)", svg:'url(aaaa)'},
    {input:"url(aaaaa)", svg:'url(aaaaa)'},
    {input:"url(aaaaaa)", svg:'url(aaaaaa)'},
    {input:"url('a')", svg:'url(a)'},
    {input:"url('aa')", svg:'url(aa)'},
    {input:"url('aaa')", svg:'url(aaa)'},
    {input:"url('aaaa')", svg:'url(aaaa)'},
    {input:"url('aaaaa')", svg:'url(aaaaa)'},
    {input:"url('aaaaaa')", svg:'url(aaaaaa)'},
    {input:"#a"},
    {input:"#aa"},
    {input:"#aaaaa"},
    {input:"#aaaaaaa"},
    {input:"#1"},
    {input:"#11"},
    {input:"#11111"},
    {input:"#1111111"},
    {input:"#1a"},
    {input:"#1111a"},
    {input:"#111111a"},
    {input:"1%"},
    {input:"11%"},
    {input:"111%"},
    {input:"1111%"},
    {input:"11111%"},
    {input:"111111%"},
    {input:"calc(123)"},
    {input:"rgb(119, 255, 255)", q:"#7ff", s:"#7ff", svg:"#7ff"},
    {input:"rgba(119, 255, 255, 001)", q:"#7ff", s:"#7ff", svg:"#7ff"},
    {input:"hsl(100, 100%, 100%)", q:"#fff", s:"#fff", svg:"#fff"},
    {input:"hsla(100, 100%, 100%, 001)", q:"#fff", s:"#fff", svg:"#fff"},
    {input:"rgb(calc(100 + 155), 255, 255)", q:"#fff", s:"#fff", svg:"#fff"},
    {input:"rgba(calc(100 + 155), 255, 255, 001)", q:"#fff", s:"#fff", svg:"#fff"},
    {input:"hsl(calc(050 + 050), 100%, 100%)", q:"#fff", s:"#fff", svg:"#fff"},
    {input:"hsla(calc(050 + 050), 100%, 100%, 001)", q:"#fff", s:"#fff", svg:"#fff"},
    {input:"rgb(/**/255, 255, 255)", q:"#fff", s:"#fff", svg:"#fff"},
    {input:"rgb(/**/255/**/, /**/255/**/, /**/255/**/)", q:"#fff", s:"#fff", svg:"#fff"},
    {input:"rgb(calc(/**/100/**/ + /**/155/**/), 255, 255)", q:"#fff", s:"#fff", svg:"#fff"},
    {input:"#123 123 abc 12a", q:"#123 #000123 #abc #00012a", shorthand:true},
    {input:"rgb(119, 255, 255) 123", q:"#7ff #000123", shorthand:true},
    {input:"123 rgb(119, 255, 255)", q:"#000123 #7ff", shorthand:true},
    {input:"1e1"},
    {input:"11e1"},
    {input:"111e1"},
    {input:"1111e1"},
    {input:"11111e1"},
    {input:"111111e1"},
    {input:"1e+1"},
    {input:"11e+1"},
    {input:"111e+1"},
    {input:"1111e+1"},
    {input:"11111e+1"},
    {input:"111111e+1"},
    {input:"1e-0"},
    {input:"11e-0"},
    {input:"111e-0"},
    {input:"1111e-0"},
    {input:"11111e-0"},
    {input:"111111e-0"},
    {input:"1e1a"},
    {input:"11e1a"},
    {input:"111e1a"},
    {input:"1111e1a"},
    {input:"11111e1a"},
    {input:"111111e1a"},
    {desc:"1111111111...", input:"1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"},
    {desc:"1111111111...a", input:"1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111a"},
    {desc:"a1111111111...", input:"a1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"},
    ];

    var props = [
    {prop:'background-color', check:'background-color'},
    {prop:'border-color', check:'border-top-color', check_also:['border-right-color', 'border-bottom-color', 'border-left-color']},
    {prop:'border-top-color', check:'border-top-color'},
    {prop:'border-right-color', check:'border-right-color'},
    {prop:'border-bottom-color', check:'border-bottom-color'},
    {prop:'border-left-color', check:'border-left-color'},
    {prop:'color', check:'color'},
    ];
    var style_template = '#test{{prop}:{test};}' +
                         '#ref{{prop}:{ref};}';

    tests.forEach(function(t) {
        var name = t.desc || t.input;
        var test_html = async_test(name);
        var test_svg = async_test(name + ' (SVG)');
        for (var i in props) {
            if (t.shorthand && !(props[i].check_also)) {
                continue;
            }
            test_html.step(function() {
                win.style.textContent = style_template.replace('{test}', t.input)
                            .replace('{ref}', quirks ? t.q : t.s).replace(/\{prop\}/g, props[i].prop);
                assert_equals(win.getComputedStyle(win.test).getPropertyValue(props[i].check),
                              win.getComputedStyle(win.ref).getPropertyValue(props[i].check),
                              props[i].prop);
                if (t.shorthand && props[i].check_also) {
                    for (var j in props[i].check_also) {
                        assert_equals(win.getComputedStyle(win.test).getPropertyValue(props[i].check_also[j]),
                                      win.getComputedStyle(win.ref).getPropertyValue(props[i].check_also[j]),
                                      props[i].prop + ' checking ' + props[i].check_also[j]);
                    }
                }
            });
            test_svg.step(function() {
                win.svg.setAttribute('fill', t.input);
                if (t.svg) {
                    win.svg_ref.setAttribute('fill', t.svg);
                } else {
                    win.svg_ref.removeAttribute('fill');
                }
                assert_equals(win.getComputedStyle(win.svg).fill, win.getComputedStyle(win.svg_ref).fill, 'SVG fill=""');
            });
        }
        test_html.done();
        test_svg.done();
    });

    if (quirks) {
        var other_tests = [
        {input:'background:abc', prop:'background-color'},
        {input:'border-top:1px solid abc', prop:'border-top-color'},
        {input:'border-right:1px solid abc', prop:'border-right-color'},
        {input:'border-bottom:1px solid abc', prop:'border-bottom-color'},
        {input:'border-left:1px solid abc', prop:'border-left-color'},
        {input:'border:1px solid abc', prop:'border-top-color'},
        {input:'outline-color:abc', prop:'outline-color'},
        {input:'outline:1px solid abc', prop:'outline-color'}
        ];

        var other_template = "#test{{test};}"

        other_tests.forEach(function(t) {
            test(function() {
                win.style.textContent = other_template.replace('{test}', t.input);
                assert_equals(win.getComputedStyle(win.test).getPropertyValue(t.prop),
                              win.getComputedStyle(win.ref).getPropertyValue(t.prop),
                              'quirk was supported');
            }, document.title+', excluded property '+t.input);
        });
    }

    done();
}

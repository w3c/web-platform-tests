// Script tests
new SRIScriptTest(
    true,
    "Same-origin with correct sha256 hash.",
    "matching-digest.js",
    "sha256-U9WYDtBWkcHx13+9UKk/3Q5eoqDc4YGxYb07EPWzb9E="
).execute();

new SRIScriptTest(
    true,
    "Same-origin with correct sha384 hash.",
    "matching-digest.js",
    "sha384-BDRTPSywZFyxfLEAzaLcL4FfERBgJgXfEkuT0r04LG93Yqn1PWNYPZMomaqEfE3H"
).execute();

new SRIScriptTest(
    true,
    "Same-origin with correct sha512 hash.",
    "matching-digest.js",
    "sha512-geByvIIRspbnUnwooKGNNCb39nvg+EW0O9hDScTXeo/9pVZztLSUYU3LNV6H0lZapo8bCJUpyPPLAzE9fDzpxg=="
).execute();

new SRIScriptTest(
    true,
    "Smame-origin with empty integrity.",
    "matching-digest.js",
    ""
).execute();

new SRIScriptTest(
    false,
    "Same-origin with incorrect hash.",
    "non-matching-digest.js",
    "sha256-deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdead"
).execute();

new SRIScriptTest(
    true,
    "Same-origin with multiple sha256 hashes, including correct.",
    "matching-digest.js",
    "sha256-U9WYDtBWkcHx13+9UKk/3Q5eoqDc4YGxYb07EPWzb9E= sha256-deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdead"
).execute();

new SRIScriptTest(
    true,
    "Same-origin with multiple sha256 hashes, including unknown algorithm.",
    "matching-digest.js",
    "sha256-U9WYDtBWkcHx13+9UKk/3Q5eoqDc4YGxYb07EPWzb9E= foo666-deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdead"
).execute();

new SRIScriptTest(
    true,
    "Same-origin with sha256 mismatch, sha512 match",
    "matching-digest.js",
    "sha512-geByvIIRspbnUnwooKGNNCb39nvg+EW0O9hDScTXeo/9pVZztLSUYU3LNV6H0lZapo8bCJUpyPPLAzE9fDzpxg== sha256-deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdead"
).execute();

new SRIScriptTest(
    false,
    "Same-origin with sha256 match, sha512 mismatch",
    "matching-digest.js",
    "sha512-deadbeefspbnUnwooKGNNCb39nvg+EW0O9hDScTXeo/9pVZztLSUYU3LNV6H0lZapo8bCJUpyPPLAzE9fDzpxg== sha256-U9WYDtBWkcHx13+9UKk/3Q5eoqDc4YGxYb07EPWzb9E="
).execute();

new SRIScriptTest(
    true,
    "<crossorigin='anonymous'> with correct hash, ACAO: *",
    xorigin_anon_script,
    "sha256-51AjITq701Y0yKSx3/UoIKtIY2UQ9+H8WGyyMuOWOC0=",
    "anonymous"
).execute();

new SRIScriptTest(
    false,
    "<crossorigin='anonymous'> with incorrect hash, ACAO: *",
    xorigin_anon_script,
    "sha256-deadbeefcSLlbFZCj1OACLxTxVck2TOrBTEdUbwz1yU=",
    "anonymous"
).execute();

new SRIScriptTest(
    true,
    "<crossorigin='use-credentials'> with correct hash, CORS-eligible",
    xorigin_creds_script,
    "sha256-IaGApVboXPQxVSm2wVFmhMq1Yu37gWklajgMdxKLIvc=",
    "use-credentials"
).execute();

new SRIScriptTest(
    false,
    "<crossorigin='use-credentials'> with incorrect hash CORS-eligible",
    xorigin_creds_script,
    "sha256-deadbeef2S+pTRZgiw3DWrhC6JLDlt2zRyGpwH7unU8=",
    "use-credentials"
).execute();

new SRIScriptTest(
    false,
    "<crossorigin='anonymous'> with CORS-ineligible resource",
    xorigin_ineligible_script,
    "sha256-F5fXKTX7SiWjtgybxiBZIo2qhh2WiQnNx372E60XrOo=",
    "anonymous"
).execute();

new SRIScriptTest(
    true,
    "Cross-origin, not CORS request, with correct hash",
    xorigin_anon_script,
    "sha256-51AjITq701Y0yKSx3/UoIKtIY2UQ9+H8WGyyMuOWOC0="
).execute();

new SRIScriptTest(
    true,
    "Cross-origin, not CORS request, with hash masmatch",
    xorigin_anon_script,
    "sha256-deadbeef01Y0yKSx3/UoIKtIY2UQ9+H8WGyyMuOWOC0="
).execute();

new SRIScriptTest(
    true,
    "Cross-origin, empty integrity",
    xorigin_anon_script,
    ""
).execute();

new SRIScriptTest(
    true,
    "Same-origin with correct hash, options.",
    "matching-digest.js",
    "sha256-U9WYDtBWkcHx13+9UKk/3Q5eoqDc4YGxYb07EPWzb9E=?foo=bar?spam=eggs"
).execute();

new SRIScriptTest(
    true,
    "Same-origin with unknown algorithm only.",
    "matching-digest.js",
    "foo666-U9WYDtBWkcHx13+9UKk/3Q5eoqDc4YGxYb07EPWzb9E="
).execute();

new SRIScriptTest(
    true,
    "Service worker test",
    "service-worker-check.js",
    "sha256-SckwZq5oTi6qwFRXM3aLVETG8POSa5dslJkYD0HYzFA=",
    undefined,
    function () {
      var test = async_test('Service worker verification');
      test.step(function() {
        assert_true(serviceWorkerResult, "Service resolved correctly");
      });
      test.done();
    }
).execute();

new SRIScriptTest(
    false,
    "Service worker test with invalid hash",
    "service-worker-check.js",
    "sha256-invalidSckwZq5oTi6qwFRXM3aLVETG8POSa5dslJkYD0HYzFA="
).execute();

// Style tests
new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with correct sha256 hash",
    {
        href: "style.css",
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F-SPLT7YZk7gyCWUV4="
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with correct sha384 hash",
    {
        href: "style.css",
        integrity: "sha384-wDAWxH4tOWBwAwHfBn9B7XuNmFxHTMeigAMwn0iVQ0zq3FtmYMLxihcGnU64CwcX"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with correct sha512 hash",
    {
        href: "style.css",
        integrity: "sha512-9wXDjd6Wq3H6nPAhI9zOvG7mJkUr03MTxaO+8ztTKnfJif42laL93Be/IF6YYZHHF4esitVYxiwpY2HSZX4l6w=="
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with empty integrity",
    {
        href: "style.css",
        integrity: ""
    }
);

new SRIStyleTest(
    style_tests,
    false,
    "Same-origin with incorrect hash.",
    {
        href: "style.css",
        integrity: "sha256-deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdead"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with multiple sha256 hashes, including correct.",
    {
        href: "style.css",
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F-SPLT7YZk7gyCWUV4= sha256-deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdead"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with multiple sha256 hashes, including unknown algorithm.",
    {
        href: "style.css",
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F-SPLT7YZk7gyCWUV4= foo666-deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdead"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with sha256 mismatch, sha512 match",
    {
        href: "style.css",
        integrity: "sha512-9wXDjd6Wq3H6nPAhI9zOvG7mJkUr03MTxaO+8ztTKnfJif42laL93Be/IF6YYZHHF4esitVYxiwpY2HSZX4l6w== sha256-deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdead"
    }
);

new SRIStyleTest(
    style_tests,
    false,
    "Same-origin with sha256 match, sha512 mismatch",
    {
        href: "style.css",
        integrity: "sha512-deadbeef9wXDjd6Wq3H6nPAhI9zOvG7mJkUr03MTxaO+8ztTKnfJif42laL93Be/IF6YYZHHF4esitVYxiwpY2== sha256-CzHgdJ7wOccM8L89n4bhcJMz3F-SPLT7YZk7gyCWUV4="
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "<crossorigin='anonymous'> with correct hash, ACAO: *",
    {
        href: xorigin_anon_style,
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F+SPLT7YZk7gyCWUV4=",
        crossorigin: "anonymous"
    }
);

new SRIStyleTest(
    style_tests,
    false,
    "<crossorigin='anonymous'> with incorrect hash, ACAO: *",
    {
        href: xorigin_anon_style,
        integrity: "sha256-deadbeefCzHgdJ7wOccM8L89n4bhcJMz3F+SPLT7YZk=",
        crossorigin: "anonymous"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "<crossorigin='use-credentials'> with correct hash, CORS-eligible",
    {
        href: xorigin_creds_style,
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F+SPLT7YZk7gyCWUV4=",
        crossorigin: "use-credentials"
    }
);

new SRIStyleTest(
    style_tests,
    false,
    "<crossorigin='use-credentials'> with incorrect hash CORS-eligible",
    {
        href: xorigin_creds_style,
        integrity: "sha256-deadbeefCzHgdJ7wOccM8L89n4bhcJMz3F+SPLT7YZk=",
        crossorigin: "use-credentials"
    }
);

new SRIStyleTest(
    style_tests,
    false,
    "<crossorigin='anonymous'> with CORS-ineligible resource",
    {
        href: xorigin_ineligible_style,
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F+SPLT7YZk7gyCWUV4=",
        crossorigin: "anonymous"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Cross-origin, not CORS request, with correct hash",
    {
        href: xorigin_anon_style,
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F+SPLT7YZk7gyCWUV4="
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Cross-origin, not CORS request, with hash masmatch",
    {
        href: xorigin_anon_style,
        integrity: "sha256-deadbeefCzHgdJ7wOccM8L89n4bhcJMz3F+SPLT7YZk="
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Cross-origin, empty integrity",
    {
        href: xorigin_anon_style,
        integrity: ""
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with correct hash, options.",
    {
        href: "style.css",
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F+SPLT7YZk7gyCWUV4=?foo=bar?spam=eggs"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with unknown algorithm only.",
    {
        href: "style.css",
        integrity: "foo666-CzHgdJ7wOccM8L89n4bhcJMz3F+SPLT7YZk7gyCWUV4=?foo=bar?spam=eggs"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with correct sha256 hash, rel='stylesheet license'",
    {
        href: "style.css",
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F-SPLT7YZk7gyCWUV4=",
        rel: "stylesheet license"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with correct sha256 hash, rel='license stylesheet'",
    {
        href: "style.css",
        integrity: "sha256-CzHgdJ7wOccM8L89n4bhcJMz3F-SPLT7YZk7gyCWUV4=",
        rel: "license stylesheet"
    }
);

new SRIStyleTest(
    style_tests,
    true,
    "Same-origin with correct sha256 and sha512 hash, rel='alternate stylesheet' enabled",
    {
        href: "alternate.css",
        title: "alt",
        type: "text/css",
        class: "alternate",
        disabled: "disabled",
        rel: "alternate stylesheet",
        integrity: "sha256-phbz83bWhnLig+d2VPKrRrTRyhqoDRo1ruGqZLZ0= sha512-8OYEB7ktnzcb6h+kB9CUIuc8qvKIyLpygRJdQSEEycRy74dUsB+Yu9rSjpOPjRUblle8WWX9Gn7v39LK2Oceig==",
    },
    function (link, container) {
        var alternate = document.querySelector('link.alternate');
        alternate.disabled = false;
    },
    "rgb(255, 0, 0)"
);

new SRIStyleTest(
    style_tests,
    false,
    "Same-origin with incorrect sha256 and sha512 hash, rel='alternate stylesheet' enabled",
    {
        href: "alternate.css",
        title: "alt",
        type: "text/css",
        class: "alternate",
        disabled: "disabled",
        rel: "alternate stylesheet",
        integrity: "sha256-fail83bWhnLig+d2VPKrRrTRyhqoDRo1ruGqZLZ0= sha512-failB7ktnzcb6h+kB9CUIuc8qvKIyLpygRJdQSEEycRy74dUsB+Yu9rSjpOPjRUblle8WWX9Gn7v39LK2Oceig==",
    },
    function (link, container) {
        var alternate = document.querySelector('link.alternate');
        alternate.disabled = false;
    }
);

style_tests.execute();


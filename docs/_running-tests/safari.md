---
layout: page
title: Safari
---
To run Safari on macOS, some manual setup is required:

  * Disable "Block pop-up windows" in the security preferences.

  * Ensure that "Allow Remote Automation" is enabled in the "Develop" menu.

  * Import the web-platform.test certificate and root certificate authority in
    `tools/certs/` into the keychain of the user that will run the tests, and
    manually mark the root as trusted.

  * Set `OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES` in your environment. This is a
    workaround for https://github.com/w3c/web-platform-tests/issues/9007.

Now, run the tests with `./wpt run safari`.

This will use the `safaridriver` found on the path, which will be stable Safari.
To run Safari Technology Preview instead, use the
`--webdriver-binary "/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver"`
command line argument.

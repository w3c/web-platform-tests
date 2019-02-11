#!/bin/bash
set -ex

SCRIPT_DIR=$(cd $(dirname "$0") && pwd -P)
WPT_ROOT=$SCRIPT_DIR/../..
cd $WPT_ROOT

main() {
    # Diff PNGs based on pixel-for-pixel identity
    echo -e '[diff "img"]\n  textconv = identify -quiet -format "%#"' >> .git/config
    echo -e '*.png diff=img' >> .git/info/attributes

    # Exclude tests that rely on font rendering
    excluded=(
        '2dcontext/drawing-text-to-the-canvas/2d.text.draw.fill.basic.png'
        '2dcontext/drawing-text-to-the-canvas/2d.text.draw.fill.maxWidth.large.png'
        '2dcontext/drawing-text-to-the-canvas/2d.text.draw.fill.rtl.png'
        '2dcontext/drawing-text-to-the-canvas/2d.text.draw.stroke.basic.png'
        'offscreen-canvas/text/2d.text.draw.fill.basic.png'
        'offscreen-canvas/text/2d.text.draw.fill.maxWidth.large.png'
        'offscreen-canvas/text/2d.text.draw.fill.rtl.png'
        'offscreen-canvas/text/2d.text.draw.stroke.basic.png'
    )

    ./update-built-tests.sh
    git update-index --assume-unchanged ${excluded[*]}
    git diff --exit-code
}

main

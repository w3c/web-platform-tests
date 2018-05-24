#!/bin/bash
set -ex

REMOTE=${1:-https://github.com/w3c/web-platform-tests}
BRANCH=${2:-master}
REV=${3:-FETCH_HEAD}
BROWSER=${4:-all}

cd ~

# Initially we just fetch 50 commits in order to save several minutes of fetching
git clone ${REMOTE} --single-branch --branch ${BRANCH} --no-checkout -q --depth=50 web-platform-tests
cd web-platform-tests
if [[ ! `git rev-parse --verify -q ${REV}` ]];
then
    # But if for some reason the commit under test isn't in that range, we give in and
    # fetch everything
    git fetch -q --unshallow ${REMOTE}
    git rev-parse --verify ${REV}
fi
git checkout -b build ${REV}

sudo sh -c './wpt make-hosts-file >> /etc/hosts'

if [[ $BROWSER == "chrome"* ]] || [[ "$BROWSER" == all ]]
then
    # Install Chrome dev
    deb_archive=google-chrome-unstable_current_amd64.deb
    wget https://dl.google.com/linux/direct/$deb_archive

    sudo apt-get -qqy update && gdebi -n $deb_archive
fi

sudo Xvfb $DISPLAY -screen 0 ${SCREEN_WIDTH}x${SCREEN_HEIGHT}x${SCREEN_DEPTH} &

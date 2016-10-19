function runTest(config,qualifier) {

    // config.initData contains a list of keys. We expect those to be needed in order and get
    // one waitingforkey event for each one.

    var testname = testnamePrefix(qualifier, config.keysystem)
                                    + ', successful playback, temporary, '
                                    + /video\/([^;]*)/.exec(config.videoType)[1]
                                    + ', multiple keys, sequential'
                                    + (config.checkReadyState ? ', readyState' : '');

    var configuration = {   initDataTypes: [config.initDataType],
                            audioCapabilities: [{contentType: config.audioType}],
                            videoCapabilities: [{contentType: config.videoType}],
                            sessionTypes: ['temporary'] };

    async_test(function(test) {
        var _video = config.video,
            _mediaKeys,
            _mediaKeySessions = [],
            _mediaSource,
            _waitingForKey = false,
            _playingCount = 0,
            _canplayCount = 0;

        function startNewSession() {
            assert_less_than(_mediaKeySessions.length, config.initData.length);
            var mediaKeySession = _mediaKeys.createSession('temporary');
            waitForEventAndRunStep('message', mediaKeySession, onMessage, test);
            _mediaKeySessions.push(mediaKeySession);
            mediaKeySession.variantId = config.variantIds ? config.variantIds[_mediaKeySessions.length - 1] : undefined;
            mediaKeySession.generateRequest(config.initDataType, config.initData[_mediaKeySessions.length - 1]).catch(onFailure);
        }

        function onFailure(error) {
            forceTestFailureFromPromise(test, error);
        }

        function onMessage(event) {
            var firstMessage = !_video.src;
            config.messagehandler(event.messageType, event.message, {variantId: event.target.variantId}).then(function(response) {
                return event.target.update(response);
            }).then(function(){
                if (firstMessage) {
                    _video.src = URL.createObjectURL(_mediaSource);
                    return _mediaSource.done;
                } else if (event.target.keyStatuses.size > 0){
                    _waitingForKey = false;
                    return Promise.resolve();
                }
            }).then(function(){
                if (firstMessage) {
                    _video.play();
                }
            }).catch(onFailure);
        }

        function onWaitingForKey(event) {
            _waitingForKey = true;
            if (config.checkReadyState) {
                assert_equals(_video.readyState, _video.HAVE_METADATA, "Video readyState should be HAVE_METADATA on watingforkey event");
            }
            startNewSession();
        }

        function onPlaying(event) {
            _playingCount++;
            assert_equals(_mediaKeySessions.length, _playingCount, "Should get one 'playing' event per key / session played");
            assert_less_than_equal(_playingCount, 2, "Should not get more than two 'playing' events.");
        }

        function onCanPlay(event) {
            _canplayCount++;
            assert_equals(_mediaKeySessions.length, _canplayCount, "Should get one 'canplay' event per key / session played");
            assert_less_than_equal(_canplayCount, 2, "Should not get more than two 'canplay' events.");
        }

        function onTimeupdate(event) {
            assert_true(!_waitingForKey || _video.readyState == _video.HAVE_METADATA, "Should not continue playing whilst waiting for a key");

            if (_video.currentTime > config.duration) {
                assert_equals(_mediaKeySessions.length, config.initData.length, "It should require all keys to reach end of content");
                _video.pause();
                test.done();
            }
        }

        navigator.requestMediaKeySystemAccess(config.keysystem, [configuration]).then(function(access) {
            return access.createMediaKeys();
        }).then(function(mediaKeys) {
            _mediaKeys = mediaKeys;
            return _video.setMediaKeys(_mediaKeys);
        }).then(function(){
            // Not using waitForEventAndRunStep() to avoid too many
            // EVENT(onTimeUpdate) logs.
            _video.addEventListener('timeupdate', test.step_func(onTimeupdate), true);

            waitForEventAndRunStep('waitingforkey', _video, onWaitingForKey, test);
            waitForEventAndRunStep('playing', _video, onPlaying, test);
            waitForEventAndRunStep('canplay', _video, onCanPlay, test);

            return testmediasource(config);
        }).then(function(source) {
            _mediaSource = source;
            startNewSession();
        }).catch(onFailure);
    }, testname);
}

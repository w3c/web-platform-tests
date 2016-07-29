function runTest(config)
{
    async_test(function(test)
    {
        var initDataType;
        var initData;
        var invalidLicense = new Uint8Array(
            [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77] );

        function handleMessage(event) {
            event.target.update(invalidLicense).then(function(event) {
                assert_unreached('Error: update() succeeded unexpectedly.');
                test.done();
            }).catch(function(error) {
                assert_equals(error.name, 'InvalidAccessError');
                test.done();
            });
        }

        navigator.requestMediaKeySystemAccess(config.keysystem, getSimpleConfiguration()).then(function(access) {
            initDataType = access.getConfiguration().initDataTypes[0];
            initData = getInitData(initDataType);
            return access.createMediaKeys();
        }).then(function(mediaKeys) {
            var keySession = mediaKeys.createSession();
            keySession.addEventListener('message', handleMessage, false);
            keySession.generateRequest(initDataType, initData);
        }).catch(function(error) {
            forceTestFailureFromPromise(test, error);
        });
    }, config.keysystem + ': invalid license.');
}
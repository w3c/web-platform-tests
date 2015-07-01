iframe = document.createElement("IFRAME");
iframe.src = "about:blank";
document.body.appendChild(iframe);
iframe.contentWindow.document.body.innerText = "Nothing to see here.";

storageEventList = new Array();
iframe.contentWindow.addEventListener("storage", function(e) {
    window.parent.storageEventList.push(e);
});

function runAfterNStorageEvents(callback, expectedNumEvents)
{
    countStorageEvents(callback, expectedNumEvents, 0)
}

function countStorageEvents(callback, expectedNumEvents, times)
{
    function onTimeout()
    {
        var currentCount = storageEventList.length;
        if (currentCount == expectedNumEvents) {
            callback();
        } else if (currentCount > expectedNumEvents) {
            msg = "got at least " + currentCount + ", expected only " + expectedNumEvents + " events";
            callback(msg);
        } else if (times > 50) {
            msg = "Timeout: only got " + currentCount + ", expected " + expectedNumEvents + " events";
            callback(msg);
        } else {
            countStorageEvents(callback, expectedNumEvents, times+1);
        }
    }
    setTimeout(onTimeout, 20);
}

function testStorages(testCallback)
{
    testCallback("sessionStorage");
    var hit = false;
    add_result_callback(function() {
        if (!hit) {
            hit = true;
            testCallback("localStorage");
        }
    });
}

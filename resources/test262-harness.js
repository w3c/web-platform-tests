// Based on Test262-Web-Runner. See https://github.com/bakkot/test262-web-runner/main.js.
function installAPI(global) {
    global.$262 = {
        createRealm: function() {
            var iframe = global.document.createElement('iframe');
            iframe.style.cssText = "display: none";
            iframe.src = ""; // iframeSrc;
            global.document.body.appendChild(iframe);
            return installAPI(iframe.contentWindow);
        },
        evalScript: function(src) {
            var script = global.document.createElement('script');
            script.text = src;
            global.document.body.appendChild(script);
        },
        detachArrayBuffer: function(buffer) {
            if (typeof postMessage !== 'function') {
                throw new Error('No method available to detach an ArrayBuffer');
            } else {
                postMessage(null, '*', [buffer]);
                /*
                  See https://html.spec.whatwg.org/multipage/comms.html#dom-window-postmessage
                  which calls https://html.spec.whatwg.org/multipage/infrastructure.html#structuredclonewithtransfer
                  which calls https://html.spec.whatwg.org/multipage/infrastructure.html#transfer-abstract-op
                  which calls the DetachArrayBuffer abstract operation https://tc39.github.io/ecma262/#sec-detacharraybuffer
                */
            }
        },
        global: global
    };
    return global.$262;
}

function installAPIWorker(global) {
    global.$262 = {
        createRealm: function() {
            throw new Error('createRealm is not supported in a Worker context');
        },
        evalScript: function(src) {
            throw new Error('evalScript is not supported in a Worker context');
        },
        detachArrayBuffer: function(buffer) {
            throw new Error('detachArrayBuffer is not supported in a Worker context');
        },
        global: global
    }
    return global.$262;
}

function $DONE(err) {
    if (err) {
        throw err;
    }
}

if (this.document) {
    // TODO: Any Worker test that depends on these functions will fail. Define API for Workers.
    installAPI(window);
} else {
    installAPIWorker(self);
}

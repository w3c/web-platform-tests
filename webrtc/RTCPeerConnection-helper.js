'use strict'

/*
 *  Helper Methods for testing the following methods in RTCPeerConnection:
 *    createOffer
 *    createAnswer
 *    setLocalDescription
 *    setRemoteDescription
 *
 *  This file offers the following features:
 *    SDP similarity comparison
 *    Generating offer/answer using anonymous peer connection
 *    Test signalingstatechange event
 *    Test promise that never resolve
 */

const audioLineRegex = /\r\nm=audio.+\r\n/g;
const videoLineRegex = /\r\nm=video.+\r\n/g;
const applicationLineRegex = /\r\nm=application.+\r\n/g;

function countLine(sdp, regex) {
  const matches = sdp.match(regex);
  if(matches === null) {
    return 0;
  } else {
    return matches.length;
  }
}

function countAudioLine(sdp) {
  return countLine(sdp, audioLineRegex);
}

function countVideoLine(sdp) {
  return countLine(sdp, videoLineRegex);
}

function countApplicationLine(sdp) {
  return countLine(sdp, applicationLineRegex);
}

function similarMediaDescriptions(sdp1, sdp2) {
  if(sdp1 === sdp2) {
    return true;
  } else if(
    countAudioLine(sdp1) !== countAudioLine(sdp2) ||
    countVideoLine(sdp1) !== countVideoLine(sdp2) ||
    countApplicationLine(sdp1) !== countApplicationLine(sdp2))
  {
    return false;
  } else {
    return true;
  }
}

// Assert that given object is either an
// RTCSessionDescription or RTCSessionDescriptionInit
function assert_is_session_description(sessionDesc) {
  if(sessionDesc instanceof RTCSessionDescription) {
    return;
  }

  assert_not_equals(sessionDesc, undefined,
    'Expect session description to be defined');

  assert_true(typeof(sessionDesc) === 'object',
    'Expect sessionDescription to be either a RTCSessionDescription or an object');

  assert_true(typeof(sessionDesc.type) === 'string',
    'Expect sessionDescription.type to be a string');

  assert_true(typeof(sessionDesc.sdp) === 'string',
    'Expect sessionDescription.sdp to be a string');
}


// We can't do string comparison to the SDP content,
// because RTCPeerConnection may return SDP that is
// slightly modified or reordered from what is given
// to it due to ICE candidate events or serialization.
// Instead, we create SDP with different number of media
// lines, and if the SDP strings are not the same, we
// simply count the media description lines and if they
// are the same, we assume it is the same.
function isSimilarSessionDescription(sessionDesc1, sessionDesc2) {
  assert_is_session_description(sessionDesc1);
  assert_is_session_description(sessionDesc2);

  if(sessionDesc1.type !== sessionDesc2.type) {
    return false;
  } else {
    return similarMediaDescriptions(sessionDesc1.sdp, sessionDesc2.sdp);
  }
}

function assert_session_desc_equals(sessionDesc1, sessionDesc2) {
  assert_true(isSimilarSessionDescription(sessionDesc1, sessionDesc2),
    'Expect both session descriptions to have the same count of media lines');
}

function assert_session_desc_not_equals(sessionDesc1, sessionDesc2) {
  assert_false(isSimilarSessionDescription(sessionDesc1, sessionDesc2),
    'Expect both session descriptions to have different count of media lines');
}

// Helper function to generate offer using a freshly created RTCPeerConnection
// object with any audio, video, data media lines present
function generateOffer(options={}) {
  const {
    audio = false,
    video = false,
    data = false,
    pc,
  } = options;

  if (data) {
    pc.createDataChannel('test');
  }

  const setup = {};

  if (audio) {
    setup.offerToReceiveAudio = true;
  }

  if (video) {
    setup.offerToReceiveVideo = true;
  }

  return pc.createOffer(setup).then(offer => {
    // Guard here to ensure that the generated offer really
    // contain the number of media lines we want
    const { sdp } = offer;

    if(audio) {
      assert_equals(countAudioLine(sdp), 1,
        'Expect m=audio line to be present in generated SDP');
    } else {
      assert_equals(countAudioLine(sdp), 0,
        'Expect m=audio line to be present in generated SDP');
    }

    if(video) {
      assert_equals(countVideoLine(sdp), 1,
        'Expect m=video line to be present in generated SDP');
    } else {
      assert_equals(countVideoLine(sdp), 0,
        'Expect m=video line to not present in generated SDP');
    }

    if(data) {
      assert_equals(countApplicationLine(sdp), 1,
        'Expect m=application line to be present in generated SDP');
    } else {
      assert_equals(countApplicationLine(sdp), 0,
        'Expect m=application line to not present in generated SDP');
    }

    return offer;
  });
}

// Helper function to generate answer based on given offer using a freshly
// created RTCPeerConnection object
function generateAnswer(offer) {
  const pc = new RTCPeerConnection();
  return pc.setRemoteDescription(offer)
  .then(() => pc.createAnswer());
}

// Wait for peer connection to fire onsignalingstatechange
// event, compare and make sure the new state is the same
// as expected state. It accepts an RTCPeerConnection object
// and an array of expected state changes. The test passes
// if all expected state change events have been fired, and
// fail if the new state is different from the expected state.
//
// Note that the promise is never resolved if no change
// event is fired. To avoid confusion with the main test
// getting timed out, this is done in parallel as a separate
// test
function test_state_change_event(parentTest, pc, expectedStates) {
  return async_test(t => {
    pc.onsignalingstatechange = t.step_func(() => {
      if(expectedStates.length === 0) {
        return;
      }

      const newState = pc.signalingState;
      const expectedState = expectedStates.shift();

      assert_equals(newState, expectedState, 'New signaling state is different from expected.');

      if(expectedStates.length === 0) {
        t.done();
      }
    });
  }, `Test onsignalingstatechange event for ${parentTest.name}`);
}

// Run a test function that return a promise that should
// never be resolved. For lack of better options,
// we wait for a time out and pass the test if the
// promise doesn't resolve within that time.
function test_never_resolve(testFunc, testName) {
  async_test(t => {
    testFunc(t)
    .then(
      t.step_func(result => {
        assert_unreached(`Pending promise should never be resolved. Instead it is fulfilled with: ${result}`);
      }),
      t.step_func(err => {
        assert_unreached(`Pending promise should never be resolved. Instead it is rejected with: ${err}`);
      }));

    t.step_timeout(t.step_func_done(), 100)
  }, testName);
}

// Helper class to queue ICE candidates of a peer connection
// Can be passed to `exchangeIceCandidates` which will automatically empty the queue.
class IceCandidateQueue {
  constructor(pc) {
    this.pc = pc;
    this._queue = [];
    this._listener = (event) => this._handleIceCandidate(event);

    // Queue ICE candidates
    this.pc.addEventListener('icecandidate', this._listener);
  }

  // Unbind the event listener and return all queued candidates
  disband() {
    this.pc.removeEventListener('icecandidate', this._listener);
    return this._queue;
  }

  _handleIceCandidate(event) {
    this._queue.push(event.candidate);
  }
}

// Helper function to exchange ice candidates between
// two local peer connections
function exchangeIceCandidates(pc1OrQueue, pc2OrQueue) {
  const handleCandidate = (remotePc, candidate) => {
    // candidate may be null to indicate end of candidate gathering.
    // There is ongoing discussion on w3c/webrtc-pc#1213
    // that there should be an empty candidate string event
    // for end of candidate for each m= section.
    if (candidate) {
      remotePc.addIceCandidate(candidate);
    }
  };

  const exchangeCandidates = (localPcOrQueue, remotePcOrQueue) => {
    let localPc = localPcOrQueue;
    let remotePc = remotePcOrQueue;
    if (remotePcOrQueue instanceof IceCandidateQueue) {
      remotePc = remotePcOrQueue.pc;
    }

    // Queue? Disband it first
    if (localPcOrQueue instanceof IceCandidateQueue) {
      localPc = localPcOrQueue.pc;
      for (const candidate of localPcOrQueue.disband()) {
        handleCandidate(remotePc, candidate);
      }
    }

    // Exchange further candidates
    localPc.addEventListener('icecandidate', event => {
      const { candidate } = event;
      handleCandidate(remotePc, candidate);
    });
  };

  exchangeCandidates(pc1OrQueue, pc2OrQueue);
  exchangeCandidates(pc2OrQueue, pc1OrQueue);
}

// Helper function for doing one round of offer/answer exchange
// betweeen two local peer connections
function doSignalingHandshake(localPc, remotePc, options={}) {
  return localPc.createOffer()
  .then(offer => {
    // Modify offer if callback has been provided
    if (options.modifyOffer) {
      offer = options.modifyOffer(offer);
    }

    // Apply offer
    return Promise.all([
      localPc.setLocalDescription(offer),
      remotePc.setRemoteDescription(offer)])
  })
  .then(() => remotePc.createAnswer())
  .then(answer => {
    // Modify answer if callback has been provided
    if (options.modifyAnswer) {
      answer = options.modifyAnswer(answer);
    }

    // Apply answer
    return Promise.all([
      remotePc.setLocalDescription(answer),
      localPc.setRemoteDescription(answer)])
  });
}

// Helper function to create a pair of connected data channel.
// On success the promise resolves to an array with two data channels.
// It does the heavy lifting of performing signaling handshake,
// ICE candidate exchange, and waiting for data channel at two
// end points to open.
//
// IMPORTANT: Due to a bug in Safari which leads to 'id' being 'null', we send
//            the remote channel a message that requests the ID to be sent back
//            to the local channel in order to identify the pair.
function createDataChannelPair(
  pc1=new RTCPeerConnection(),
  pc2=new RTCPeerConnection(),
  options={})
{
  options = Object.assign({}, {
    channelLabel: '',
    channelOptions: undefined,
    doSignaling: true,
    idRequestMessage: 'plz-send-me-id',
  }, options);

  let channel1Options;
  let channel2Options = null;
  if (options.channelOptions instanceof Array) {
    [channel1Options, channel2Options] = options.channelOptions;
  } else {
    channel1Options = options.channelOptions;
  }

  const channel1 = pc1.createDataChannel(options.channelLabel, channel1Options);

  return new Promise((resolve, reject) => {
    const remoteChannels = {};
    let channel2;
    let opened1 = false;
    let opened2 = false;

    function cleanup() {
      channel1.removeEventListener('open', onOpen1);
      channel2.removeEventListener('open', onOpen2);
      channel1.removeEventListener('error', onError);
      channel2.removeEventListener('error', onError);
      channel1.removeEventListener('message', onMessage1);
      channel2.removeEventListener('message', onMessage2);
    }

    function onBothOpened() {
      cleanup();
      resolve([channel1, channel2]);
    }

    function onError(...args) {
      cleanup();
      reject(...args);
    }

    function onOpen1() {
      opened1 = true;

      // Workaround for an annoying bug in Safari
      if (channel1.id === null) {
        setTimeout(() => { console.log(channel1.id); }, 1000); // TODO: REMOVE ME!
        channel1.addEventListener('message', onMessage1, { once: true });
        channel1.send(options.idRequestMessage);
        return;
      }

      if (opened2) {
        onBothOpened();
      }
    }

    function onOpen2() {
      opened2 = true;
      if (opened1) {
        onBothOpened();
      }
    }

    function onMessage1(event) {
      const id = parseInt(event.data, 10);
      channel2 = remoteChannels[id];
      onDataChannelPairFound();
    }

    function onMessage2(event) {
      if (event.data === options.idRequestMessage) {
        this.send(this.id.toString());
      }
    }

    function onDataChannelPairFound() {
      channel2.addEventListener('error', onError, { once: true });
      const { readyState } = channel2;

      if (readyState === 'open') {
        onOpen2();
      } else if (readyState === 'connecting') {
        channel2.addEventListener('open', onOpen2, { once: true });
      } else {
        onError(new Error(`Unexpected ready state ${readyState}`));
      }
    }

    function onDataChannel(event) {
      const channel = event.channel;

      // Keep this check. Will prevent finding pairs where both local and remote
      // id are not an integer (e.g. null).
      if (!Number.isInteger(channel.id)) {
        return;
      }

      // Workaround for an annoying bug in Safari
      if (channel1.id === null) {
        remoteChannels[channel.id] = channel;
        channel.addEventListener('message', onMessage2, { once: true });
        return;
      }

      if (channel.id !== channel1.id) {
        return;
      }

      channel2 = channel;
      onDataChannelPairFound();
    }

    channel1.addEventListener('open', onOpen1, { once: true });
    channel1.addEventListener('error', onError, { once: true });

    if (channel2Options !== null) {
      channel2 = pc2.createDataChannel(options.channelLabel, channel2Options);
      onDataChannelPairFound();
    } else {
      pc2.addEventListener('datachannel', onDataChannel);
    }

    if (options.doSignaling) {
      exchangeIceCandidates(pc1, pc2);
      doSignalingHandshake(pc1, pc2, options);
    }
  });
}

// Wait for a single message event and return
// a promise that resolve when the event fires
function awaitMessage(channel) {
  return new Promise((resolve, reject) => {
    channel.addEventListener('message',
      event => resolve(event.data),
      { once: true });

    channel.addEventListener('error', reject, { once: true });
  });
}

// Helper to convert a blob to array buffer so that
// we can read the content
function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', reject);

    reader.readAsArrayBuffer(blob);
  });
}

// Assert that two TypedArray or ArrayBuffer objects have the same byte values
function assert_equals_typed_array(array1, array2) {
  const [view1, view2] = [array1, array2].map((array) => {
    if (array instanceof ArrayBuffer) {
      return new DataView(array);
    } else {
      assert_true(array.buffer instanceof ArrayBuffer,
        'Expect buffer to be instance of ArrayBuffer');
      return new DataView(array.buffer, array.byteOffset, array.byteLength);
    }
  });

  assert_equals(view1.byteLength, view2.byteLength,
    'Expect both arrays to be of the same byte length');

  const byteLength = view1.byteLength;

  for (let i = 0; i < byteLength; ++i) {
    assert_equals(view1.getUint8(i), view2.getUint8(i),
      `Expect byte at buffer position ${i} to be equal`);
  }
}

// Generate a MediaStreamTrack for testing use.
// We generate it by creating an anonymous RTCPeerConnection,
// call addTransceiver(), and use the remote track
// from RTCRtpReceiver. This track is supposed to
// receive media from a remote peer and be played locally.
// We use this approach instead of getUserMedia()
// to bypass the permission dialog and fake media devices,
// as well as being able to generate many unique tracks.
function generateMediaStreamTrack(kind) {
  const pc = new RTCPeerConnection();

  assert_idl_attribute(pc, 'addTransceiver',
    'Expect pc to have addTransceiver() method');

  const transceiver = pc.addTransceiver(kind);
  const { receiver } = transceiver;
  const { track } = receiver;

  assert_true(track instanceof MediaStreamTrack,
    'Expect receiver track to be instance of MediaStreamTrack');

  return track;
}

// Obtain a MediaStreamTrack of kind using getUserMedia.
// Return Promise of pair of track and associated mediaStream.
// Assumes that there is at least one available device
// to generate the track.
function getTrackFromUserMedia(kind) {
  return navigator.mediaDevices.getUserMedia({ [kind]: true })
  .then(mediaStream => {
    const tracks = mediaStream.getTracks();
    assert_greater_than(tracks.length, 0,
      `Expect getUserMedia to return at least one track of kind ${kind}`);
    const [ track ] = tracks;
    return [track, mediaStream];
  });
}

// Obtain |count| MediaStreamTracks of type |kind| and MediaStreams. The tracks
// do not belong to any stream and the streams are empty. Returns a Promise
// resolved with a pair of arrays [tracks, streams].
// Assumes there is at least one available device to generate the tracks and
// streams and that the getUserMedia() calls resolve.
function getUserMediaTracksAndStreams(count, type = 'audio') {
  let otherTracksPromise;
  if (count > 1)
    otherTracksPromise = getUserMediaTracksAndStreams(count - 1, type);
  else
    otherTracksPromise = Promise.resolve([[], []]);
  return otherTracksPromise.then(([tracks, streams]) => {
    return getTrackFromUserMedia(type)
    .then(([track, stream]) => {
      // Remove the default stream-track relationship.
      stream.removeTrack(track);
      tracks.push(track);
      streams.push(stream);
      return [tracks, streams];
    });
  });
}

// Creates an offer for the caller, set it as the caller's local description and
// then sets the callee's remote description to the offer. Returns the Promise
// of the setRemoteDescription call.
function performOffer(caller, callee) {
  let sessionDescription;
  return caller.createOffer()
  .then(offer => {
    sessionDescription = offer;
    return caller.setLocalDescription(offer);
  }).then(() => callee.setRemoteDescription(sessionDescription));
}


// The resolver has a |promise| that can be resolved or rejected using |resolve|
// or |reject|.
class Resolver {
  constructor() {
    let promiseResolve;
    let promiseReject;
    this.promise = new Promise(function(resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    this.resolve = promiseResolve;
    this.reject = promiseReject;
  }
}


// Contains a set of values and will yell at you if you try to add a value twice.
class UniqueSet extends Set {
  constructor(items) {
    super();
    if (items !== undefined) {
      for (const item of items) {
        this.add(item);
      }
    }
  }

  add(value, message) {
    if (message === undefined) {
      message = `Value '${value}' needs to be unique but it is already in the set`;
    }
    assert_true(!this.has(value), message);
    super.add(value);
  }
}

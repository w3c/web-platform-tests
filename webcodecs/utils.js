function make_audio_data(timestamp, channels, sampleRate, length) {
  let buffer = new AudioBuffer({
    length: length,
    numberOfChannels: channels,
    sampleRate: sampleRate
  });

  for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
    // This gives us the actual array that contains the data
    var array = buffer.getChannelData(channel);
    let hz = 100 + channel * 50; // sound frequency
    for (var i = 0; i < array.length; i++) {
      let t = (i / sampleRate) * hz * (Math.PI * 2);
      array[i] = Math.sin(t);
    }
  }

  return new AudioData({
    timestamp: timestamp,
    buffer: buffer
  });
}

function makeOffscreenCanvas(width, height, options) {
  let canvas = new OffscreenCanvas(width, height);
  let ctx = canvas.getContext('2d', options);
  ctx.fillStyle = 'rgba(50, 100, 150, 255)';
  ctx.fillRect(0, 0, width, height);
  return canvas;
}

function makeImageBitmap(width, height) {
  return makeOffscreenCanvas(width, height).transferToImageBitmap();
}

// Gives a chance to pending output and error callbacks to complete before
// resolving.
function endAfterEventLoopTurn() {
  return new Promise(resolve => step_timeout(resolve, 0));
}

// Returns a codec initialization with callbacks that expected to not be called.
function getDefaultCodecInit(test) {
  return {
    output: test.unreached_func("unexpected output"),
    error: test.unreached_func("unexpected error"),
  }
}

// Checks that codec can be configured, reset, reconfigured, and that incomplete
// or invalid configs throw errors immediately.
function testConfigurations(codec, validCondig, invalidCodecs) {
  assert_equals(codec.state, "unconfigured");

  const requiredConfigPairs = validCondig;
  let incrementalConfig = {};

  for (let key in requiredConfigPairs) {
    // Configure should fail while required keys are missing.
    assert_throws_js(TypeError, () => { codec.configure(incrementalConfig); });
    incrementalConfig[key] = requiredConfigPairs[key];
    assert_equals(codec.state, "unconfigured");
  }

  // Configure should pass once incrementalConfig meets all requirements.
  codec.configure(incrementalConfig);
  assert_equals(codec.state, "configured");

  // We should be able to reconfigure the codec.
  codec.configure(incrementalConfig);
  assert_equals(codec.state, "configured");

  let config = incrementalConfig;

  invalidCodecs.forEach(badCodec => {
    // Invalid codecs should fail.
    config.codec = badCodec;
    assert_throws_js(TypeError, () => { codec.configure(config); }, badCodec);
  })

  // The failed configures should not affect the current config.
  assert_equals(codec.state, "configured");

  // Test we can configure after a reset.
  codec.reset()
  assert_equals(codec.state, "unconfigured");

  codec.configure(validCondig);
  assert_equals(codec.state, "configured");
}

// Performs an encode or decode with the provided input, depending on whether
// the passed codec is an encoder or a decoder.
function encodeOrDecodeShouldThrow(codec, input) {
  // We are testing encode/decode on codecs in invalid states.
  assert_not_equals(codec.state, "configured");

  if (codec.decode) {
    assert_throws_dom("InvalidStateError",
                      () => codec.decode(input),
                      "decode");
  } else if (codec.encode) {
    // Encoders consume frames, so clone it to be safe.
    assert_throws_dom("InvalidStateError",
                  () => codec.encode(input.clone()),
                  "encode");

  } else {
    assert_unreached("Codec should have encode or decode function");
  }
}

// Makes sure that we cannot close, configure, reset, flush, decode or encode a
// closed codec.
function testClosedCodec(test, codec, validconfig, codecInput) {
  assert_equals(codec.state, "unconfigured");

  codec.close();
  assert_equals(codec.state, "closed");

  assert_throws_dom("InvalidStateError",
                    () => codec.configure(validconfig),
                    "configure");
  assert_throws_dom("InvalidStateError",
                    () => codec.reset(),
                    "reset");
  assert_throws_dom("InvalidStateError",
                    () => codec.close(),
                    "close");

  encodeOrDecodeShouldThrow(codec, codecInput);

  return promise_rejects_dom(test, 'InvalidStateError', codec.flush(), 'flush');
}

// Makes sure we cannot flush, encode or decode with an unconfigured coded, and
// that reset is a valid no-op.
function testUnconfiguredCodec(test, codec, codecInput) {
  assert_equals(codec.state, "unconfigured");

  // Configure() and Close() are valid operations that would transition us into
  // a different state.

  // Resetting an unconfigured encoder is a no-op.
  codec.reset();
  assert_equals(codec.state, "unconfigured");

  encodeOrDecodeShouldThrow(codec, codecInput);

  return promise_rejects_dom(test, 'InvalidStateError', codec.flush(), 'flush');
}

// Verifies a PlaneInit structure matches the actual constructed plane.
function verifyPlane(expected, actual) {
  assert_less_than_equal(expected.stride, actual.stride, 'plane strides');
  assert_equals(expected.rows, actual.rows, 'plane rows');
  assert_less_than_equal(
      expected.stride * expected.rows, actual.length, 'plane size');

  var testBuffer = new Uint8Array(actual.length);
  actual.readInto(testBuffer);
  for (var h = 0; h < actual.rows; ++h) {
    assert_array_equals(
        expected.src.slice(h * expected.stride, expected.stride),
        testBuffer.slice(h * actual.stride, expected.stride), 'plane data');
  }
}

// Reference values generated by:
// https://fiddle.skia.org/c/f100d4d5f085a9e09896aabcbc463868

const kSRGBPixel = [50, 100, 150, 255];
const kP3Pixel = [62, 99, 146, 255];
const kRec2020Pixel = [87, 106, 151, 255];

const kCanvasOptionsP3Uint8 = {
  colorSpace: 'display-p3',
  pixelFormat: 'uint8'
};

const kImageSettingOptionsP3Uint8 = {
  colorSpace: 'display-p3',
  storageFormat: 'uint8'
};

const kCanvasOptionsRec2020Uint8 = {
  colorSpace: 'rec2020',
  pixelFormat: 'uint8'
};

const kImageSettingOptionsRec2020Uint8 = {
  colorSpace: 'rec2020',
  storageFormat: 'uint8'
};

function testCanvas(ctx, width, height, expected_pixel, imageSetting, assert_compares) {
  // The dup getImageData is to workaournd crbug.com/1100233
  let imageData = ctx.getImageData(0, 0, width, height, imageSetting);
  let colorData = ctx.getImageData(0, 0, width, height, imageSetting).data;
  const kMaxPixelToCheck = 128 * 96;
  let step = width * height / kMaxPixelToCheck;
  step = Math.round(step);
  step = (step < 1) ? 1 : step;
  for (let i = 0; i < 4 * width * height; i += (4 * step)) {
    assert_compares(colorData[i], expected_pixel[0]);
    assert_compares(colorData[i + 1], expected_pixel[1]);
    assert_compares(colorData[i + 2], expected_pixel[2]);
    assert_compares(colorData[i + 3], expected_pixel[3]);
  }
}

function makeDetachedArrayBuffer() {
  let buffer = new Uint8Array();
  new MessageChannel().port1.postMessage(buffer, [buffer]);
  return buffer;
}

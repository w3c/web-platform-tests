//
// helpers.js
//
// Helper functions used by several WebCryptoAPI tests
//

var registeredAlgorithmNames = [
    "RSASSA-PKCS1-v1_5",
    "RSA-PSS",
    "RSA-OAEP",
    "ECDSA",
    "ECDH",
    "AES-CTR",
    "AES-CBC",
    "AES-GCM",
    "AES-KW",
    "HMAC",
    "SHA-1",
    "SHA-256",
    "SHA-384",
    "SHA-512",
    "HKDF-CTR",
    "PBKDF2"
];


function runningInASecureContext() {
    var protocol = location.protocol.toLowerCase();
    var hostname = location.hostname.toLowerCase();

    if (["https:", "wss:", "file:"].includes(protocol)) {
        return true;
    }

    if (hostname === "localhost") {
        return true;
    }

    if (/^127\.\d+\.\d+\.\d+$/.test(hostname)) {
        return true;
    }

    if (/^(0:){7}1$/.test(hostname) || /^::1$/.test(hostname)) {
        return true;
    }

    return false;
}


// Treats an array as a set, and generates an array of all non-empty
// subsets (which are themselves arrays).
//
// The order of members of the "subsets" is not guaranteed.
function allNonemptySubsetsOf(arr) {
    var results = [];
    var firstElement;
    var remainingElements;

    for(var i=0; i<arr.length; i++) {
        firstElement = arr[i];
        remainingElements = arr.slice(i+1);
        results.push([firstElement]);

        if (remainingElements.length > 0) {
            allNonemptySubsetsOf(remainingElements).forEach(function(combination) {
                combination.push(firstElement);
                results.push(combination);
            });
        }
    }

    return results;
}


// Create a string representation of keyGeneration parameters for
// test names and labels.

function objectToString(obj) {
    var keyValuePairs = [];

    if (Array.isArray(obj)) {
        return "[" + obj.map(function(elem){return objectToString(elem);}).join(", ") + "]";
    } else if (typeof obj === "object") {
        Object.keys(obj).sort().forEach(function(keyName) {
            keyValuePairs.push(keyName + ": " + objectToString(obj[keyName]));
        });
        return "{" + keyValuePairs.join(", ") + "}";
    } else if (typeof obj === "undefined") {
        return "undefined";
    } else {
        return obj.toString();
    }

    var keyValuePairs = [];

    Object.keys(obj).sort().forEach(function(keyName) {
        var value = obj[keyName];
        if (typeof value === "object") {
            value = objectToString(value);
        } else if (typeof value === "array") {
            value = "[" + value.map(function(elem){return objectToString(elem);}).join(", ") + "]";
        } else {
            value = value.toString();
        }

        keyValuePairs.push(keyName + ": " + value);
    });

    return "{" + keyValuePairs.join(", ") + "}";
}

// Is key a CryptoKey object with correct algorithm, extractable, and usages?
// Is it a secret, private, or public kind of key?
function assert_goodCryptoKey(key, algorithm, extractable, usages, kind) {
    var correctUsages = [];

    var registeredAlgorithmName;
    registeredAlgorithmNames.forEach(function(name) {
        if (name.toUpperCase() === algorithm.name.toUpperCase()) {
            registeredAlgorithmName = name;
        }
    });

    assert_equals(key.constructor, CryptoKey, "Is a CryptoKey");
    assert_equals(key.type, kind, "Is a " + kind + " key");
    if (key.type === "public") {
        extractable = true; // public keys are always extractable
    }
    assert_equals(key.extractable, extractable, "Extractability is correct");

    assert_equals(key.algorithm.name, registeredAlgorithmName, "Correct algorithm name");
    assert_equals(key.algorithm.length, algorithm.length, "Correct length");
    if (["HMAC", "RSASSA-PKCS1-v1_5", "RSA-PSS"].includes(registeredAlgorithmName)) {
        assert_equals(key.algorithm.hash.name.toUpperCase(), algorithm.hash.toUpperCase(), "Correct hash function");
    }

    // The usages parameter could have repeats, but the usages
    // property of the result should not.

    if (key.type === "public") {
        ["encrypt", "verify", "wrapKey"].forEach(function(usage) {
            if (usages.includes(usage)) {
                correctUsages.push(usage);
            }
        });
    } else if (key.type === "public") {
        ["decrypt", "sign", "unwrapKey"].forEach(function(usage) {
            if (usages.includes(usage)) {
                correctUsages.push(usage);
            }
        });
    } else {
        correctUsages = usages;
    }

    assert_equals((typeof key.usages), "object", "key.usages is an object");
    assert_not_equals(key.usages, null, "key.usages isn't null");
    var usageCount = 0;
    key.usages.forEach(function(usage) {
        usageCount += 1;
        assert_in_array(usage, correctUsages, "Has " + usage + " usage");
    });
    assert_equals(key.usages.length, usageCount, "usages property is correct");
}


// The algorithm parameter is an object with a name and other
// properties. Given the name, generate all valid parameters.
//
// You can have a "short run" for RSA by including a second, true
// parameter. Useful if you're testing one variant of the
// algorithm name exhaustively, so need less exhaustive tests
// for other variants.
function allAlgorithmSpecifiersFor(algorithmName, shortRun) {
    var results = [];
    var hashes = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    var keyLengths = [1024, 2048, 3072, 4096];
    var curves = ["P-256", "P-384", "P-521"];

    if (algorithmName.toUpperCase().substring(0, 3) === "AES") {
        // Specifier properties are name and length
        [128, 192, 256].forEach(function(length) {
            results.push({name: algorithmName, length: length});
        });
    } else if (algorithmName.toUpperCase() === "HMAC") {
        [
            {name: "SHA-1", length: 160},
            {name: "SHA-256", length: 256},
            {name: "SHA-384", length: 384},
            {name: "SHA-512", length: 512}
        ].forEach(function(hashAlgorithm) {
            results.push({name: algorithmName, hash: hashAlgorithm.name, length: hashAlgorithm.length});
        });
    } else if (algorithmName.toUpperCase().substring(0, 3) === "RSA") {
        if (shortRun) {
            hashes = ["SHA-1", "SHA-384"];
            keyLengths = [1024, 2048];
        }
        hashes.forEach(function(hashName) {
            if (shortRun) {
                keyLengths = [1024, 2048];
            }
            keyLengths.forEach(function(modulusLength) {
                [new Uint8Array([3]), new Uint8Array([1,0,1])].forEach(function(publicExponent) {
                    results.push({name: algorithmName, hash: hashName, modulusLength: modulusLength, publicExponent: publicExponent});
                });
            });
        });
    } else if (algorithmName.toUpperCase().substring(0, 2) === "EC") {
        curves.forEach(function(curveName) {
            results.push({name: algorithmName, namedCurve: curveName});
        });
    }

    return results;
}


// Create every possible valid usages parameter, given legal
// usages. Note that an empty usages parameter is not always valid.
//
// There is an optional parameter - mandatoryUsages. If provided,
// it should be an array containing those usages of which one must be
// included. For example, when generating an RSA-PSS key pair,
// both "sign" and "verify" are possible usages, but if "verify"
// is not included in the usages, the private key will end up
// with an empty set of usages, causing a Syntax Error.
function allValidUsages(validUsages, emptyIsValid, mandatoryUsages) {
    okaySubsets = [];
    allNonemptySubsetsOf(validUsages).forEach(function(subset) {
        if (!mandatoryUsages || mandatoryUsages.length === 0) {
            okaySubsets.push(subset);
        } else {
            for (var i=0; i<mandatoryUsages.length; i++) {
                if (subset.includes(mandatoryUsages[i])) {
                    okaySubsets.push(subset);
                    return;
                }
            }
        }
    });

    if (emptyIsValid) {
        okaySubsets.push([]);
    }

    okaySubsets.push(validUsages.concat(mandatoryUsages).concat(validUsages)); // Repeated values are allowed
    return okaySubsets;
}

// Algorithm name specifiers are case-insensitive. Generate several
// case variations of a given name.
function allNameVariants(name) {
    var upCaseName = name.toUpperCase();
    var lowCaseName = name.toLowerCase();
    var mixedCaseName = upCaseName.substring(0, 1) + lowCaseName.substring(1);

    return [upCaseName, lowCaseName, mixedCaseName];
}



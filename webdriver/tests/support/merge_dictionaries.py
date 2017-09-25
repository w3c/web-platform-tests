def iteritems(d):
    """Create a key-value iterator for the given dict in both Python 2.x and
    Python 3.x environments"""
    if hasattr(d, "iteritems"):
        return d.iteritems()
    return d.items()

def merge_dictionaries(first, second):
    """Given two dictionaries, create a third that defines all specified
    key/value pairs. This merge_dictionaries is performed "deeply" on any nested
    dictionaries. If a value is defined for the same key by both dictionaries,
    an exception will be raised."""
    result = dict(first)

    for key, value in iteritems(second):
        if key in result and result[key] != value:
            if isinstance(result[key], dict) and isinstance(value, dict):
                result[key] = merge_dictionaries(result[key], value)
            elif result[key] != value:
                raise TypeError("merge_dictionaries: refusing to overwrite " +
                                  "attribute: `%s`" % key)
        else:
            result[key] = value

    return result

def overwrite_dictionary(first, second):
    """Given two dictionaries, create a third that defines all specified
    key/value pairs. This merge_dictionaries is performed "deeply" on any nested
    dictionaries. If a value is defined for the same key by both dictionaries,
    the vale of the second one is used."""
    result = dict(first)

    for key, value in iteritems(first):
        if key not in second or second[key] == value:
            continue
        if isinstance(second[key], dict) and isinstance(value, dict):
            result[key] = overwrite_dictionary(result[key], second[key])
        else:
            result[key] = second[key]

    for key, value in iteritems(second):
        if key not in result:
            result[key] = value

    return result

if __name__ == "__main__":
    assert merge_dictionaries({}, {}) == {}
    assert merge_dictionaries({}, {"a": 23}) == {"a": 23}
    assert merge_dictionaries({"a": 23}, {"b": 45}) == {"a": 23, "b": 45}

    e = None
    try:
        merge_dictionaries({"a": 23}, {"a": 45})
    except Exception as _e:
        e = _e
    assert isinstance(e, TypeError)

    assert merge_dictionaries({"a": 23}, {"a": 23}) == {"a": 23}

    assert merge_dictionaries({"a": {"b": 23}}, {"a": {"c": 45}}) == {"a": {"b": 23, "c": 45}}
    assert merge_dictionaries({"a": {"b": 23}}, {"a": {"b": 23}}) == {"a": {"b": 23}}

    e = None
    try:
        merge_dictionaries({"a": {"b": 23}}, {"a": {"b": 45}})
    except Exception as _e:
        e = _e
    assert isinstance(e, TypeError)

    assert overwrite_dictionary({}, {}) == {}
    assert overwrite_dictionary({}, {"a": 23}) == {"a": 23}
    assert overwrite_dictionary({"a": 23}, {}) == {"a": 23}
    assert overwrite_dictionary({"a": 23}, {"b": 45}) == {"a": 23, "b": 45}

    assert overwrite_dictionary({"a": 23, "b": 45}, {"b": 55}) == {"a": 23, "b": 55}
    assert overwrite_dictionary({"a": {"b": 23, "d": 60}}, {"a": {"b": 45, "c": 55}}) == {"a": {"b": 45, "c": 55, "d": 60}}
    assert overwrite_dictionary({"a": {"b": 23, "d": 60}}, {"a": {"b": 23, "d": 65, "f": {"g": 75}}, "z": -10}) == {"a": {"b": 23, "d": 65, "f": {"g": 75}}, "z": -10}

import re
import json

from six import PY3


MYPY = False
if MYPY:
    # MYPY is set to True when run under Mypy.
    from typing import Any, AnyStr, Callable, Dict, IO, Text


try:
    import ujson
except ImportError:
    has_ujson = False
else:
    has_ujson = True

#
# load
#

if has_ujson:
    load = ujson.load  # type: Callable[[IO[AnyStr]], Any]

else:
    load = json.load


#
# loads
#

if has_ujson:
    loads = ujson.loads  # type: Callable[[AnyStr], Any]

else:
    loads = json.loads


#
# dump/dumps_local options for some libraries
#
__ujson_dump_local_kwargs = {
    'ensure_ascii': False,
    'escape_forward_slashes': False,
    'indent': 1,
}  # type: Dict[str, Any]

if PY3:
    __ujson_dump_local_kwargs['reject_bytes'] = True


__json_dump_local_kwargs = {
    'ensure_ascii': False,
    'indent': 1,
    'separators': (',', ': '),
}  # type: Dict[str, Any]


#
# dump_local (for local, non-distributed usage of JSON)
#

if has_ujson:
    def dump_local(obj, fp):
        # type: (Any, IO[str]) -> None
        return ujson.dump(obj, fp, **__ujson_dump_local_kwargs)

else:
    def dump_local(obj, fp):
        # type: (Any, IO[str]) -> None
        return json.dump(obj, fp, **__json_dump_local_kwargs)


#
# dumps_local (for local, non-distributed usage of JSON)
#

if has_ujson:
    def dumps_local(obj):
        # type: (Any) -> Text
        return ujson.dumps(obj, **__ujson_dump_local_kwargs)

else:
    def dumps_local(obj):
        # type: (Any) -> Text
        return json.dumps(obj, **__json_dump_local_kwargs)


#
# dump/dumps_dist (for distributed usage of JSON where files should safely roundtrip)
#

__ujson_dump_dist_kwargs = {
    'sort_keys': True,
    'indent': 1,
}  # type: Dict[str, Any]

if PY3:
    __ujson_dump_dist_kwargs['reject_bytes'] = True

__json_dump_dist_kwargs = {
    'sort_keys': True,
    'indent': 1,
    'separators': (',', ': '),
}  # type: Dict[str, Any]


if has_ujson:
    if ujson.dumps([], indent=1) == "[]":
        # optimistically see if https://github.com/ultrajson/ultrajson/issues/429 is fixed
        def __ujson_fixup(s):
            # type: (str) -> str
            return s
    else:
        __ujson_fixup_re = re.compile(r"([\[{])[\n\x20]+([}\]])")

        def __ujson_fixup(s):
            # type: (str) -> str
            return __ujson_fixup_re.sub(
                lambda m: m.group(1) + m.group(2),
                s
            )

    def dump_dist(obj, fp):
        # type: (Any, IO[str]) -> None
        fp.write(__ujson_fixup(ujson.dumps(obj, **__ujson_dump_dist_kwargs)))

    def dumps_dist(obj):
        # type: (Any) -> Text
        return __ujson_fixup(ujson.dumps(obj, **__ujson_dump_dist_kwargs))
else:
    def dump_dist(obj, fp):
        # type: (Any, IO[str]) -> None
        json.dump(obj, fp, **__json_dump_dist_kwargs)

    def dumps_dist(obj):
        # type: (Any) -> Text
        return json.dumps(obj, **__json_dump_dist_kwargs)

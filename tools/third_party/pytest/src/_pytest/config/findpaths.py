import os
from typing import Dict
from typing import Iterable
from typing import List
from typing import Optional
from typing import Sequence
from typing import Tuple
from typing import Union

import iniconfig

from .exceptions import UsageError
from _pytest.compat import TYPE_CHECKING
from _pytest.outcomes import fail
from _pytest.pathlib import absolutepath
from _pytest.pathlib import commonpath
from _pytest.pathlib import Path

if TYPE_CHECKING:
    from . import Config


def _parse_ini_config(path: Path) -> iniconfig.IniConfig:
    """Parse the given generic '.ini' file using legacy IniConfig parser, returning
    the parsed object.

    Raise UsageError if the file cannot be parsed.
    """
    try:
        return iniconfig.IniConfig(path)
    except iniconfig.ParseError as exc:
        raise UsageError(str(exc)) from exc


def load_config_dict_from_file(
    filepath: Path,
) -> Optional[Dict[str, Union[str, List[str]]]]:
    """Load pytest configuration from the given file path, if supported.

    Return None if the file does not contain valid pytest configuration.
    """

    # Configuration from ini files are obtained from the [pytest] section, if present.
    if filepath.suffix == ".ini":
        iniconfig = _parse_ini_config(filepath)

        if "pytest" in iniconfig:
            return dict(iniconfig["pytest"].items())
        else:
            # "pytest.ini" files are always the source of configuration, even if empty.
            if filepath.name == "pytest.ini":
                return {}

    # '.cfg' files are considered if they contain a "[tool:pytest]" section.
    elif filepath.suffix == ".cfg":
        iniconfig = _parse_ini_config(filepath)

        if "tool:pytest" in iniconfig.sections:
            return dict(iniconfig["tool:pytest"].items())
        elif "pytest" in iniconfig.sections:
            # If a setup.cfg contains a "[pytest]" section, we raise a failure to indicate users that
            # plain "[pytest]" sections in setup.cfg files is no longer supported (#3086).
            fail(CFG_PYTEST_SECTION.format(filename="setup.cfg"), pytrace=False)

    # '.toml' files are considered if they contain a [tool.pytest.ini_options] table.
    elif filepath.suffix == ".toml":
        import toml

        config = toml.load(str(filepath))

        result = config.get("tool", {}).get("pytest", {}).get("ini_options", None)
        if result is not None:
            # TOML supports richer data types than ini files (strings, arrays, floats, ints, etc),
            # however we need to convert all scalar values to str for compatibility with the rest
            # of the configuration system, which expects strings only.
            def make_scalar(v: object) -> Union[str, List[str]]:
                return v if isinstance(v, list) else str(v)

            return {k: make_scalar(v) for k, v in result.items()}

    return None


def locate_config(
    args: Iterable[Path],
) -> Tuple[
    Optional[Path], Optional[Path], Dict[str, Union[str, List[str]]],
]:
    """Search in the list of arguments for a valid ini-file for pytest,
    and return a tuple of (rootdir, inifile, cfg-dict)."""
    config_names = [
        "pytest.ini",
        "pyproject.toml",
        "tox.ini",
        "setup.cfg",
    ]
    args = [x for x in args if not str(x).startswith("-")]
    if not args:
        args = [Path.cwd()]
    for arg in args:
        argpath = absolutepath(arg)
        for base in (argpath, *argpath.parents):
            for config_name in config_names:
                p = base / config_name
                if p.is_file():
                    ini_config = load_config_dict_from_file(p)
                    if ini_config is not None:
                        return base, p, ini_config
    return None, None, {}


def get_common_ancestor(paths: Iterable[Path]) -> Path:
    common_ancestor = None  # type: Optional[Path]
    for path in paths:
        if not path.exists():
            continue
        if common_ancestor is None:
            common_ancestor = path
        else:
            if common_ancestor in path.parents or path == common_ancestor:
                continue
            elif path in common_ancestor.parents:
                common_ancestor = path
            else:
                shared = commonpath(path, common_ancestor)
                if shared is not None:
                    common_ancestor = shared
    if common_ancestor is None:
        common_ancestor = Path.cwd()
    elif common_ancestor.is_file():
        common_ancestor = common_ancestor.parent
    return common_ancestor


def get_dirs_from_args(args: Iterable[str]) -> List[Path]:
    def is_option(x: str) -> bool:
        return x.startswith("-")

    def get_file_part_from_node_id(x: str) -> str:
        return x.split("::")[0]

    def get_dir_from_path(path: Path) -> Path:
        if path.is_dir():
            return path
        return path.parent

    def safe_exists(path: Path) -> bool:
        # This can throw on paths that contain characters unrepresentable at the OS level,
        # or with invalid syntax on Windows (https://bugs.python.org/issue35306)
        try:
            return path.exists()
        except OSError:
            return False

    # These look like paths but may not exist
    possible_paths = (
        absolutepath(get_file_part_from_node_id(arg))
        for arg in args
        if not is_option(arg)
    )

    return [get_dir_from_path(path) for path in possible_paths if safe_exists(path)]


CFG_PYTEST_SECTION = "[pytest] section in {filename} files is no longer supported, change to [tool:pytest] instead."


def determine_setup(
    inifile: Optional[str],
    args: Sequence[str],
    rootdir_cmd_arg: Optional[str] = None,
    config: Optional["Config"] = None,
) -> Tuple[Path, Optional[Path], Dict[str, Union[str, List[str]]]]:
    rootdir = None
    dirs = get_dirs_from_args(args)
    if inifile:
        inipath_ = absolutepath(inifile)
        inipath = inipath_  # type: Optional[Path]
        inicfg = load_config_dict_from_file(inipath_) or {}
        if rootdir_cmd_arg is None:
            rootdir = get_common_ancestor(dirs)
    else:
        ancestor = get_common_ancestor(dirs)
        rootdir, inipath, inicfg = locate_config([ancestor])
        if rootdir is None and rootdir_cmd_arg is None:
            for possible_rootdir in (ancestor, *ancestor.parents):
                if (possible_rootdir / "setup.py").is_file():
                    rootdir = possible_rootdir
                    break
            else:
                if dirs != [ancestor]:
                    rootdir, inipath, inicfg = locate_config(dirs)
                if rootdir is None:
                    if config is not None:
                        cwd = config.invocation_params.dir
                    else:
                        cwd = Path.cwd()
                    rootdir = get_common_ancestor([cwd, ancestor])
                    is_fs_root = os.path.splitdrive(str(rootdir))[1] == "/"
                    if is_fs_root:
                        rootdir = ancestor
    if rootdir_cmd_arg:
        rootdir = absolutepath(os.path.expandvars(rootdir_cmd_arg))
        if not rootdir.is_dir():
            raise UsageError(
                "Directory '{}' not found. Check your '--rootdir' option.".format(
                    rootdir
                )
            )
    assert rootdir is not None
    return rootdir, inipath, inicfg or {}

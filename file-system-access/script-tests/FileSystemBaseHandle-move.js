// META: script=resources/test-helpers.js

// 'use strict';

directory_test(async (t, root) => {
  const handle = await createFileWithContents(t, 'file-before', 'foo', root);
  await handle.move('file-after');

  assert_array_equals(await getSortedDirectoryEntries(root), ['file-after']);
  assert_equals(await getFileContents(handle), 'foo');
  assert_equals(await getFileSize(handle), 3);
}, 'move(name) to rename a file');

directory_test(async (t, root) => {
  const handle = await createFileWithContents(t, 'file-before', 'foo', root);
  await handle.move(root, 'file-after');

  assert_array_equals(await getSortedDirectoryEntries(root), ['file-after']);
  assert_equals(await getFileContents(handle), 'foo');
  assert_equals(await getFileSize(handle), 3);
}, 'move(dir, name) to rename a file');

directory_test(async (t, root) => {
  const handle = await createFileWithContents(t, 'file-before', 'foo', root);
  await promise_rejects_js(t, TypeError, handle.move(''));

  assert_array_equals(await getSortedDirectoryEntries(root), ['file-before']);
  assert_equals(await getFileContents(handle), 'foo');
  assert_equals(await getFileSize(handle), 3);
}, 'move("") to rename a file fails');

directory_test(async (t, root) => {
  const dir = await root.getDirectoryHandle('dir-before', {create: true});
  await dir.move('dir-after');

  assert_array_equals(await getSortedDirectoryEntries(root), ['dir-after/']);
  assert_array_equals(await getSortedDirectoryEntries(dir), []);
}, 'move(name) to rename an empty directory');

directory_test(async (t, root) => {
  const dir = await root.getDirectoryHandle('dir-before', {create: true});
  await dir.move(root, 'dir-after');

  assert_array_equals(await getSortedDirectoryEntries(root), ['dir-after/']);
  assert_array_equals(await getSortedDirectoryEntries(dir), []);
}, 'move(dir, name) to rename an empty directory');

directory_test(async (t, root) => {
  const dir = await root.getDirectoryHandle('dir-before', {create: true});
  await promise_rejects_js(t, TypeError, dir.move(''));

  assert_array_equals(await getSortedDirectoryEntries(root), ['dir-before/']);
  assert_array_equals(await getSortedDirectoryEntries(dir), []);
}, 'move("") to rename an empty directory fails');

directory_test(async (t, root) => {
  const dir = await root.getDirectoryHandle('dir-before', {create: true});
  await createFileWithContents(t, 'file-in-dir', 'abc', dir);
  await dir.move('dir-after');

  assert_array_equals(await getSortedDirectoryEntries(root), ['dir-after/']);
  assert_array_equals(await getSortedDirectoryEntries(dir), ['file-in-dir']);
}, 'move(name) to rename a non-empty directory');

directory_test(async (t, root) => {
  const dir = await root.getDirectoryHandle('dir-before', {create: true});
  await createFileWithContents(t, 'file-in-dir', 'abc', dir);
  await dir.move(root, 'dir-after');

  assert_array_equals(await getSortedDirectoryEntries(root), ['dir-after/']);
  assert_array_equals(await getSortedDirectoryEntries(dir), ['file-in-dir']);
}, 'move(dir, name) to rename a non-empty directory');

directory_test(async (t, root) => {
  const dir_src = await root.getDirectoryHandle('dir-src', {create: true});
  const dir_dest = await root.getDirectoryHandle('dir-dest', {create: true});
  const file = await createFileWithContents(t, 'file', 'abc', dir_src);
  await file.move(dir_dest, null);

  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir-dest/', 'dir-src/']);
  assert_array_equals(await getSortedDirectoryEntries(dir_src), []);
  assert_array_equals(await getSortedDirectoryEntries(dir_dest), ['file']);
  assert_equals(await getFileContents(file), 'abc');
  assert_equals(await getFileSize(file), 3);
}, 'move(dir, _) to move a file to a new directory');

directory_test(async (t, root) => {
  const dir_src = await root.getDirectoryHandle('dir-src', {create: true});
  const dir_dest = await root.getDirectoryHandle('dir-dest', {create: true});
  const file = await createFileWithContents(t, 'file', 'abc', dir_src);
  await file.move(dir_dest, '');

  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir-dest/', 'dir-src/']);
  assert_array_equals(await getSortedDirectoryEntries(dir_src), []);
  assert_array_equals(await getSortedDirectoryEntries(dir_dest), ['file']);
  assert_equals(await getFileContents(file), 'abc');
  assert_equals(await getFileSize(file), 3);
}, 'move(dir, "") to move a file to a new directory');

directory_test(async (t, root) => {
  const dir_src = await root.getDirectoryHandle('dir-src', {create: true});
  const dir_dest = await root.getDirectoryHandle('dir-dest', {create: true});
  const file =
      await createFileWithContents(t, 'file-in-dir-src', 'abc', dir_src);
  await file.move(dir_dest, 'file-in-dir-dest');

  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir-dest/', 'dir-src/']);
  assert_array_equals(await getSortedDirectoryEntries(dir_src), []);
  assert_array_equals(
      await getSortedDirectoryEntries(dir_dest), ['file-in-dir-dest']);
  assert_equals(await getFileContents(file), 'abc');
  assert_equals(await getFileSize(file), 3);
}, 'move(dir, name) to move a file to a new directory');

directory_test(async (t, root) => {
  const dir_src = await root.getDirectoryHandle('dir-src', {create: true});
  const dir_dest = await root.getDirectoryHandle('dir-dest', {create: true});
  const dir_in_dir =
      await dir_src.getDirectoryHandle('dir-in-dir', {create: true});
  await dir_in_dir.move(dir_dest, null);

  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir-dest/', 'dir-src/']);
  assert_array_equals(await getSortedDirectoryEntries(dir_src), []);
  assert_array_equals(
      await getSortedDirectoryEntries(dir_dest), ['dir-in-dir/']);
  assert_array_equals(await getSortedDirectoryEntries(dir_in_dir), []);
}, 'move(dir, _) to move an empty directory to a new directory');

directory_test(async (t, root) => {
  const dir_src = await root.getDirectoryHandle('dir-src', {create: true});
  const dir_dest = await root.getDirectoryHandle('dir-dest', {create: true});
  const dir_in_dir =
      await dir_src.getDirectoryHandle('dir-in-dir', {create: true});
  await dir_in_dir.move(dir_dest, 'dir-in-dir');

  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir-dest/', 'dir-src/']);
  assert_array_equals(await getSortedDirectoryEntries(dir_src), []);
  assert_array_equals(
      await getSortedDirectoryEntries(dir_dest), ['dir-in-dir/']);
  assert_array_equals(await getSortedDirectoryEntries(dir_in_dir), []);
}, 'move(dir, name) to move an empty directory to a new directory');

directory_test(async (t, root) => {
  const dir_src = await root.getDirectoryHandle('dir-src', {create: true});
  const dir_dest = await root.getDirectoryHandle('dir-dest', {create: true});
  const dir_in_dir =
      await dir_src.getDirectoryHandle('dir-in-dir', {create: true});
  const file =
      await createFileWithContents(t, 'file-in-dir', 'abc', dir_in_dir);
  await dir_in_dir.move(dir_dest, null);

  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir-dest/', 'dir-src/']);
  assert_array_equals(await getSortedDirectoryEntries(dir_src), []);
  assert_array_equals(
      await getSortedDirectoryEntries(dir_dest), ['dir-in-dir/']);
  assert_array_equals(
      await getSortedDirectoryEntries(dir_in_dir), ['file-in-dir']);
  // `file` should be invalidated after moving directories.
  await promise_rejects_dom(t, 'NotFoundError', getFileContents(file));
}, 'move(dir, _) to move a non-empty directory to a new directory');

directory_test(async (t, root) => {
  const dir_src = await root.getDirectoryHandle('dir-src', {create: true});
  const dir_dest = await root.getDirectoryHandle('dir-dest', {create: true});
  const dir_in_dir =
      await dir_src.getDirectoryHandle('dir-in-dir', {create: true});
  const file =
      await createFileWithContents(t, 'file-in-dir', 'abc', dir_in_dir);
  await dir_in_dir.move(dir_dest, 'dir-in-dir');

  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir-dest/', 'dir-src/']);
  assert_array_equals(await getSortedDirectoryEntries(dir_src), []);
  assert_array_equals(
      await getSortedDirectoryEntries(dir_dest), ['dir-in-dir/']);
  assert_array_equals(
      await getSortedDirectoryEntries(dir_in_dir), ['file-in-dir']);
  // `file` should be invalidated after moving directories.
  await promise_rejects_dom(t, 'NotFoundError', getFileContents(file));
}, 'move(dir, name) to move a non-empty directory to a new directory');

directory_test(async (t, root) => {
  const handle = await createFileWithContents(t, 'file-1', 'foo', root);

  await handle.move('file-2');
  assert_array_equals(await getSortedDirectoryEntries(root), ['file-2']);

  await handle.move('file-3');
  assert_array_equals(await getSortedDirectoryEntries(root), ['file-3']);

  await handle.move('file-1');
  assert_array_equals(await getSortedDirectoryEntries(root), ['file-1']);
}, 'move(name) can be called multiple times');

directory_test(async (t, root) => {
  const dir1 = await root.getDirectoryHandle('dir1', {create: true});
  const dir2 = await root.getDirectoryHandle('dir2', {create: true});
  const handle = await createFileWithContents(t, 'file', 'foo', root);

  await handle.move(dir1, null);
  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir1/', 'dir2/']);
  assert_array_equals(await getSortedDirectoryEntries(dir1), ['file']);
  assert_array_equals(await getSortedDirectoryEntries(dir2), []);
  assert_equals(await getFileContents(handle), 'foo');

  await handle.move(dir2, null);
  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir1/', 'dir2/']);
  assert_array_equals(await getSortedDirectoryEntries(dir1), []);
  assert_array_equals(await getSortedDirectoryEntries(dir2), ['file']);
  assert_equals(await getFileContents(handle), 'foo');

  await handle.move(root, null);
  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir1/', 'dir2/', 'file']);
  assert_array_equals(await getSortedDirectoryEntries(dir1), []);
  assert_array_equals(await getSortedDirectoryEntries(dir2), []);
  assert_equals(await getFileContents(handle), 'foo');
}, 'move(dir, _) can be called multiple times');

directory_test(async (t, root) => {
  const dir1 = await root.getDirectoryHandle('dir1', {create: true});
  const dir2 = await root.getDirectoryHandle('dir2', {create: true});
  const handle = await createFileWithContents(t, 'file', 'foo', root);

  await handle.move(dir1, 'file-1');
  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir1/', 'dir2/']);
  assert_array_equals(await getSortedDirectoryEntries(dir1), ['file-1']);
  assert_array_equals(await getSortedDirectoryEntries(dir2), []);
  assert_equals(await getFileContents(handle), 'foo');

  await handle.move(dir2, 'file-2');
  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir1/', 'dir2/']);
  assert_array_equals(await getSortedDirectoryEntries(dir1), []);
  assert_array_equals(await getSortedDirectoryEntries(dir2), ['file-2']);
  assert_equals(await getFileContents(handle), 'foo');

  await handle.move(root, 'file-3');
  assert_array_equals(
      await getSortedDirectoryEntries(root), ['dir1/', 'dir2/', 'file-3']);
  assert_array_equals(await getSortedDirectoryEntries(dir1), []);
  assert_array_equals(await getSortedDirectoryEntries(dir2), []);
  assert_equals(await getFileContents(handle), 'foo');
}, 'move(dir, name) can be called multiple times');

directory_test(async (t, root) => {
  const handle = await createFileWithContents(t, 'file-before', 'foo', root);
  await promise_rejects_js(
      t, TypeError,
      handle.move(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));

  assert_array_equals(await getSortedDirectoryEntries(root), ['file-before']);
  assert_equals(await getFileContents(handle), 'foo');
  assert_equals(await getFileSize(handle), 3);
}, 'move(name) with an invalid name should fail');

directory_test(async (t, root) => {
  const handle = await createFileWithContents(t, 'file-before', 'foo', root);
  await promise_rejects_js(
      t, TypeError,
      handle.move(
          root,
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));

  assert_array_equals(await getSortedDirectoryEntries(root), ['file-before']);
  assert_equals(await getFileContents(handle), 'foo');
  assert_equals(await getFileSize(handle), 3);
}, 'move(dir, name) with an invalid name should fail');

directory_test(async (t, root) => {
  const handle = await createFileWithContents(t, 'file-before', 'foo', root);
  await promise_rejects_js(t, TypeError, handle.move('#$23423@352^*3243'));

  assert_array_equals(await getSortedDirectoryEntries(root), ['file-before']);
  assert_equals(await getFileContents(handle), 'foo');
  assert_equals(await getFileSize(handle), 3);
}, 'move(name) with a dangerous name should fail');

directory_test(async (t, root) => {
  const handle = await createFileWithContents(t, 'file-before', 'foo', root);
  await promise_rejects_js(
      t, TypeError, handle.move(root, '#$23423@352^*3243'));

  assert_array_equals(await getSortedDirectoryEntries(root), ['file-before']);
  assert_equals(await getFileContents(handle), 'foo');
  assert_equals(await getFileSize(handle), 3);
}, 'move(dir, name) with a dangerous name should fail');

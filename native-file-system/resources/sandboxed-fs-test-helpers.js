// This file defines a directory_test() function that can be used to define
// tests that require a FileSystemDirectoryHandle. The implementation of that
// function in this file will return an empty directory in the sandboxed file
// system.
//
// Another implementation of this function exists in native-fs-test-helpers.js,
// where that version uses the native file system instead.

async function cleanupSandboxedFileSystem() {
  const dir =
      await self.getOriginPrivateDirectory();
  for await (let entry of dir.getEntries())
    await dir.removeEntry(entry.name, {recursive: entry.kind === 'directory'});
}

function directory_test(func, description) {
  promise_test(async t => {
    // To be extra resilient against bad tests, cleanup before every test.
    await cleanupSandboxedFileSystem();

    const dir =
        await self.getOriginPrivateDirectory();
    await func(t, dir);
  }, description);
}

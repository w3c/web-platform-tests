const load = {
  // Returns a promise that settles once the given path has been fetched as an
  // image resource.
  image: path => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = img.onerror = resolve;
      img.src = path;
    });
  },

  // Returns a promise that settles once the given path has been fetched as a
  // font resource.
  font: path => {
    const div = document.createElement('div');
    div.innerHTML = `
      <style>
      @font-face {
          font-family: ahem;
          src: url('${path}');
      }
      </style>
      <div style="font-family: ahem;">This fetches ahem font.</div>
    `;
    document.body.appendChild(div);
    return document.fonts.ready.then(() => {
      document.body.removeChild(div);
    });
  },

  // Returns a promise that settles once the given path has been fetched as a
  // stylesheet resource.
  stylesheet: async path => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = path;

    const loaded = new Promise(resolve => {
      link.onload = link.onerror = resolve;
    });

    document.head.appendChild(link);
    await loaded;
    document.head.removeChild(link);
  },

  // Returns a promise that settles once the given path has been fetched as an
  // iframe.
  iframe: async path => {
    const frame = document.createElement("iframe");
    const loaded = new Promise(resolve => {
      frame.onload = frame.onerror = resolve;
    });
    frame.src = path;
    document.body.appendChild(frame);
    await loaded;
    document.body.removeChild(frame);
  },

  // Returns a promise that settles once the given path has been fetched as a
  // script.
  script: async path => {
    const script = document.createElement("script");
    const loaded = new Promise(resolve => {
      script.onload = script.onerror = resolve;
    });
    script.src = path;
    document.body.appendChild(script);
    await loaded;
    document.body.removeChild(script);
  },

  // Returns a promise that settles once the given path has been fetched
  // through a synchronous XMLHttpRequest.
  xhr_sync: async path => {
    const xhr = new XMLHttpRequest;
    xhr.open("GET", path, /* async = */ false);
    xhr.send();
  }
};

if (window.addEventListener) {
  window.addEventListener('message', icims_handlePostMessage, false);
} else if (window.attachEvent) {
  window.attachEvent('onmessage', icims_handlePostMessage);
}

function icims_handlePostMessage(event) {
  // If this is not a message from an icims domain, ignore it.
  if (event.origin.indexOf('icims.com', event.origin.length - 9) == -1) return;
  let data = null;


  try {
    data = ICIMS.jsonDecode(event.data);
  } catch (e) {}

  if (data == null && event.data != null) data = event.data;

  try {
    if ('height' in data) {
      if (!isNaN(data.height)) {
        document.getElementById('icims_content_iframe').height = parseInt(data.height) + 60;
      }
    } else if ('x' in data && 'y' in data) {
      if (!isNaN(data.x) && !isNaN(data.y)) {
        top.scrollTo(parseInt(data.x), parseInt(data.y));
      }
    }
  } catch (e) {}
}

function getCookie(name) {
  const match = document.cookie.match(`${name}=(.*?)(;|$)`);
  if (match) return unescape(match[1]);
  return '';
}

function updateUrl(url) {
  try {
    history.replaceState({}, '', url);
  } catch (e) {}
}

icimsAddOnload(() => {
  const icimsFrame = document.createElement('iframe');
  let iFrameHeight = 500;
  icimsFrame.id = 'icims_content_iframe';
  icimsFrame.name = 'icims_content_iframe';
  icimsFrame.src = 'https:\/\/careers-leggmason.icims.com\/jobs\/intro?hashed=-435768599&mobile=false&width=1140&height=500&bga=true&needsRedirect=false&jan1offset=-300&jun1offset=-240&in_iframe=1';
  icimsFrame.setAttribute('width', '100%');

  iFrameHeight = 500;

  icimsFrame.setAttribute('height', iFrameHeight);

  if (!useAutoScrolling && window.postMessage) {
    icimsFrame.setAttribute('scrolling', 'no');
  } else {
    icimsFrame.setAttribute('scrolling', 'auto');
  }

  icimsFrame.setAttribute('title', 'iCIMS Content iFrame');
  icimsFrame.setAttribute('marginwidth', '0');
  icimsFrame.setAttribute('marginheight', '0');
  icimsFrame.setAttribute('frameborder', '0');
  icimsFrame.onload = function () {
    try {
      window.parent.parent.scrollTo(0, 0);
    } catch (e) {}
  };

  document.getElementById('icims_iframe_span').appendChild(icimsFrame);
  try {
    var height = getCookie('cookie_icims_iframe_content_height');
    if (height > 0) style.height = `${height}px`;
  } catch (e) {}


  document.getElementById('icims_content_iframe').onreadystatechange = function () {
    try {
      if (this.readyState == 'interactive') {
        window.scroll(1, 1);
      }
    } catch (e) {}
  };

  try {
    var height = 0;
    if (navigator.userAgent.indexOf('Firefox') != -1) height = document.body.offsetHeight + 16;
    else height = document.body.scrollHeight;
    document.cookie = `cookie_icims_iframe_content_height=${height}; path=/;`;
  } catch (e) {}
});

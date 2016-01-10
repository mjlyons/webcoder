// This is a simple wrapper around XMLHttpRequest so that it can be unit tested.

class XMLHttpRequestWrap {
  constructor() {
    this.req = new XMLHttpRequest();
  }

  addEventListener(eventName, callback) {
    this.req.addEventListener(eventName, callback);
  }

  open(method, url) {
    this.req.open(method, url);
  }

  send() {
    this.req.send();
  }
}

module.exports = XMLHttpRequestWrap;

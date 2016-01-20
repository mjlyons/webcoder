// This is a simple wrapper around XMLHttpRequest so that it can be unit tested.

class XMLHttpRequestWrap {
  constructor(...funcArgs) {
    this.req = new XMLHttpRequest(...funcArgs);
  }

  addEventListener(...funcArgs) {
    this.req.addEventListener(...funcArgs);
  }

  open(...funcArgs) {
    this.req.open(...funcArgs);
  }

  send(...funcArgs) {
    this.req.send(...funcArgs);
  }

  setRequestHeader(...funcArgs) {
    this.req.setRequestHeader(...funcArgs);
  }

  abort(...funcArgs) {
    this.req.abort();
  }
}

module.exports = XMLHttpRequestWrap;

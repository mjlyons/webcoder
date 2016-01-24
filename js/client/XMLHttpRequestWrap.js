// This is a simple wrapper around XMLHttpRequest so that it can be unit tested.

class XMLHttpRequestWrap {
  constructor() {
    this.req = new XMLHttpRequest();
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
    this.req.abort(...funcArgs);
  }
}

module.exports = XMLHttpRequestWrap;

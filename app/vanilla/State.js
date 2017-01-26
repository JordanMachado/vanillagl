class State {
  constructor() {
    // all state
    this.capabilities = {};
    this.enabledAttributes = {};
  }
  enableAttribute(attribute) {
    if (this.enabledAttributes[attribute] !== true) {
      gl.enableVertexAttribArray(attribute);
      this.enabledAttributes[attribute] = true;

    }
  }
  disableAttribute(attribute) {
    if (this.enabledAttributes[attribute] !== false) {
      console.log('not enable yet');
      gl.disableVertexAttribArray(attribute);
    }
  }
  enable(id) {
    if (this.capabilities[id] !== true) {
      gl.enable(id);
      this.capabilities[id] = true;
    }
  }
  disable(id) {
    if (this.capabilities[id] !== false) {
      gl.disable(id);
      this.capabilities[id] = false;
    }
  }
}

const state = new State();
export default state;

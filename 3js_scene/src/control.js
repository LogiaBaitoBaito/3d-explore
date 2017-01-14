import dat from 'dat.gui/build/dat.gui.min';

export default class Control {

  constructor() {
    this._set  = this._set.bind(this);
    this.add = this.add.bind(this);
    this.set  = this.set.bind(this);
    this.get  = this.get.bind(this);
    this.addWithLimits = this.addWithLimits.bind(this);
    this.addWithListen = this.addWithListen.bind(this);
    this.addWithOptions = this.addWithOptions.bind(this);
    this.init = this.init.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);

    this.controls = {};
    this.cconfig = {};
    this.folders = {};
  }

  _set (control, value) {
    this.controls[control] = value;
  }

  add (control, value) {
    this._set(control, value);
  }

  addWithLimits(control, value, lower = 0, higher) {
    this.add(control, value);
    this.cconfig[control] = {
      lower: lower,
      higher: higher || value
    }
  }

  addWithListen (control, value) {
    this.add(control, value);
    this.cconfig[control] = {
      listen: true
    };
  }

  addWithOptions (control, value, options = {}) {
    this._set(control, value);
    this.cconfig[control] = { ...options };
  }

  addFolder (folder) {
    this.folders[folder] = null;
  }

  getFolder (folder) {
    return this.folders[folder];
  }

  get (control) {
    return this.controls[control];
  }

  set (control, value) {
    this._set(control, value);
    this.updateDisplay();
  }

  init() {
    this.gui = new dat.GUI();

    for (let folder in this.folders) {
      this.folders[folder] = this.gui.addFolder(folder);
    }

    for (let control in this.controls) {
      let guiParent;
      if (this.cconfig[control] && this.cconfig[control].folder !== undefined) {
        guiParent = this.folders[this.cconfig[control].folder];
      } else {
        guiParent = this.gui;
      }

      if (this.cconfig[control] && this.cconfig[control].lower !== undefined) {
        let { lower, higher} = this.cconfig[control];
        guiParent.add(this.controls, control, lower, higher);
      } else if (this.cconfig[control] && this.cconfig[control].listen === true) {
        guiParent.add(this.controls, control).listen();
      } else{
        guiParent.add(this.controls, control);
      }
    }
  }

  updateDisplay () {
    // Iterate over all controllers
    this.gui.__controllers.map ( (controller) => {
      controller.updateDisplay();
    });
  }

}

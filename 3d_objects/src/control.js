import dat from '../node_modules/dat.gui/build/dat.gui.min.js';

export default class Control {

  constructor() {
    this.add = this.add.bind(this);
    this.init = this.init.bind(this);

    this.controls = {};
  }

  add (control, value) {
    this.controls[control] = value;
  }

  get (control) {
    return this.controls[control];
  }

  init() {
    this.gui = new dat.GUI();

    for (let control in this.controls) {
      this.gui.add(this.controls, control, 0, 0.5);
    };
  }

}

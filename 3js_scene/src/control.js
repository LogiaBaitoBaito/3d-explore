import dat from 'dat.gui/build/dat.gui.min';

export default class Control {

  constructor() {
    this.add = this.add.bind(this);
    this.addWithLimits = this.addWithLimits.bind(this);
    this.init = this.init.bind(this);

    this.controls = {};
    this.cconfig = {};
  }

  add (control, value) {
    this.controls[control] = value;
  }

  addWithLimits(control, value, lower = 0, higher) {
    this.add(control, value);
    this.cconfig[control] = {
      lower: lower,
      higher: higher || value
    }
  }

  get (control) {
    return this.controls[control];
  }

  init() {
    this.gui = new dat.GUI();

    for (let control in this.controls) {
      if (this.cconfig[control] && this.cconfig[control].lower ) {
        this.gui.add(this.controls, control, lower, higher);
      } else {
        this.gui.add(this.controls, control);
      }
    };
  }

}

import {expect} from 'chai';
import Control from '../control';
import dat from '../../node_modules/dat.gui/build/dat.gui.min.js';

describe('Control', () => {

  let control;

  it('should create a instance', () => {
    control = new Control();

    expect(control).to.be.instanceof(Control);
    expect(control.get).to.be.a('function');
    expect(control.add).to.be.a('function');
    expect(control.init).to.be.a('function');
    expect(control.controls).to.be.a('object');
    expect(control.controls).to.be.empty;
  });

  it('should add controls', () => {
    control = new Control();
    control.add('dummyControl', 1);

    expect(control.controls).to.deep.equal({dummyControl: 1});
  });

  it('should get controls', () => {
    control = new Control();
    control.add('dummyControl', 1);

    let result = control.get('dummyControl');

    expect(control.controls).to.deep.equal({dummyControl: 1});
    expect(result).to.be.equal(1);

  });

  it('should init controls', () => {
    control = new Control();
    control.add('dummyControl', 1);

    control.init();

    expect(control.gui).to.be.instanceof(dat.GUI);
  });

});

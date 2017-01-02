import {expect} from 'chai';
import Control from '../control';
import dat from 'dat.gui/build/dat.gui.min';

describe('Control', () => {

  let control;

  it('#constructor - should create a instance', () => {
    control = new Control();

    expect(control).to.be.instanceof(Control);
    expect(control.get).to.be.a('function');
    expect(control.add).to.be.a('function');
    expect(control.init).to.be.a('function');
    expect(control.controls).to.be.a('object');
    expect(control.controls).to.be.empty;
    expect(control.cconfig).to.be.a('object');
    expect(control.cconfig).to.be.empty;
  });

  it('#add - should add controls', () => {
    control = new Control();
    control.add('dummyControl', 1);

    expect(control.controls).to.deep.equal({dummyControl: 1});
    expect(control.cconfig).to.be.empty;
  });

  it('#addWithLimits - should add with limits', () => {
    control = new Control();
    control.addWithLimits('dummyControl', 1, 1, 2);

    expect(control.controls).to.deep.equal({dummyControl: 1});
    expect(control.cconfig).to.deep.equal({dummyControl:{lower:1,higher:2}});
  });

  it('#addWithLimits - should add with default limits', () => {
    control = new Control();
    control.addWithLimits('dummyControl', 2);

    expect(control.controls).to.deep.equal({dummyControl: 2});
    expect(control.cconfig).to.deep.equal({dummyControl:{lower:0,higher:2}});
  });

  it('#get - should get controls', () => {
    control = new Control();
    control.add('dummyControl', 1);

    let result = control.get('dummyControl');

    expect(control.controls).to.deep.equal({dummyControl: 1});
    expect(result).to.be.equal(1);
  });

  it('#set - should set new value to control', () => {
    __given: 
    control = new Control();
    control.add('dummyControl', 1);
    expect(control.controls).to.deep.equal({dummyControl: 1});

    __then:
    control.set('dummyControl', 2);

    _expect:
    let result = control.get('dummyControl');
    expect(control.controls).to.deep.equal({dummyControl: 2});
    expect(result).to.be.equal(2);
  });

  it('#init - should init controls', () => {
    control = new Control();
    control.add('dummyControl', 1);
    control.addWithLimits('dummyControl2', 2, 0, 5);

    control.init();

    expect(control.gui).to.be.instanceof(dat.GUI);
  });

});

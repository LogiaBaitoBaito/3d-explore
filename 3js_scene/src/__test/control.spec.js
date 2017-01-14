import {expect} from 'chai';
import sinon from 'sinon';
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
    expect(control.folders).to.be.a('object');
    expect(control.folders).to.be.empty;
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

  it('#addWithListen - should add with listen', () => {
    // given:
    control = new Control();
    // then:
    control.addWithListen('dummyControl', 2);
    // when:
    expect(control.controls).to.deep.equal({dummyControl: 2});
    expect(control.cconfig).to.deep.equal({dummyControl:{listen:true}});
  });

  it('#addWithOptions - should add with options', () => {
    // given:
    control = new Control();
    // then:
    control.addWithOptions('dummyControl', 2, { option1: 'value1', option2: 'value2'});
    // when:
    expect(control.controls).to.deep.equal({dummyControl: 2});
    expect(control.cconfig).to.deep.equal({dummyControl:{option1:'value1',option2:'value2'}});
  });

  it('#addWithOptions - should add with default options', () => {
    // given:
    control = new Control();
    // then:
    control.addWithOptions('dummyControl', 2);
    // when:
    expect(control.controls).to.deep.equal({dummyControl: 2});
    expect(control.cconfig).to.deep.equal({dummyControl:{}});
  });

  it('#addFolder - should add folder', () => {
    // given:
    control = new Control();
    // then:
    control.addFolder('dummyFolder');
    // when:
    expect(control.folders).to.deep.equal({dummyFolder: null});
  });

  it('#get - should get controls', () => {
    control = new Control();
    control.add('dummyControl', 1);

    let result = control.get('dummyControl');

    expect(control.controls).to.deep.equal({dummyControl: 1});
    expect(result).to.be.equal(1);
  });

  it('#getFolder - should get folder', () => {
    // given:
    control = new Control();
    control.addFolder('dummyFolder');
    let expectedFolder = { folder: true };
    control.folders['dummyFolder'] = expectedFolder;

    // then:
    let result = control.getFolder('dummyFolder');

    // when:
    expect(result).to.equal(expectedFolder);
  });

  it('#set - should set new value to control', () => {
    // given:
    control = new Control();
    let controlSpy = sinon.stub(control, 'updateDisplay');
    control.add('dummyControl', 1);
    expect(control.controls).to.deep.equal({dummyControl: 1});

    // when:
    control.set('dummyControl', 2);

    // then:
    let result = control.get('dummyControl');
    expect(control.controls).to.deep.equal({dummyControl: 2});
    expect(result).to.be.equal(2);
    expect(controlSpy).to.be.called;

    controlSpy.restore();
  });

  it('#init - should init controls', () => {
    // given:
    control = new Control();
    control.add('dummyControl', 1);
    control.addWithLimits('dummyControl2', 2, 0, 5);
    control.addWithListen('dummyControl2', 2);
    // then:
    control.init();
    // when:
    expect(control.gui).to.be.instanceof(dat.GUI);
  });

  it('#updateDisplay - should updateDisplay', () => {
    let spyUpdate;
    // given
      spyUpdate = sinon.spy();
      control = new Control();
      control.gui = {};
      control.gui.__controllers = [ {
        property: 'controller',
        updateDisplay: spyUpdate
      }];

    // when:
      control.updateDisplay();

    // then:
      expect(spyUpdate).to.be.called;
  });

});

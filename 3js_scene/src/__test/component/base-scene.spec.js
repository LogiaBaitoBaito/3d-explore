import {expect} from 'chai';
import sinon from 'sinon';
import * as THREE from 'three';
import Control from '../../control';
import StatsPanel from '../../stats';
import dat from 'dat.gui/build/dat.gui.min';

import BaseScene from '../../component/base-scene';

describe('BaseScene', () => {

  let sandbox;
  let baseScene;
  let w = 1024, h = 768;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  after(() => {
    sandbox.restore();
  });

  it('Struct - should create the object structure', () => {
    // given:
    // then:
    baseScene = new BaseScene(w,h);

    // when:
    expect(baseScene).to.be.instanceof(BaseScene);
    // and:
    expect(baseScene.init).to.be.a('function');
    expect(baseScene.resize).to.be.a('function');
    expect(baseScene.domElement).to.be.a('function');
    expect(baseScene.render).to.be.a('function');
    expect(baseScene.controls).to.be.a('function');
    expect(baseScene.addControls).to.be.a('function');
    expect(baseScene.draw).to.be.a('function');
    expect(baseScene.animate).to.be.a('function');
    expect(baseScene.renderControls).to.be.a('function');

  });

  it('#constructor - should create a new 3D Base Scene', () => {
    // given:

    // then:
    baseScene = new BaseScene(w,h);

    // when:
    expect(baseScene.width).to.be.equal(w);
    expect(baseScene.height).to.be.equal(h);
    // and:
    expect(baseScene._renderer).to.be.null;
    expect(baseScene._camera).to.be.null;
    expect(baseScene._scene).to.be.null;
    expect(baseScene._statsPanel).to.be.instanceof(StatsPanel);
  });

  it.skip('#init - should init the 3D Basic Scene', () => {
    // setup
    let THREESpy = sandbox.stub(THREE);

    // given
    baseScene = new BaseScene(w,h);


    // when:
    baseScene.init();

    // then:

  });

  it('#controls - should define scene controls', () => {
    baseScene = new BaseScene(w, h);
    let children = [ {first:1}];
    baseScene._scene = { children };

    baseScene.controls();

    expect(baseScene.control).to.exists;
    expect(baseScene.control).to.be.instanceof(Control);
    expect(baseScene.control.gui).to.be.instanceof(dat.GUI);
  });

  it('#drawPlane - show draw plane', () => {
    // setup:
    let planeGeomSpy = sandbox.stub(THREE, 'PlaneGeometry');
    planeGeomSpy.returns({
      parameters: {
        width: w,
        height: h
      }
    });
    let planeSpy = sandbox.stub(THREE, 'Mesh');
    planeSpy.returns({
      position:{},
      rotation:{}
    });

    // given:
    baseScene = new BaseScene(w, h);

    // then:
    let result = baseScene.drawPlane();

    // when:
    expect(baseScene._planeGeometry).to.be.deep.equal({ params: {width:w, height:h}});
    expect(result).to.be.deep.equal({
      receiveShadow: true,
      rotation:{ x: -0.5*Math.PI },
      position:{ x:0, y:0, z:0 }
    });

  });

  it('#drawSpotLight - should return spotLight', () => {
    // setup:
    let setStub = sandbox.stub();
    setStub.withArgs(-40, 60, -10);
    let spotSpy = sandbox.stub(THREE, 'SpotLight');
    spotSpy.withArgs( 0xffffff );
    spotSpy.returns({
      position: {
        set : setStub
      },
      shadow: { mapSize: {}}
    });

    // given:
    baseScene = new BaseScene();

    // then:
    let result = baseScene.drawSpotLight();

    // when:
    expect(result).to.have.property('castShadow', true);
    expect(result).to.have.property('shadow')
                      .that.is.an('object')
                      .that.deep.equals({ mapSize:{ width: 1536, height:1536 }});
    expect(setStub).to.have.been.called;
  });

  it('#resize - should resize the scene', () => {
    let w2 = 1280;
    let h2 = 720;

    let setSizeStub = sandbox.stub();
    setSizeStub.withArgs(w2, h2);
    let rendererSpy = {
      setSize: setSizeStub
    };
    let updateProjectionStub = sandbox.stub();
    let cameraSpy = {
      aspect: w2/h2,
      updateProjectionMatrix: updateProjectionStub
    };

    // given:
    baseScene = new BaseScene(w,h);
    expect(baseScene.width).to.be.equal(w);
    expect(baseScene.height).to.be.equal(h);
    baseScene._renderer = rendererSpy;
    baseScene._camera = cameraSpy;

    // then:
    baseScene.resize(w2,h2);

    // when:
    expect(baseScene.width).to.be.equal(w2);
    expect(baseScene.height).to.be.equal(h2);
    // and:

  });

  it('#domElement - should return domElement', () => {
    // given:
    baseScene = new BaseScene(w,h);
    baseScene._renderer = {
      domElement : 'domElement'
    };

    // then:
    let result = baseScene.domElement();

    // when:
    expect(result).to.be.equal('domElement');

  });

});

import {expect} from 'chai';
import sinon from 'sinon';
import * as THREE from 'three';
import Control from '../control';
import StatsPanel from '../stats';
import dat from 'dat.gui/build/dat.gui.min';

import BasicScene from '../basic-scene';

describe('BasicScene', () => {

  let sandbox;
  let basicScene;
  let w = 1024, h = 768;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  after(() => {
    sandbox.restore();
  });

  it('#constructor - should create a new 3D Basic Scene', () => {
    // given:
    let w = 1024, h = 768;

    // then:
    basicScene = new BasicScene(w,h);

    // when:
    expect(basicScene).to.be.instanceof(BasicScene);
    expect(basicScene.init).to.be.a('function');
    expect(basicScene.resize).to.be.a('function');
    expect(basicScene.domElement).to.be.a('function');
    // and:
    expect(basicScene.width).to.be.equal(w);
    expect(basicScene.height).to.be.equal(h);
    // and:
    expect(basicScene._renderer).to.be.null;
    expect(basicScene._camera).to.be.null;
    expect(basicScene._scene).to.be.null;
    expect(basicScene._statsPanel).to.be.instanceof(StatsPanel);
  });

  it.skip('#init - should init the 3D Basic Scene', () => {
    // setup
    let THREESpy = sandbox.stub(THREE);

    // given
    basicScene = new BasicScene(w,h);


    // when:
    basicScene.init();

    // then:

  });

  it('#controls - should define scene controls', () => {
    basicScene = new BasicScene(w, h);
    let children = [ {first:1}];
    basicScene._scene = { children };

    basicScene.controls();

    expect(basicScene.control).to.exists;
    expect(basicScene.control).to.be.instanceof(Control);
    expect(basicScene.control.controls).to.have.property('rotationSpeed', 0.02);
    expect(basicScene.control.cconfig).to.have.property('rotationSpeed')
                                      .that.is.an('object')
                                      .that.deep.equals({lower:0, higher:0.5});
    expect(basicScene.control.controls).to.have.property('addCube', basicScene.addCube);
    expect(basicScene.control.controls).to.have.property('removeCube', basicScene.eraseCube);
    expect(basicScene.control.controls).to.have.property('outputObjects');
    expect(basicScene.control.controls).to.have.property('numberOfObjects');
    expect(basicScene.control.cconfig).to.have.property('numberOfObjects')
                                      .that.is.an('object')
                                      .that.deep.equals({listen:true});
    expect(basicScene.control.gui).to.be.instanceof(dat.GUI);
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
    basicScene = new BasicScene(w, h);

    // then:
    let result = basicScene.drawPlane();

    // when:
    expect(basicScene._planeGeometry).to.be.deep.equal({ params: {width:w, height:h}});
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
    basicScene = new BasicScene();

    // then:
    let result = basicScene.drawSpotLight();

    // when:
    expect(result).to.have.property('castShadow', true);
    expect(result).to.have.property('shadow')
                      .that.is.an('object')
                      .that.deep.equals({ mapSize:{ width: 1536, height:1536 }});
    expect(setStub).to.have.been.called;
  });

});

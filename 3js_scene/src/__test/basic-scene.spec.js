import {expect} from 'chai';
import BasicScene from '../basic-scene';

describe('BasicScene', () => {

  let basicScene;

  it('should create a new 3D Basic Scene', () => {
    let w = 1024, h = 768;
    basicScene = new BasicScene(w,h);

    expect(basicScene).to.be.instanceof(BasicScene);
    expect(basicScene.init).to.be.a('function');
    expect(basicScene.resize).to.be.a('function');
    expect(basicScene.domElement).to.be.a('function');

    expect(basicScene.width).to.be.equal(w);
    expect(basicScene.height).to.be.equal(h);
  });

});

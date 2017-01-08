import * as THREE from 'three';
import BaseScene  from './base-scene';

export default class CustomGeometry  extends BaseScene {

  constructor(w, h) {
    super(w,h);
  }

  addControls() {
    this.control.add('outputObjects', () => {
      console.log(this._scene.children);
    });
    this.control.add('camera-x', -50);
    this.control.add('camera-y', 30);
    this.control.add('camera-z', 20);
    this.control.addWithListen('numberOfObjects', this._scene.children.length);
  }

  drawGeometry () {
    let geoms = [];

    // Cube (b , w, h)
    geoms.push(new THREE.BoxGeometry(2, 2, 2));

    // draw in scene
    let col = 0;
    geoms.map( (geom, index) => {
      let materials = [
        new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, shading: THREE.FlatShading }),
        new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000})
      ];

      let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
      mesh.traverse( (element) => element.castShadow = true );

      mesh.position.x = -24 + ((index % 4) * 12);
      mesh.position.y = 4;
      mesh.position.z = -8 + (col * 12);

      if ((index+1) % 4 === 0) col++;
      this._scene.add(mesh);
    });

    return geoms;
  }

  draw() {
    super.draw();
    this.drawGeometry();
  }

  renderControls() {
    this._camera.position.x = this.control.get('camera-x');
    this._camera.position.y = this.control.get('camera-y');
    this._camera.position.z = this.control.get('camera-z');
  }

}

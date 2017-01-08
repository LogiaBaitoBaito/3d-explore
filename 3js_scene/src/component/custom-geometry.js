import * as THREE from 'three';
import BaseScene  from './base-scene';

export default class CustomGeometry  extends BaseScene {

  constructor(w, h) {
    super(w,h);
  }

  addControls() {

    let addPosition = (x, y, z) => {
      return { x, y, z };
    }
    let controlPoints = [];
    controlPoints.push(addPosition(3, 5, 3));
    controlPoints.push(addPosition(3, 5, 0));
    controlPoints.push(addPosition(3, 0, 3));
    controlPoints.push(addPosition(3, 0, 0));
    controlPoints.push(addPosition(0, 5, 0));
    controlPoints.push(addPosition(0, 5, 3));
    controlPoints.push(addPosition(0, 0, 0));
    controlPoints.push(addPosition(0, 0, 3));

    controlPoints.map( (point, i) => {
      this.control.addWithLimits(`Vertice ${i} x`, point.x, -10, 10);
      this.control.addWithLimits(`Vertice ${i} y`, point.y, -10, 10);
      this.control.addWithLimits(`Vertice ${i} z`, point.z, -10, 10);
    });
  }

  drawGeometry () {

    let vertices = [
      new THREE.Vector3(1, 3, 1),
      new THREE.Vector3(1, 3, -1),
      new THREE.Vector3(1, -1, 1),
      new THREE.Vector3(1, -1, -1),
      new THREE.Vector3(-1, 3, -1),
      new THREE.Vector3(-1, 3, 1),
      new THREE.Vector3(-1, -1, -1),
      new THREE.Vector3(-1, -1, 1)
    ];

    let faces = [
      new THREE.Face3(0, 2, 1),
      new THREE.Face3(2, 3, 1),
      new THREE.Face3(4, 6, 5),
      new THREE.Face3(6, 7, 5),
      new THREE.Face3(4, 5, 1),
      new THREE.Face3(5, 0, 1),
      new THREE.Face3(7, 6, 2),
      new THREE.Face3(6, 3, 2),
      new THREE.Face3(5, 7, 0),
      new THREE.Face3(7, 2, 0),
      new THREE.Face3(1, 3, 4),
      new THREE.Face3(3, 6, 4),
    ];

    let geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();

    let materials = [
      new THREE.MeshLambertMaterial({
        opacity:0.6,
        color: 0x44ff44,
        transparent: true}),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0x000000})
    ];

    // draw in scene
    let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
    mesh.traverse( (element) => element.castShadow = true );

    this._scene.add(mesh);

    return geom;
 }

  positionScene () {
    this._plane.rotation.x = -0.5 * Math.PI;
    this._plane.position.x = 0;
    this._plane.position.y = 0;
    this._plane.position.z = 0;

    this._camera.position.x = -20;
    this._camera.position.y = 25;
    this._camera.position.z = 20;
    this._camera.lookAt(new THREE.Vector3(5, 0, 0));
  }

  draw() {
    super.draw();
    this.positionScene();
    this.drawGeometry();
  }

  renderControls() {
    //this._camera.position.x = this.control.get('camera-x');
    //this._camera.position.y = this.control.get('camera-y');
    //this._camera.position.z = this.control.get('camera-z');
  }

}

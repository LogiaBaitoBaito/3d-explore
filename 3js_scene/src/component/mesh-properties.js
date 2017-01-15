import * as THREE from 'three';
import BaseScene  from './base-scene';

export default class MeshProperties extends BaseScene {

  constructor(w, h) {
    super(w,h);
  }

  addControls() {
    //let folder = `Vertice ${i}`;
    //let options = {
      //lower: -10,
      //higher: 10,
      //folder: folder
    //};
    //this.control.addFolder(folder);
    //this.control.addWithOptions(`${i}.x`, point.x, options);
    //this.control.addWithOptions(`${i}.y`, point.y, options);
    //this.control.addWithOptions(`${i}.z`, point.z, options);
  }

  drawCube () {
    let material = new THREE.MeshLambertMaterial({
        opacity:0.6,
        color: 0x44ff44,
        transparent: true});

    let geom = new THREE.BoxGeometry(5, 8, 3);
    this.cube = new THREE.Mesh(geom, material);
    this.cube.position.y = 4;
    this.cube.castShadow = true;

    this._scene.add(this.cube);

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
    this.drawCube();
  }

  drawPoint(x, y, z) {
    let dotGeometry = new THREE.Geometry();
    dotGeometry.vertices.push(new THREE.Vector3( x, y, z));
    let dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
    let dot = new THREE.Points( dotGeometry, dotMaterial );
    this._scene.add( dot );
  }

  renderControls() {
  }

}

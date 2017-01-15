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
      let folder = `Vertice ${i}`;
      let options = {
        lower: -10,
        higher: 10,
        folder: folder
      };
      this.control.addFolder(folder);
      this.control.addWithOptions(`${i}.x`, point.x, options);
      this.control.addWithOptions(`${i}.y`, point.y, options);
      this.control.addWithOptions(`${i}.z`, point.z, options);
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

    this.geometry = new THREE.Geometry();
    this.geometry.vertices = vertices;
    this.geometry.faces = faces;
    this.geometry.computeFaceNormals();

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
    this.mesh = THREE.SceneUtils.createMultiMaterialObject(this.geometry, materials);
    this.mesh.traverse( (element) => element.castShadow = true );

    this._scene.add(this.mesh);

    return this.geometry;
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

  drawPoint(x, y, z) {
    let dotGeometry = new THREE.Geometry();
    dotGeometry.vertices.push(new THREE.Vector3( x, y, z));
    let dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
    let dot = new THREE.Points( dotGeometry, dotMaterial );
    this._scene.add( dot );
  }

  renderControls() {
    this.mesh.children.map((child) => {
      child.dynamic = true;
      child.geometry.vertices.map((v,i) => {
        let point = [
          this.control.get(`${i}.x`),
          this.control.get(`${i}.y`),
          this.control.get(`${i}.z`)
        ];
        this.drawPoint(...point);
        v.set(...point);
      });
      child.geometry.verticesNeedUpdate = true;
    });
  }

}

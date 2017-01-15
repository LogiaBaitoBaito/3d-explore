import * as THREE from 'three';
import BaseScene  from './base-scene';

export default class MeshProperties extends BaseScene {

  constructor(w, h) {
    super(w,h);

    this.translateCube = this.translateCube.bind(this);
  }

  addControls() {

    let scale = 'scale';
    let options = {
      folder: scale,
      lower: 0,
      higher: 5
    };
    this.control.addFolder(scale);
    this.control.addWithOptions('scale.x', 1, options);
    this.control.addWithOptions('scale.y', 1, options);
    this.control.addWithOptions('scale.z', 1, options);

    let position = 'position';
    options = {
      lower: -10,
      higher: 10,
      folder: position,
      listen: true
    };
    this.control.addFolder(position);
    this.control.addWithOptions('position.x', 0, {
      onChange : function(value) {
        this.cube.position.x = value;
      },
      ...options });
    this.control.addWithOptions('position.y', 4, {
      lower: -4, higher: 20,
      onChange: function(value) {
        this.cube.position.y = value;
      },
      ...options });
    this.control.addWithOptions('position.z', 0, {
      onChange: function(value) {
        this.cube.position.z = value;
      },
      ...options });

    let rotation = 'rotation';
    options = {
      folder: rotation,
      lower: -4,
      higher: 4
    };
    this.control.addFolder(rotation);
    this.control.addWithOptions('rotation.x', 0, options);
    this.control.addWithOptions('rotation.y', 0, options);
    this.control.addWithOptions('rotation.z', 0, options);

    let translateGroup = 'translate';
    options = {
      folder : translateGroup,
      lower: -10,
      higher: 10
    };
    this.control.addFolder(translateGroup);
    this.control.addWithOptions('translate.x', 0, options);
    this.control.addWithOptions('translate.y', 0, options);
    this.control.addWithOptions('translate.z', 0, options);

    this.control.addWithOptions('translate', this.translateCube, {folder: translateGroup});

    this.control.add('visible', true);
  }

  translateCube () {
    this.cube.translateX(this.control.get('translate.x'));
    this.cube.translateY(this.control.get('translate.y'));
    this.cube.translateZ(this.control.get('translate.z'));

    this.control.set('position.x', this.cube.position.x);
    this.control.set('position.y', this.cube.position.y);
    this.control.set('position.z', this.cube.position.z);
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
    this.cube.visible = this.control.get('visible');
    this.cube.rotation.x = this.control.get('rotation.x');
    this.cube.rotation.y = this.control.get('rotation.y');
    this.cube.rotation.z = this.control.get('rotation.z');

    this.cube.scale.set(
      this.control.get('scale.x'),
      this.control.get('scale.y'),
      this.control.get('scale.z'));
  }

}

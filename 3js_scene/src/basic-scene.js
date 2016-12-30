import * as THREE from 'three';
import {initStats, updateStats} from './stats.js';
import Control from './control.js';

export default class BasicScene {

  constructor(w, h) {
    this.width = w;
    this.height = h;

    this.init = this.init.bind(this);
    this.draw = this.draw.bind(this);
    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);
    this.animate = this.animate.bind(this);
    this.controls = this.controls.bind(this);

    this._renderer = null;
    this._camera = null;
    this._scene = null;
  }

  init() {
    this._scene = new THREE.Scene;
    this._camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setSize(this.width, this.height);
    this._renderer.setPixelRatio( window.devicePixelRatio );
    this._renderer.setClearColor(0xEEEEEE, 1.0);
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.draw();

    this._camera.position.x = -30;
    this._camera.position.y = 40;
    this._camera.position.z = 30;
    this._camera.lookAt(this._scene.position);

    this._scene.add(this._camera);

    this.controls();

    this.render();

    initStats();
  }

  controls() {
    this.control = new Control();
    this.control.addWithLimits('rotationSpeed', 0.02, 0, 0.5);
    this.control.init();
  }


  drawPlane () {

    let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    return plane;
  }

  drawSpotLight () {
    let spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1536;
    spotLight.shadow.mapSize.height = 1536;

    return spotLight;
  };

  drawCube () {

    //var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
    //var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000});
    //var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    //cube.position.x = -4;
    //cube.position.y = 3;
    //cube.position.z = 0;

    //cube.castShadow = true;
    //this._scene.add(cube);

  };


  draw() {
    this._plane = this.drawPlane();
    this._scene.add(this._plane);

    let ambientLight = new THREE.AmbientLight(0x0c0c0c);
    this._scene.add(ambientLight);

    let spotLight = this.drawSpotLight();
    this._scene.add(spotLight);
  }

  animate() {

    this._scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj != this._plane) {
        obj.rotation.x += this.control.get('rotationSpeed');
        obj.rotation.y += this.control.get('rotationSpeed');
        obj.rotation.z += this.control.get('rotationSpeed');
      }
    });

  }

  render() {
    updateStats();

    this.animate();

    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(this.render);
  }

  resize(w, h) {
    this.width = w;
    this.height = h;
    this._renderer.setSize( this.width, this.height );
    this._camera.aspect = this.width / this.height;
    this._camera.updateProjectionMatrix();
  }

  domElement() {
    return this._renderer.domElement;
  }

}

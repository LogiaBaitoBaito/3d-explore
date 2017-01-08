import * as THREE from 'three';
import StatsPanel from '../stats.js';
import Control from '../control.js';

export default class BaseScene {

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
    this._statsPanel = new StatsPanel();
  }

  initScene() {
    if (null != this._scene) {
      return;
    }
    this._scene = new THREE.Scene;
  }

  initRenerer() {
    if (null != this._renderer) {
      return;
    }
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    this._renderer.setSize(this.width, this.height);
    this._renderer.setPixelRatio( window.devicePixelRatio );
    this._renderer.setClearColor(0xEEEEEE, 1.0);
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  initCamera() {
    if (null != this._camera) {
      return;
    }
    this._camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this._camera.position.x = -50;
    this._camera.position.y = 30;
    this._camera.position.z = 20;
    this._camera.lookAt(new THREE.Vector3(-10, 0, 0));
    this._scene.add(this._camera);
  }

  init() {
    this.initScene();
    this.initRenerer();
    this.initCamera();

    this.draw();

    this.controls();

    this._statsPanel.initStats();

    this.render();
  }

  addControls() {
  }

  controls() {
    this.control = new Control();
    this.addControls();
    this.control.init();
  }

  drawPlane () {
    let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    this._planeGeometry = {
      params: {
        width: planeGeometry.parameters.width,
        height: planeGeometry.parameters.height
      }
    };
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
    spotLight.position.set( -40, 40, 50 );

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1536;
    spotLight.shadow.mapSize.height = 1536;

    return spotLight;
  };

  draw() {
    this._plane = this.drawPlane();
    this._scene.add(this._plane);

    let ambientLight = new THREE.AmbientLight(0x090909);
    this._scene.add(ambientLight);

    let spotLight = this.drawSpotLight();
    this._scene.add(spotLight);

  }

  animate() {
  }


  renderControls() {
  }

  render() {
    this._statsPanel.updateStats();

    this.animate();

    this.renderControls();

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

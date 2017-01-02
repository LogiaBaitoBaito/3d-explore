import * as THREE from 'three';
import StatsPanel from './stats.js';
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
    this.addCube = this.addCube.bind(this);
    this.eraseCube = this.eraseCube.bind(this);

    this._renderer = null;
    this._camera = null;
    this._scene = null;
    this._statsPanel = new StatsPanel();
  }

  init() {
    this._scene = new THREE.Scene;
    this._scene.fog = new THREE.Fog( 0xffffff, 0.015, 100);
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

    this._statsPanel.initStats();

    this.render();
  }

  controls() {
    this.control = new Control();
    this.control.addWithLimits('rotationSpeed', 0.02, 0, 0.5);
    this.control.add('addCube', this.addCube );
    this.control.add('removeCube', this.eraseCube );
    this.control.add('outputObjects', () => {
      console.log(this._scene.children);
    });
    this.control.addWithListen('numberOfObjects', this._scene.children.length);
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
    spotLight.position.set( -40, 60, -10 );

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1536;
    spotLight.shadow.mapSize.height = 1536;

    return spotLight;
  };

  addCube () {

    let cubeSize = Math.ceil((Math.random() * 3));
    let cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff });
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = 'cube-' + this._scene.children.length;

    cube.position.x = -30 + Math.round((Math.random() * this._planeGeometry.params.width));
    cube.position.y = Math.round((Math.random() * 5));
    cube.position.z = -20 + Math.round((Math.random() * this._planeGeometry.params.height));
    this._scene.add(cube);
    console.log(this._scene.children.length);
    this.control.set('numberOfObjects', this._scene.children.length);
  }

  eraseCube () {
    let allChildren = this._scene.children;
    let lastObject = allChildren[allChildren.length -1];
    if (lastObject instanceof THREE.Mesh) {
      this._scene.remove(lastObject);
      this.control.set('numberOfObjects', this._scene.children.length);
    }
  }

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
    this._statsPanel.updateStats();

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

import * as THREE from 'three';
import 'three/examples/js/geometries/ConvexGeometry.js';
import 'three/examples/js/ParametricGeometries.js';
import StatsPanel from './stats.js';
import Control from './control.js';

export default class MultiGeometry {

  constructor(w, h) {
    this.width = w;
    this.height = h;

    this.init = this.init.bind(this);
    this.draw = this.draw.bind(this);
    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);
    this.animate = this.animate.bind(this);
    this.controls = this.controls.bind(this);
    this.drawGeometries = this.drawGeometries.bind(this);

    this._renderer = null;
    this._camera = null;
    this._scene = null;
    this._statsPanel = new StatsPanel();
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

    this._camera.position.x = -50;
    this._camera.position.y = 30;
    this._camera.position.z = 20;
    this._camera.lookAt(new THREE.Vector3(-10, 0, 0));

    this._scene.add(this._camera);

    this.controls();

    this._statsPanel.initStats();

    this.render();
  }

  controls() {
    this.control = new Control();
    this.control.addWithLimits('rotationSpeed', 0.05, 0, 0.2);
    this.control.add('outputObjects', () => {
      console.log(this._scene.children);
    });
    this.control.add('camera-x', -50);
    this.control.add('camera-y', 30);
    this.control.add('camera-z', 20);
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
    spotLight.position.set( -40, 40, 50 );

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1536;
    spotLight.shadow.mapSize.height = 1536;

    return spotLight;
  };

  drawGeometries () {
    let geoms = [];

    // Cylinder (r1, r2, h)
    geoms.push(new THREE.CylinderGeometry(1,4,4));

    // Cube (b , w, h)
    geoms.push(new THREE.BoxGeometry(2, 2, 2));

    // basic spherer (r)
    geoms.push(new THREE.SphereGeometry(2));

    // create a convex shape (a shape without dents)
    // using a couple of points
    // for instance a cube
    var points = [
      new THREE.Vector3(2, 2, 2),
      new THREE.Vector3(2, 2, -2),
      new THREE.Vector3(-2, 2, -2),
      new THREE.Vector3(-2, 2, 2),
      new THREE.Vector3(2, -2, 2),
      new THREE.Vector3(2, -2, -2),
      new THREE.Vector3(-2, -2, -2),
      new THREE.Vector3(-2, -2, 2)
    ];
    geoms.push(new THREE.ConvexGeometry(points));

    // create a lathgeometry
    //http://en.wikipedia.org/wiki/Lathe_(graphics)
    let pts = [];//points array - the path profile points will be stored here
    let detail = .1;//half-circle detail - how many angle increments will be used to generate points
    let radius = 3;//radius for half_sphere
    for (let angle = 0.0; angle < Math.PI; angle += detail) { //loop from 0.0 radians to PI (0 - 180 degrees)
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));//angle/radius to x,z
    }
    geoms.push(new THREE.LatheGeometry(pts, 12));


    // create a OctahedronGeometry
    geoms.push(new THREE.OctahedronGeometry(3));

    // create a geometry based on a function
    geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10));

    geoms.push(new THREE.TetrahedronGeometry(3));

    geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));

    geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

    geoms.push(new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 25, 25 ));


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
    this._plane = this.drawPlane();
    this._scene.add(this._plane);

    let ambientLight = new THREE.AmbientLight(0x090909);
    this._scene.add(ambientLight);

    let spotLight = this.drawSpotLight();
    this._scene.add(spotLight);

    this.drawGeometries();
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

    this._camera.position.x = this.control.get('camera-x');
    this._camera.position.y = this.control.get('camera-y');
    this._camera.position.z = this.control.get('camera-z');

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

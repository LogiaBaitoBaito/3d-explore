/**
 * Three.js library
 *
 * Tutorial: https://code.tutsplus.com/tutorials/webgl-with-threejs-basics--net-35688
 */

import * as THREE from 'three';
import {initStats, updateStats} from './stats.js';
import Control from './control.js';

'use strict';

var renderer;
var camera;
var scene;

window.onload = () => {

  var width = window.innerWidth;
  var height = window.innerHeight;

  scene = new THREE.Scene;
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor(0xEEEEEE, 1.0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  scene.add(camera);

  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( -40, 60, -10 );

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1536;
  spotLight.shadow.mapSize.height = 1536;

  scene.add(spotLight);


  //var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
  //var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000});
  //var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  //cube.position.x = -4;
  //cube.position.y = 3;
  //cube.position.z = 0;

  //cube.castShadow = true;
  //scene.add(cube);

  let control = new Control();
  control.add('rotationSpeed', 0.02);
  control.init();

  const render = () => {
    updateStats();

    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj != plane) {
        obj.rotation.x += control.get('rotationSpeed');
        obj.rotation.y += control.get('rotationSpeed');
        obj.rotation.z += control.get('rotationSpeed');
      }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();


  document.body.appendChild(renderer.domElement);

  window.addEventListener( 'resize' , onWindowResize, false );

  initStats();

};

function onWindowResize() {
  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
}

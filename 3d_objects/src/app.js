/**
 * Three.js library
 *
 * Tutorial: https://code.tutsplus.com/tutorials/webgl-with-threejs-basics--net-35688
 */

import { WebGLRenderer, Scene, CubeGeometry, MeshBasicMaterial, Clock, BackSide,
  PointLight, MeshLambertMaterial, Mesh, PerspectiveCamera } from 'three';

  'use strict';


  var width = window.innerWidth;
  var height = window.innerHeight;

  var renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);

  var scene = new Scene;


  var cubeGeometry = new CubeGeometry(100, 100, 100);
  var cubeMaterial = new MeshLambertMaterial({ color: 0x1ec876 });
  var cube = new Mesh(cubeGeometry, cubeMaterial);

  cube.rotation.y = Math.PI * 45 / 180;

  scene.add(cube);

  var camera = new PerspectiveCamera(45, width / height, 0.1, 10000);

  camera.position.y = 160;
  camera.position.z = 400;

  scene.add(camera);

  var clock = new Clock;

  function render() {
    renderer.render(scene, camera);

    cube.rotation.y -= clock.getDelta();
    requestAnimationFrame(render);
  }
  render();


  camera.lookAt(cube.position);

  var skyboxGeometry = new CubeGeometry(10000, 10000, 10000);
  var skyboxMaterial = new MeshBasicMaterial({ color: 0x000000, side: BackSide });
  var skybox = new Mesh(skyboxGeometry, skyboxMaterial);

  scene.add(skybox);

  var pointLight = new PointLight(0xffffff);
  pointLight.position.set(0, 300, 200);

  scene.add(pointLight);


  document.body.appendChild(renderer.domElement);


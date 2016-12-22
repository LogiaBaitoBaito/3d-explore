/**
 * Three.js library
 *
 * Tutorial: https://code.tutsplus.com/tutorials/webgl-with-threejs-basics--net-35688
 */

import * as THREE from 'three';

  'use strict';

window.onload = () => {

  var width = window.innerWidth;
  var height = window.innerHeight;

  var scene = new THREE.Scene;
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xEEEEEE, 1.0);

  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  var planeMaterial = new THREE.MeshBasicMaterial({color: 0xCCCCCC});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0; 

  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe:true });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;

  scene.add(sphere);

  var render = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };
  render();

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  scene.add(camera);

  document.body.appendChild(renderer.domElement);

};

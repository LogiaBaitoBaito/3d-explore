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
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0xCCCCCC});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  plane.receiveShadow = true;
  scene.add(plane);

  var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000});
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0; 

  cube.castShadow = true;
  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;

  sphere.castShadow = true;
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

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( -40, 60, -10 );
  spotLight.castShadow = true;
  scene.add(spotLight);

  document.body.appendChild(renderer.domElement);

};

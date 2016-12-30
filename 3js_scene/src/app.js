import BasicScene from './basic-scene';

'use strict';

window.onload = () => {

  let width = window.innerWidth;
  let height = window.innerHeight;

  const basicScene = new BasicScene(width, height);
  basicScene.init();

  document.body.appendChild(basicScene.domElement());

  window.addEventListener( 'resize' , () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    basicScene.resize();
  }, false );


};


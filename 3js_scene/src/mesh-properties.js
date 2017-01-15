import MeshProperties from './component/mesh-properties';

'use strict';

window.onload = () => {

  let width = window.innerWidth;
  let height = window.innerHeight;

  const meshProperties = new MeshProperties(width, height);
  meshProperties.init();

  document.body.appendChild(meshProperties.domElement());

  window.addEventListener( 'resize' , () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    meshProperties.resize();
  }, false );

};


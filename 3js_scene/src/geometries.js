import MultiGeometry from './multi-geometry';

'use strict';

window.onload = () => {

  let width = window.innerWidth;
  let height = window.innerHeight;

  const multiGeometry = new MultiGeometry(width, height);
  multiGeometry.init();

  document.body.appendChild(multiGeometry.domElement());

  window.addEventListener( 'resize' , () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    multiGeometry.resize();
  }, false );

};


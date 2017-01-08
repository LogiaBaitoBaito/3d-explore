import CustomGeometry from './component/custom-geometry';

'use strict';

window.onload = () => {

  let width = window.innerWidth;
  let height = window.innerHeight;

  const customGeometry = new CustomGeometry(width, height);
  customGeometry.init();

  document.body.appendChild(customGeometry.domElement());

  window.addEventListener( 'resize' , () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    customGeometry.resize();
  }, false );

};


import Stats from 'stats.js';

'use strict'

let stats;
  
export function initStats () {
  stats = new Stats();
  stats.showPanel( 1 );
  document.body.appendChild( stats.dom );
}

export function updateStats ()  {
  stats.update();
}

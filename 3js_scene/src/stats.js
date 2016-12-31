import Stats from 'stats.js';

'use strict'

export default class StatsPanel {

  constructor() {
    this._stats = null;

    this.initStats = this.initStats.bind(this);
    this.updateStats = this.updateStats.bind(this);
  }

  initStats () {
    this._stats = new Stats();
    this._stats.showPanel( 1 );
    document.body.appendChild( this._stats.dom );
  }

  updateStats ()  {
    this._stats.update();
  }

}

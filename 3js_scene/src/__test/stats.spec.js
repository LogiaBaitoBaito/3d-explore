import {expect} from 'chai';
import sinon from 'sinon';

import StatsPanel from '../stats';

describe('StatsPanel', () => {

  it('#constructor - should create stats', () => {
    let statsPanel = new StatsPanel();

    expect(statsPanel._stats).to.be.null;
    expect(statsPanel.initStats).to.be.a('function');
    expect(statsPanel.updateStats).to.be.a('function');

  });

  it.skip('#initStats - should init stats object', () => {
    let statsPanel = new StatsPanel();

    statsPanel.initStats();

    expect(statsPanel._stats).to.not.be.null;
  });

  it('#updateStats - should update stats object', () => {
    // given
    let statsPanel = new StatsPanel();
    let update = sinon.spy();
    statsPanel._stats = { update };

    // when
    statsPanel.updateStats();

    // then
    expect(update).to.be.called;
  });

});

import {expect} from 'chai';
import sinon from 'sinon';
import Stats from 'stats.js';

import StatsPanel from '../stats';

describe('StatsPanel', () => {

  let sandbox;
  before(() => {
    sandbox = sinon.sandbox.create();
  });

  after(() => {
    sandbox.restore();
  });

  it('#constructor - should create stats', () => {
    let statsPanel = new StatsPanel();

    expect(statsPanel._stats).to.be.null;
    expect(statsPanel.initStats).to.be.a('function');
    expect(statsPanel.updateStats).to.be.a('function');

  });

  it('#initStats - should init stats object', () => {
    let panelSpy = sandbox.stub(Stats, 'Panel');
    let showPanelSpy = sandbox.stub();
    panelSpy.returns({
      showPanel: showPanelSpy,
      dom: document.createElement('div')
    });

    // given:
    let statsPanel = new StatsPanel();

    // when:
    statsPanel.initStats();

    // then:
    expect(statsPanel._stats).to.not.be.null;
    expect(showPanelSpy).to.have.been.called;
  });

  it('#updateStats - should update stats object', () => {
    // given
    let statsPanel = new StatsPanel();
    let update = sandbox.spy();
    statsPanel._stats = { update };

    // when
    statsPanel.updateStats();

    // then
    expect(update).to.be.called;
  });

});

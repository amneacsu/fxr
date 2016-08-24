const context = require('./context');

const oscillator = require('./source/oscillator');
const noise = require('./source/noise');

const base1 = oscillator(context, { type: 'sine', frequency: 15, detune: 8500 });

// Visualizer
const visualizer = require('./util/visualizer');

const mutations = [
  base1,
  visualizer(context),
  context.destination
];

mutations.map(function(a, b, l) {
  if (b < l.length - 1) {
    a.connect(l[b + 1]);
  }
});

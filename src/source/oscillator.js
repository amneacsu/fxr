module.exports = function(context, { type = 'sine', frequency = 200, detune = .8 }) {
  const osc = context.createOscillator();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.detune.value = detune;
  osc.start();
  return osc;
}

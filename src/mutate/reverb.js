module.exports = function(context, source) {
  const delay = context.createDelay();
  delay.delayTime.value = 0.02;

  const feedback = context.createGain();
  feedback.gain.value = 0.8;

  const filter = context.createBiquadFilter();
  filter.frequency.value = 1000;

  delay.connect(feedback);
  feedback.connect(filter);
  filter.connect(delay);

  source.connect(delay);
  return delay;
};

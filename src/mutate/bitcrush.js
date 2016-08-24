module.exports = function({ bitCrush, bitCrushSweep }) {
  let _bitcrush_freq = 1 - Math.pow(bitCrush, 1.0 / 3.0);
  let _bitcrush_freq_sweep = -bitCrushSweep * 0.000015;
  let _bitcrush_phase = 0;
  let _bitcrush_last = 0;

  return function(audioProcessingEvent) {
    const inputBuffer = audioProcessingEvent.inputBuffer;
    const outputBuffer = audioProcessingEvent.outputBuffer;

    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      let inputData = inputBuffer.getChannelData(channel);
      let outputData = outputBuffer.getChannelData(channel);

      for (let sample = 0; sample < outputBuffer.length; sample++) {
        _bitcrush_phase += _bitcrush_freq;

        if (_bitcrush_phase > 1)
        {
          _bitcrush_phase = 0;
          _bitcrush_last = inputData[sample];
        }

        _bitcrush_freq = Math.max(Math.min(_bitcrush_freq + _bitcrush_freq_sweep, 1), 0);

        outputData[sample] = _bitcrush_last;
      }
    }
  }
};

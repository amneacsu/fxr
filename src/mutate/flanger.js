module.exports = function({ flangerOffset, flangerSweep }) {
  const _flanger = flangerOffset != 0.0 || flangerSweep != 0.0;

  let _flangerOffset = flangerOffset * flangerOffset * 1020.0;
  if(flangerOffset < 0.0) _flangerOffset = -_flangerOffset;
  const _flangerDeltaOffset = flangerSweep * flangerSweep * flangerSweep * 0.2;
  let _flangerPos = 0;

  const _flangerBuffer = new Array(1024);
  for (let i = 0; i < 1024; i++) _flangerBuffer[i] = 0.0;

  let _flangerInt;

  return function(audioProcessingEvent) {
    const inputBuffer = audioProcessingEvent.inputBuffer;
    const outputBuffer = audioProcessingEvent.outputBuffer;

    if (_flanger) {
      _flangerOffset += _flangerDeltaOffset;
      _flangerInt = parseInt(_flangerOffset);

      if(_flangerInt < 0)   _flangerInt = -_flangerInt;
      else if (_flangerInt > 1023) _flangerInt = 1023;
    }

    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      let inputData = inputBuffer.getChannelData(channel);
      let outputData = outputBuffer.getChannelData(channel);

      for (let sample = 0; sample < outputBuffer.length; sample++) {
        let _sample = inputData[sample];

        if (_flanger) {
          _flangerBuffer[_flangerPos & 1023] = _sample;
          _sample += _flangerBuffer[(_flangerPos - _flangerInt + 1024) & 1023];
          _flangerPos = (_flangerPos + 1) & 1023;
        }

        outputData[sample] = _sample;
      }
    }
  }
};

module.exports = function({ lpCutoff = 1.0, lpCutoffSweep = 0, lpResonance = 0, hpCutoff = 0.0, hpCutoffSweep = 0 }) {
  let _filters = lpCutoff != 1.0 || hpCutoff != 0.0;

  let _lpPos = 0.0;
  let _lpDeltaPos = 0.0;
  let _lpCutoff = lpCutoff * lpCutoff * lpCutoff * 0.1;
  let _lpDeltaCutoff = 1.0 + lpCutoffSweep * 0.0001;

  let _lpDamping = 5.0 / (1.0 + lpResonance * lpResonance * 20.0) * (0.01 + _lpCutoff);
  if (_lpDamping > 0.8) _lpDamping = 0.8;
  _lpDamping = 1.0 - _lpDamping;
  let _lpOn = lpCutoff != 1.0;

  let _hpPos = 0.0;
  let _hpCutoff = hpCutoff * hpCutoff * 0.1;
  let _hpDeltaCutoff = 1.0 + hpCutoffSweep * 0.0003;

  return function(audioProcessingEvent) {
    const inputBuffer = audioProcessingEvent.inputBuffer;
    const outputBuffer = audioProcessingEvent.outputBuffer;

    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      let inputData = inputBuffer.getChannelData(channel);
      let outputData = outputBuffer.getChannelData(channel);

      for (let sample = 0; sample < outputBuffer.length; sample++) {
        let _sample = inputData[sample];

        if (_filters) {
          if(_hpDeltaCutoff != 0.0) {
            _hpCutoff *= _hpDeltaCutoff;
            if (_hpCutoff < 0.00001) _hpCutoff = 0.00001;
            else if (_hpCutoff > 0.1) _hpCutoff = 0.1;
          }

          let _lpOldPos = _lpPos;
          _lpCutoff *= _lpDeltaCutoff;
          if (_lpCutoff < 0.0) _lpCutoff = 0.0;
          else if (_lpCutoff > 0.1) _lpCutoff = 0.1;

          if (_lpOn) {
            _lpDeltaPos += (_sample - _lpPos) * _lpCutoff;
            _lpDeltaPos *= _lpDamping;
          } else {
            _lpPos = _sample;
            _lpDeltaPos = 0.0;
          }

          _lpPos += _lpDeltaPos;

          _hpPos += _lpPos - _lpOldPos;
          _hpPos *= 1.0 - _hpCutoff;
          _sample = _hpPos;
        }

        outputData[sample] = _sample;
      }
    }
  }
};

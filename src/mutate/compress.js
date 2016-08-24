module.exports = function(compressionAmount) {
  let _compression_factor = 1 / (1 + 4 * compressionAmount);

  return function(audioProcessingEvent) {
    const inputBuffer = audioProcessingEvent.inputBuffer;
    const outputBuffer = audioProcessingEvent.outputBuffer;

    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      let inputData = inputBuffer.getChannelData(channel);
      let outputData = outputBuffer.getChannelData(channel);

      for (let sample = 0; sample < outputBuffer.length; sample++) {
        if (inputData[sample] > 0) {
          outputData[sample] = Math.pow(inputData[sample], _compression_factor);
        } else {
          outputData[sample] = -Math.pow(-inputData[sample], _compression_factor);
        }
      }
    }
  }
};

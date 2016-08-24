module.exports = function(context, { type = 'none', amplitude = .5 }) {
  const scriptNode = context.createScriptProcessor();

  scriptNode.onaudioprocess = function(audioProcessingEvent) {
    const inputBuffer = audioProcessingEvent.inputBuffer;
    const outputBuffer = audioProcessingEvent.outputBuffer;

    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      let inputData = inputBuffer.getChannelData(channel);
      let outputData = outputBuffer.getChannelData(channel);

      for (let sample = 0; sample < outputBuffer.length; sample++) {
        outputData[sample] = inputData[sample];
        outputData[sample] += ((Math.random() * 2) - 1) * amplitude;
      }
    }
  };

  return scriptNode;
}

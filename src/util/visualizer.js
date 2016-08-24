var canvas = document.querySelector('#canvas');
var drawContext = canvas.getContext('2d');
drawContext.fillStyle = 'white';

var WIDTH = 1024;
var HEIGHT = 360;

function draw(analyser) {
  let times = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(times);

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  drawContext.fillStyle = 'white';

  for (var i = 0; i < analyser.frequencyBinCount; i++) {
    var value = times[i];
    var percent = value / 256;
    var height = HEIGHT * percent;
    var offset = HEIGHT - height - 1;
    var barWidth = 1;
    drawContext.fillRect(i * barWidth, offset, 1, 1);
  }
}

module.exports = function(context) {
  const analyser = context.createAnalyser();

  setInterval(function() {
    draw(analyser);
  }, 10);

  return analyser;
}

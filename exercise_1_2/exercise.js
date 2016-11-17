var data;
var createChart = function () {
  var barChart = d3.selectAll('div')
      .data(data, function(d) {return d});

  barChart.enter()
      .append('div')
      .style('height', '20px')
      .style('width', function (d) {return (d * 5) + 'px'})
      .style('background-color', function(d) { return d3.rgb(d, 2 * d, 3 * (d + 10), 0.9)})
      .text(function (d) {return d});

  barChart.exit().remove();
};

var getRandomNumber = function (numberOfElement) {
  var randomNumbers = [];
  for (var i = 0; i < numberOfElement; i++) {
    randomNumbers.push(Math.floor(d3.randomUniform(1, 100)()));
  }
  return randomNumbers;
};

var onload = function () {
  data = getRandomNumber(10);
  d3.interval(function () {
    createChart();
    data.shift();
    data.push(Math.floor(d3.randomUniform(1, 100)()));
  }, 1000)
};

window.onload = onload;

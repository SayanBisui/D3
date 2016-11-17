var chartData;
var onload = function () {
  chartData = getRandomNumber(10);
  createAllAxis();
  loadLineChart();

  d3.interval(function () {
    var dataToChange = chartData.shift();
    chartData.push(d3.randomUniform(100)());
    _svg.select('.numbers').attr('d', _line(chartData));
  }, 2500);
};

var getRandomNumber = function (numberOfElement) {
  var data = [];
  for (var i = 0; i < numberOfElement; i++) {
    data[i] = d3.randomUniform(100)();
  }
  return data;
};

const MARGIN = 50;
const HEIGHT = 810;
const WIDTH = 1648;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var _svg, _xScale, _yScale, _line;

var translate = function (x, y) {
  return "translate(" + x + "," + y + ")";
};

var createAllAxis = function () {
  _svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

  _xScale = d3.scaleLinear()
      .domain([0, chartData.length])
      .range([0, INNER_WIDTH]);

  _yScale = d3.scaleLinear()
      .domain([1, 100])
      .range([INNER_HEIGHT, 0]);

  var xAxis = d3.axisBottom(_xScale).ticks(10);

  var yAxis = d3.axisLeft(_yScale).ticks(10);

  _svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(xAxis);

  _svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.call(yAxis);
};

var loadLineChart = function () {
  _svg = d3.select('.container').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

	 _line = d3.line()
		.x(function(q, index){return _xScale(index)})
		.y(function(q){return _yScale(q)});

	_svg.append('path')
		.classed('numbers', true)
		.attr('d', _line(chartData))
    .attr('transform', translate(MARGIN, MARGIN));
    // .transition()
    // .duration(700)
    // .attr('transform', translate());
};













// var data = [12,2,33,24,66,96,72,18,59,10];
// const HEIGHT = 745;
// const WIDTH = 1648;
// const MARGIN = 50;
// const INNER_HEIGHT = HEIGHT - (2 * MARGIN);
// const INNER_WIDTH = WIDTH - (2 * MARGIN);
//
// var onload = function(){
//   var xScale = d3.scaleLinear()
//       .domain([0, 10])
//       .range([0, INNER_WIDTH]);
//
//   var yScale = d3.scaleLinear()
//       .domain([0, 100])
//       .range([INNER_HEIGHT, 0]);
//
//   var svg = d3.select('body').append('svg')
//       .attr('height', HEIGHT)
//       .attr('width', WIDTH);
//
//   var g = svg.append('g')
//       .attr('transform', "translate(" + MARGIN + "," + MARGIN + ")")
//       .attr('class', 'line');
//
//   var line = d3.line()
//       .x(function (d, i) {return xScale(i)})
//       .y(function (d) {return yScale(d)});
//
//   g.append('path')
//     .attr('d', line(data))
//     .attr('class', 'linechart');
//
// };

window.onload = onload;

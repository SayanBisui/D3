var chartData;
var onload = function () {
  chartData = getRandomNumber(10);
  createAllAxis();
  loadBarChart();

  d3.interval(function () {
    var dataToChange = chartData.shift();
    chartData.push(d3.randomUniform(100)());
  }, 250);
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

var loadBarChart = function () {
  // _svg.selectAll('-svg').data(chartData).append('svg')
  //   .classed('rect', true);
  //
  // _svg.append('rect')
  //   .attr('hight', function (q) {console.log(q);return _yScale(q)})
  //   .attr('width', function (q, index) {return _xScale(index)})

  var bar = _svg.selectAll("g")
      .data(chartData)
    .enter().append("g")
      .attr("transform", translate(MARGIN, 0));

  bar.append("rect")
      .attr("y", function(d) { return y(d)})
      .attr("height", function(d) { return INNER_HEIGHT - y(d)})
      .attr("width", x.rangeBand());
};

window.onload = onload;

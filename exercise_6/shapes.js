var DIMENSION = 100, MARGIN = 50;
var svgHeight = 120, svgWidth = 800;
var translate = function (translateValue) {
  return 'translate(' + translateValue + ')';
};

var createLine = function (svg) {
  svg.append('line')
      .attr('x1', 0)
      .attr('y1', DIMENSION)
      .attr('x2', DIMENSION)
      .attr('y2', 0)
      .attr('transform', translate(DIMENSION));
};

var createCircle = function (svg) {
  svg.append('circle')
      .attr('cx', DIMENSION)
      .attr('cy', MARGIN)
      .attr('r', MARGIN)
      .attr('transform', translate(2 * DIMENSION));
};

var createRectangle = function (svg) {
  svg.append('rect')
      .attr('x', DIMENSION)
      .attr('y', 0)
      .attr('width', DIMENSION)
      .attr('height', DIMENSION)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('transform', translate(3 * DIMENSION));
};

var crateTriangle = function (svg) {
  svg.append('polygon')
      .attr('points', DIMENSION + ',' + 0 + ' ' + (1.5 * DIMENSION) + ',' + DIMENSION + ' ' + (0.5 * DIMENSION) + ',' + DIMENSION)
      .attr('transform', translate(5 * DIMENSION));
};

window.onload = function () {
  var svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

  createLine(svg);
  createCircle(svg);
  createRectangle(svg);
  crateTriangle(svg);
};

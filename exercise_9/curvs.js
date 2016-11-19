const pointValues = [
                    {x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7},
                    {x: 3, y: 5}, {x: 4, y: 3}, {x: 6, y: 4},
                    {x: 7, y: 2}, {x: 8, y: 3}, {x: 9, y: 2}
                  ];
const sinePoints = [
                    {x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7},
                    {x: 3, y: 5}, {x: 4, y: 3}, {x: 5, y: 4},
                    {x: 6, y: 4}, {x: 7, y: 2}, {x: 8, y: 3},
                    {x: 9, y: 2}
                  ];
const HEIGHT = 800;
const WIDTH = 800;
const MARGIN = 50;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var curveArray = [
    {"d3Curve": d3.curveLinear},
    {"d3Curve": d3.curveLinearClosed},
    {"d3Curve": d3.curveStepAfter},
    {"d3Curve": d3.curveBasis},
    {"d3Curve": d3.curveBundle},
    {"d3Curve": d3.curveCardinalClosed},
    {"d3Curve": d3.curveCardinal},
    {"d3Curve": d3.curveCatmullRom}
];

var loadChart = function () {
    curveArray.forEach(function (eachCurve) {
        visualize(eachCurve);
    });
};

var xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, INNER_WIDTH]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([INNER_HEIGHT, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var translate = function(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

var createCircles = function (g, data) {
  g.selectAll('circle').data(data, function(d) {return d})
      .enter()
      .append('circle')
      .attr('class','lineCircle')

  g.selectAll('.lineCircle')
      .attr('cx', function(d){return xScale(d.x/10)})
      .attr('cy', function(d){return yScale(d.y/10)})
      .attr('r', 5);
};

var createSineCircles = function (g, data) {
  g.selectAll('.circle').data(data, function(d) {return d})
      .enter()
      .append('circle')
      .attr('class','sineCircle')

  g.selectAll('.sineCircle')
      .attr('cx', function(d){return xScale(d.x/10)})
      .attr('cy', function(d){return yScale(Math.sin(d.x)/10 + 0.5)})
      .attr('r', 5);
};

var visualize = function(curveType) {
  var svg = d3.select('body').append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

  svg.append('g')
      .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
      .call(xAxis);

  svg.append('g')
      .attr('transform', translate(MARGIN, MARGIN))
      .call(yAxis);

      var line = d3.line()
          .x(function(d) {
              return xScale(d.x/10)
          })
          .y(function(d) {
              return yScale(d.y/10)
          })
          .curve(curveType.d3Curve);

      var sineLine = d3.line()
          .x(function(d) {
              return xScale(d.x/10);
          })
          .y(function(d) {
            return yScale(Math.sin(d.x)/10 + 0.5);
          })
          .curve(curveType.d3Curve);

    var g = svg.append('g')
        .attr('transform', "translate(" + MARGIN + "," + MARGIN + ")");

    g.append('path')
        .attr('d', line(pointValues))
        .attr('class', 'line');

    g.append('path')
        .attr('d', sineLine(sinePoints))
        .attr('class', 'sinLine');

    createCircles(g, pointValues);
    createSineCircles(g, sinePoints);

};

window.onload = loadChart;

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

var translate = function(x, y) {
    return "translate(" + x + "," + y + ")";
};

var xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, INNER_WIDTH]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([INNER_HEIGHT, 0]);

var xAxis = d3.axisBottom(xScale).ticks(10);

var yAxis = d3.axisLeft(yScale).ticks(10);

var createSineCircles = function (g, data) {
  g.selectAll('.circle').data(data, function(d) {return d})
      .enter()
      .append('circle')
      .attr('class','sineCircle')

  g.selectAll('.sineCircle')
      .attr('cx', function(d){return xScale(d.x/10)})
      .attr('cy', function(d){return yScale((Math.sin(3 * d.x) + 1)/ 2)})
      .attr('r', 5);
};

var onload = function() {
    var svg = d3.select('body').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .call(yAxis);

    var sineLine = d3.line()
        .x(function(d) {
            return xScale(d.x/10);
        })
        .y(function(d) {
          return yScale((Math.sin(3 * d.x) + 1)/ 2);
        });

    var g = svg.append('g')
        .attr('transform', "translate(" + MARGIN + "," + MARGIN + ")");

    g.append('path')
        .attr('d', sineLine(sinePoints))
        .attr('class', 'linechart');

    createSineCircles(g, sinePoints);
};

window.onload = onload;

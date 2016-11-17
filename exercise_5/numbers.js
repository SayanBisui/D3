var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

window.onload = function () {
  var scale = d3.scaleLinear()
      .domain([0, 10])
      .range(['italic bold 12px/30px sans-serif', 'italic bold 120px/180px sans-serif']);

  var div = d3.select('.container').selectAll('div')
      .data(numbers)
      .enter()
      .append('div')
      .text(function(d) {return d})
      .style('font', function(d) {return scale(d)+'px'})
      .attr('class', 'number');
};

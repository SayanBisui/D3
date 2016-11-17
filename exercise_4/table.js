var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var createRow = function(scale, value) {
  var row = d3.select('tbody').append('tr');
  row.append('td').text(value);
  row.selectAll('td')
      .data(data, function(d) {return d})
      .enter()
      .append('td')
      .text(function(d) {return scale(d)});
};

var createTable = function () {
  var table = d3.select('body').append('table');
  var tbody = table.append('tbody');

  createRow(d3.scaleLinear(), 'Title');
  createRow(d3.scaleLinear(), 'n');
  createRow(d3.scalePow().exponent(2), 'n Square');
  createRow(d3.scaleLog(), 'log(n)');
  createRow(d3.scaleLog().domain([1, 10]).base(10).rangeRound([0, 1]), 'log(n) rounded');
};

window.onload = createTable;

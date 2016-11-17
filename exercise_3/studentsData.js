var studentsData = [
	{name:'ramesh',subject:'maths',score:87},
	{name:'suresh',subject:'maths',score:45},
	{name:'pokemon',subject:'english',score:65},
	{name:'mary',subject:'kannada',score:44},
	{name:'riya',subject:'science',score:72},
	{name:'katie',subject:'social studies',score:82},
	{name:'katie',subject:'maths',score:98},
	{name:'ramesh',subject:'bengali',score:25},
	{name:'suresh',subject:'science',score:55},
	{name:'riya',subject:'tamil',score:75},
	{name:'pokemon',subject:'sports',score:95},
	{name:'pokemon',subject:'social studies',score:32}
];

var subjects = ['maths', 'english', 'kannada', 'science', 'social studies', 'bengali', 'tamil', 'sports'];
var colors = d3.scaleOrdinal(d3.schemeCategory10).domain(subjects);

var createChart = function () {
  var barChart = d3.select('.container').selectAll('div')
      .data(studentsData, function(d) {return d.name});

  barChart.enter()
      .append('div')
			.attr('class', 'bars')
      .style('height', '30px')
      .style('width', function(d) {return d.score * 5 + 'px'})
			.style('background-color', function(d) {return colors(d.subject)})
      .text(function(d) {return d.name + " " + d.score});
};

var createLegends = function () {
	var legendSet = d3.select('.legends').selectAll('div')
			.data(subjects);

	legendSet.enter()
			.append('div')
			.style('background-color', function(d) {return colors(d)})
			.text(function(d) {return d})
			.attr('class', 'legend')

};

var sortByChoice = function (choice) {
	d3.selectAll('.bars').sort(
		function (a, b) {
			return d3.ascending(a[choice], b[choice]);
		}
	);
};

window.onload = function () {
	createChart();
	createLegends();
};

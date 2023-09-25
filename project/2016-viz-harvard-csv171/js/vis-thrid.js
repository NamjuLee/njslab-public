// setup canvas3
var margin3 = {top: 55, right: 20, bottom: 70, left: 47};

var width3 = 550 - margin3.left - margin3.right,
	height3 = 520 - margin3.top - margin3.bottom;

var svg3 = d3.select("#chart-area03").append("svg")
		.attr("width", width3 + margin3.left + margin3.right)
		.attr("height", height3 + margin3.top + margin3.bottom)
		.append("g")
		.attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");


// Initialize data
loadData();

var formatDate = d3.time.format("%Y");
var	parseDate = d3.time.format("%Y-%m-%d").parse;
var data;
var x = d3.time.scale()
				.range([0, width])
var y = d3.scale.linear()
				.range([height,0])
var xAxis = d3.svg.axis().scale(x)
				.orient("bottom")
				.tickFormat(d3.format(""))
				.ticks(10);
var yAxis = d3.svg.axis().scale(y)
				.orient("left")
				.ticks(5);
var xAxisAppend = svg3.append("g")
	   			  .attr("class", "xaxis axis axis-date")
			      .attr("transform", "translate(0," + (height3 + 10 )+ ")");
var yAxisAppend = svg3.append("g")
	   			  .attr("class", "yaxis axis axis-date")
			      .attr("transform", "translate(-10,0 )");

d3.select(".xaxis").append("text").attr("transform", "translate(470,-10 )").text("(Year)")
d3.select(".yaxis").append("text").attr("transform", "translate(10,10 )").text("(US Dollar)")

var chart = svg3.append("path");
var lineSvg = svg3.append("g").attr("class", "circleClass" );


var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { 
					return d.year + "</br> $" + d.data; 
					});
tip.offset([-10, 0]);

// Load CSV file
var dataDic = {};
function loadData() {
	d3.csv("data/global-funding.csv", function(error, csv) {
	 	
	 	csv.forEach(function(da){
	  				//console.log(d.Source);
	  				var data = [];
	  				var temp = da;

					dataDic[da['Source']] = da ;//= function(d.Source){ console.log(d); };  
				});
	 	fundtype = "Global Fund";
		updateDataThird();
	});
}

// data variable 
var fundtype = "Total", startTime = 2005, endTime = 2013;
var visData=[];
var dateData = [];
var FinalVisData = [];

// update data process
function updateDataThird(){
	var tempData = dataDic[fundtype], tempList = [], tempListDate = []
	for(var i in tempData){
		if(tempData[i] != NaN){
			var dateIndex = +tempData[i]
			if((startTime <= i) && (i <= endTime)){ 
				tempListDate.push(i);
				tempList.push(+tempData[i]);
			}
		}
	}
	visData = tempList;
	dateData = tempListDate;
	visData.pop();
	dateData.pop();
	
	x.domain(d3.extent(dateData, function(d) { return d; }));
	y.domain([0, d3.max(tempList, function(d){ return d;})]);

	FinalVisData.year = dateData
	FinalVisData.data = visData

	var temp = [];
	for(var i = 0; i < dateData.length; i++){
		var tDic = {}
		tDic.year = +dateData[i]
		tDic.data = visData[i]
		temp.push(tDic);
		console.log(visData[i]);
	}
	FinalVisData = temp;
	updateVisualizationThrid();
}



// Render visualization
function updateVisualizationThrid() {
	
	svg3.call(tip)
	var line = d3.svg.line()
	        .x(function(d) { return x(d.year); }) 
	        .y(function(d) { return y(d.data); });


	chart.datum(FinalVisData);

	d3.selectAll(".theCircle").data(visData).remove();

	var circles = d3.select(".circleClass").selectAll("circle")
							.data(FinalVisData)
							.enter()
							.append("circle")									 
							.attr("class", "theCircle")
							.attr("fill", "#f5f5f5")
							.transition()
							.duration(1000)
							.attr("cx", function(d, i){
							 	return x(d.year);
							 })
							.attr("cy", function(d,i){
							 	return y(d.data);
							 })
							.attr("r", 5)
							.attr("fill", "#1a5559");

	d3.selectAll(".theCircle").on("click", function(d) {
							 })
							.on('mouseover', tip.show)
							.on('mouseout', tip.hide);
	// update axis
	chart.attr("class", "line")
				.transition()
				.duration(750)
				.attr("d", line);

	d3.select(".xaxis").transition()
				.duration(750)
			    .call(xAxis);

	d3.select(".yaxis").transition()
				.duration(750)
			      .call(yAxis);
};





var radius = 3.0;
var opacity = 0.25;
var shakiness = 20;

var xDropdown = d3.select("#x_axis_select");
var yDropdown = d3.select("#y_axis_select");
var xInitSelect = xDropdown.node()
    .options[xDropdown.node().selectedIndex].value;
var yInitSelect = yDropdown.node()
    .options[yDropdown.node().selectedIndex].value;


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 380 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

var x = d3.scale.linear().range([10, width-10]);
var y = d3.scale.linear().range([height-10, 10]);

//var color = d3.scale.category10();

var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(3);
var yAxis = d3.svg.axis().scale(y).orient("left").ticks(3);

var svg = d3.select("#svg_wrapper").append("svg")
    .attr("id","svg_graph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);
  

var svgDotBack = svg.append("g").attr("id","svg_dots_back");
var svgDotFront = svg.append("g").attr("id","svg_dots_front");

var isValid = function(img){
    if (img["1 PerformanceType"] == undefined) {return false;}
    if (img["2 by people or installation"] == undefined) {return false;}
    if (img["3 excitement"] == undefined) {return false;}
    if (img["4 focus"] == undefined) {return false;}
    if (img["5 physical surroundings"] == undefined) {return false;}
    if (img["6 emotional character"] == undefined) {return false;}
    if (img["7 participate"] == undefined) {return false;}
    if (img["8 better idea"] == undefined) {return false;}
    if (img["9 permanentness"] == undefined) {return false;}
    return true;
    //((d[xSelect] >= 0) && (d[xSelect]) <= 1.0)&&((d[ySelect] >= 0) && (d[ySelect]) <= 1.0) && !isNaN(d[xSelect]) && !isNaN(d[ySelect]) 
}  

index_viz_data.forEach(function(d) {
    if (isValid(d)){
        svgDotBack.append("circle")
        .attr("class", "dot")
        .attr("id",'dot_'+d["guid"])
        .attr("r", radius)
        .attr("cx", x(d[xInitSelect])+Math.random()*shakiness)
        .attr("cy", y(d[yInitSelect])+Math.random()*shakiness)
        .style("opacity", opacity)
    }

});

/*  
svg.selectAll(".dot").data(index_viz_data)
.enter().append("circle")
  .attr("class", "dot")
  .attr("id",function(d) { return 'dot_'+d["id"]; })
  .attr("r", function(d) {  if (!isValid(d)) {return 10.0;} else {return radius;} })
  .attr("cx", function(d) {   if (isValid(d)) {return x(d[xInitSelect])+Math.random()*shakiness} else {return 200;}; })
  .attr("cy", function(d) {  if (isValid(d)) {return y(d[yInitSelect])+Math.random()*shakiness} else {return 200;};  })
  .style("opacity", function(d) {  if (isValid(d)) {return opacity;} else {return 0.0;} })
  //.style("fill", function(d) { return color(d.species); })
  ;
*/  
var change = function(){
    var xSelect = xDropdown.node().options[xDropdown.node().selectedIndex].value;
    var ySelect = yDropdown.node().options[yDropdown.node().selectedIndex].value;
    index_viz_data.forEach(function(d) {
        if (isValid(d)) {
            svg.select('#dot_'+d["guid"])
            .transition().attr("cx",x(d[xSelect])+Math.random()*shakiness)
            .transition().attr("cy",y(d[ySelect])+Math.random()*shakiness)
        }
    });
}    
xDropdown.on("change", function(){change();});
yDropdown.on("change", function(){change();});


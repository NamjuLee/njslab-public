var radius = 10.0;

var xDropdown = d3.select("#x_axis_select");
var yDropdown = d3.select("#y_axis_select");
var xInitSelect = xDropdown.node().options[xDropdown.node().selectedIndex].value;
var yInitSelect = yDropdown.node().options[yDropdown.node().selectedIndex].value;


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left");

var svg = d3.select("body").append("svg")
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


svg.selectAll(".dot").data(json)
.enter().append("circle")
  .attr("class", "dot")
  .attr("id",function(d) { return 'dot_'+d["id"]; })
  .attr("r", radius)
  .attr("cx", function(d) { return x(d[xInitSelect]); })
  .attr("cy", function(d) { return y(d[yInitSelect]); })
  //.style("fill", function(d) { return color(d.species); })
  ;
  
/*      
var json = d3.json("data.json", function(error, json) {
    if (error) return console.warn(error);   


});*/
    
var change = function(){
    var xSelect = xDropdown.node().options[xDropdown.node().selectedIndex].value;
    var ySelect = yDropdown.node().options[yDropdown.node().selectedIndex].value;
    //alert(d3.select("#svg_graph").select("#ksteinfe").attr("r"))
    //var json = d3.json("data.json", function(error, json) {
        //if (error) return console.warn(error);
        json.forEach(function(d) {
            svg.select('#dot_'+d["id"])
            .transition().attr("cx",x(d[xSelect]))
            .transition().attr("cy",y(d[ySelect]))
        });
        
    //});
        
}    
xDropdown.on("change", function(){change();});
yDropdown.on("change", function(){change();});


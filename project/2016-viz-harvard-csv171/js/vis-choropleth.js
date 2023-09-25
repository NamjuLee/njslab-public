

//readme the tool tip works perfectly, but on the Vocareum, it seem not work, 
//please review it with no Vocareum


// --> CREATE SVG DRAWING AREA
var margin = {top: 40, right: 40, bottom: 60, left: 60};

var width = 650 - margin.left - margin.right,
	 height = 500 - margin.top - margin.bottom;

var index = "UN_population";

var dataIndex ={
                "UN Population" : "UN_population",
                "At risk" : "At_risk",
                "At high risk" : "At_high_risk",
                "Suspected causes": "Suspected_malaria_cases",
                "Malaria cases" : "Malaria_cases"   
                }
// first vis svg
var svg1 = d3.select("#chart-area01").append("svg")
                    		.attr("width", width + margin.left + margin.right)
                    		.attr("height", height + margin.top + margin.bottom)
                        .attr("class", "svg1")
                    		.append("g")
                    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var projection = d3.geo.mercator() // mercator() //orthographic() // albersUsa()
                        .translate([width /2, height /2])
                        .precision(.1)
                        .scale((width + 1) / 0.5 / Math.PI)
                        .center([10,3]);

var pathMap = d3.geo.path()
                        .projection(projection);
var mapTopJsonfilter; 
var malariaDataCsvClean; // data B
var malariaDatabyCodeFiltered = {}; // data A
var scData = d3.scale.linear()
                      .range([25,255]);
var geoSVG;

// load data from files
queue()
    .defer(d3.json, "data/africa.topo.json")
    .defer(d3.csv, "data/global-malaria-2015.csv")
    .await(function(error, mapTopJson, malariaDataCsv){
    
    // --> PROCESS DATA
    // data A
    mapTopJsonfilter = mapTopJson
    // data B
    malariaDataCsvClean = malariaDataCsv.filter(function(d){
            return d.Code != NaN;
				  	})

	  malariaDataCsvClean.forEach(function(d){
									malariaDatabyCodeFiltered[d['Code']] = d;  
									}); //properties
    initChoropleth();
    });
    
// initiate functions
function initChoropleth(){
    var topojsonData = topojson.feature(mapTopJsonfilter, mapTopJsonfilter.objects.collection).features
    geoSVG = svg1.selectAll(".geoPath").data(topojsonData)
                        .enter()
                        .append("path")
                        .attr("d", pathMap)
                        .attr("fill","rgb(25,25,25)")
                        .attr("class", "geoPath");
    d3.selectAll(".geoPath")
                        .on("mouseover", function(d){
                            var num = malariaDatabyCodeFiltered[d.properties.adm0_a3_is];
                            console.log("ddddddd");
                        });
    visUpdate("UN Population")
}


// data update
var maxScale;
function visUpdate(data){
  index = dataIndex[data];
  maxScale = d3.max(malariaDataCsvClean, function(d){
                                                if(!isNaN(d[index])){ 
                                                   return d[index]
                                                 };});
  scData.domain([0, maxScale]);
  updateChoropleth();
  legendUpdate();
  visTooltip();
}


// map update
function updateChoropleth() {        
    geoSVG.transition().duration(1500)
                        .attr("fill", function(d){
                            var key = d.properties.adm0_a3_is
                            if (key != undefined) {
                                if(malariaDatabyCodeFiltered[key] != undefined )
                                {
                                  var num = +malariaDatabyCodeFiltered[key][index];
                                  if(!isNaN(num)){
                                      return "rgb(" + scData(num) + ",0,0)";
                                  }else{
                                      return "rgb(0,0,0)";
                                  }
                                }
                            }
                        });
};

// legend update
function legendUpdate(){
    var legend = d3.select(".svg1").append("g")
                                   .attr("transform", "translate(" + 0 + "," + (height - 80) + ")");
    // legend graphic
    legend.selectAll("rect").data(d3.range(0,11))
                                  .enter()
                                  .append("rect")
                                  .attr("x",10)
                                  .attr("y",function(d,i){
                                    return i * 16;
                                  })
                                  .attr("height",15)
                                  .attr("width",20)
                                  .attr("fill", function(d,i){
                                    return "rgb(" + (255 - (25 * i)) +",0,0)";
                                  });
    // legend texts
    d3.selectAll(".legendText").remove();
    legend.selectAll(".legendText").data(d3.range(0,11))
                                  .enter()
                                  .append("text")
                                  .attr("class", "legendText")
                                  .attr("fill", "gray")
                                  .attr("x",35)
                                  .attr("y",function(d,i){
                                    return (i * 16) + 15;
                                  })
                                  .text(function(d,i){
                                    if(i == 0){
                                      var tempNumber = +maxScale + 1;
                                      return tempNumber;
                                    }else if( i == 5){
                                      return (maxScale/2)
                                    }else if( i == 10 ){
                                      return ("0 or N/A")
                                    }
                                  });
    // legend title                     
    d3.selectAll(".legendTitle").remove();
    legend.append("text").attr("class","legendTitle")
                                 .attr("x",10).attr("y",-10)
                                 .attr("fill", "gray")
                                 .text(index);

}

// tool tip and mouse event
function visTooltip(){
    var tooltips = d3.selectAll(".geoPath")
                                  .on("mouseover", function(d){
                                    AddToolTip(d);
                                  })
                                  .on("mousemove", function(d){
                                      var tooltip = document.getElementById("tipMap");
                                      var canvas = document.getElementById("chart-area01"); 
                                      var rect = canvas.getBoundingClientRect();
                                      var key = d.properties.adm0_a3_is
                                      if (key != undefined || key != null) { 
                                        tooltip.style.left = (d3.mouse(this)[0] + rect.left - 55) + "px"; 
                                        tooltip.style.top = (d3.mouse(this)[1] + 365) + "px"; 
                                        }
                                  })   
                                  .on("mouseout", function(d){
                                    RemoveToolTip(d);
                                  });

}
// references from googling
// customized tooltip function
function AddToolTip(d){
  var tooltip = document.createElement("div");
  var canvas = document.getElementById("chart-area01");
  var pos = getMouseLocation(event, canvas);

  tooltip.id = 'tipMap';
  tooltip.style.background = "#1a5559";
  tooltip.style.color = "white";

  var key = d.properties.adm0_a3_is

  if ((key != undefined) || (key != NaN)) { 
    var te = malariaDatabyCodeFiltered[key];
    var texts = "Country : " + te.Country + "</br>";
    texts += "UN population : " + te.UN_population + "</br>";
    texts += "At risk : " + te.At_risk + "</br>";
    texts += "At high_risk : " + te.At_high_risk + "</br>";
    texts += "Suspected malaria_cases : " + te.Suspected_malaria_cases + "</br>";
    texts += "Malaria cases : " + te.Malaria_cases + "</br>";
    tooltip.innerHTML = texts;
  }
  document.body.appendChild(tooltip);
}
// move tool tip
function MoveToolTip(d){
  var tooltip = document.getElementById("tipMap");
  var canvas = document.getElementById("chart-area01"); 
  var pos = getMouseLocation(event, canvas);

  var key = d.properties.adm0_a3_is
  if (key != undefined || key != null) { 
    tooltip.style.left = d3.mouse(this)[0] + "px"; 
    tooltip.style.top = d3.mouse(this)[1] + "px"; 
    }
}
// remove tooltip
function RemoveToolTip(d){
  var tooltip=document.getElementById("tipMap");
  if (!tooltip) return;
  tooltip.parentNode.removeChild(tooltip);
}
// get mouse location
function getMouseLocation(_event, _element) {
  var rect = _element.getBoundingClientRect();
  return {x:_event.clientX - rect.left, y:_event.clientY - rect.top};
}
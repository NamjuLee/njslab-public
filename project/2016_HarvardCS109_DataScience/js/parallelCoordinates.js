


//reference http://bl.ocks.org/mbostock/7586334
function ParallelCoordinatesVis(_div, _logDiv, theData, _width, _height){
  let logDiv = _logDiv;
  let m = [30, 10, 60, 1],   // top left bottom right
      w = _width - m[1] - m[3],
      h = _height - m[0] - m[2];
  let x = d3.scale.ordinal().rangePoints([0, w], 1),
      y = {},
      dragging = {};
  let line = d3.svg.line(),
      axis = d3.svg.axis().orient("left"),
      background,
      foreground;
  d3.select("svg").remove();
  let svg = d3.select("#" + _div).append("svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .append("g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    // Extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d3.keys(theData[0]).filter(function(d) {
      return d != "name" && (y[d] = d3.scale.linear()
          .domain(d3.extent(theData, function(p) { return +p[d]; }))
          .range([h, 0]));
    }));
    // Add grey background lines for context.
    background = svg.append("g")
        .attr("class", "background")
      .selectAll("path")
        .data(theData)
      .enter().append("path")
        .attr("d", path);
    // Add blue foreground lines for focus.
    foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(theData)
        .enter().append("path")
        .attr("d", path)
        .on("click", function(d) {
            clickEvent(d)
            d3.select(this).classed("active", true)
        })
        .on("mouseover", function(d) {
            AddToolTip(d);
            d3.select(this)
                .style("cursor", "pointer")
                .style('stroke-width', "5")
                .style('stroke-opacity', '1')
                .style('stroke', '#1a5559')
                .style('z-index', '100000 !important')
                .classed("active", true);
        })
        .on("mousemove", function(d){
            var tooltip = document.getElementById("tipMap");
            var canvas = document.getElementById(_div); 
            var rect = canvas.getBoundingClientRect();

            var heightTooltip = $("#tipMap").innerHeight();
            var key = d.degree;
            if (key != undefined || key != null) { 

              tooltip.style.position ="absolute";
              tooltip.style.zIndex ="1000000";  
              tooltip.style.padding ="5px";         

              tooltip.style.left = (d3.mouse(this)[0] + 30 ) + "px"; 
              tooltip.style.top = (d3.mouse(this)[1] +  680 - heightTooltip ) + "px"; 
            }
        }) 
        .on("mouseout", function(d) {
            RemoveToolTip(d);
            d3.select(this)
                .style('stroke', 'white')
                .style('stroke-width', "1px")   
                .style('stroke-opacity', '0.7') 
                .style('z-index', '1000 !important')       
                .classed("active", false)
        });
    // Add a group element for each dimension.
    let g = svg.selectAll(".dimension")
        .data(dimensions)
      .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        .call(d3.behavior.drag()
          .on("dragstart", function(d) {
            dragging[d] = this.__origin__ = x(d);
            background.attr("visibility", "hidden");
          })
          .on("drag", function(d) {
            dragging[d] = Math.min(w, Math.max(0, this.__origin__ += d3.event.dx));
            foreground.attr("d", path);
            dimensions.sort(function(a, b) { return position(a) - position(b); });
            x.domain(dimensions);
            g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
          })
          .on("dragend", function(d) {
            delete this.__origin__;
            delete dragging[d];
            transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
            transition(foreground)
                .attr("d", path);
            background
                .attr("d", path)
                .transition()
                .delay(500)
                .duration(0)
                .attr("visibility", null);
          }));
    // Add an axis and title.
    g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
      .append("text")
        .attr("text-anchor", "middle")
        .attr("y", -9)
        .text(String);

    // Add and store a brush for each axis.
    g.append("g")
        .attr("class", "brush")
        .each(function(d) { 
          d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush)); 
        })
      .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);         

  function position(d) {
    let v = dragging[d];
    return v == null ? x(d) : v;
  }
  function transition(g) {
    return g.transition().duration(500);
  }
  // Returns the path for a given data point.
  function path(d) {
    return line(dimensions.map(function(p) { 
      return [position(p), y[p](d[p])]; 
    }));
  }
  // When brushing, don’t trigger axis dragging.
  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }
  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
    let actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
        extents = actives.map(function(p) { return y[p].brush.extent(); });
    foreground.style("display", function(d) {
      return actives.every(function(p, i) {
        return extents[i][0] <= d[p] && d[p] <= extents[i][1];
      }) ? null : "none";
    });
  }
  //........................... click event
  function clickEvent(d){
    // push slected data to Flux flow
    // console.log("the project is "+ selectedProject);
    // console.log(selectedProject);
    
    for (var i = projectKeys.length - 1; i >= 0; i--) {
      if(projectKeys[i].label == "SelectedDataToVis") theSelectedKeyForVis = projectKeys[i];
    };

    $("#logDiv").text("loading the result from Flux");

    updateKeyValue(selectedProject, theSelectedKeyForVis, d);
  }
  //........................... tool tip
  function AddToolTip(d){
    var tooltip = document.createElement("div");
    var canvas = document.getElementById(_div);
    var pos = getMouseLocation(event, canvas);

    tooltip.id = 'tipMap';
    tooltip.style.background = "#1a5559";
    tooltip.style.opacity = "0.85";
    tooltip.style.color = "white";

    var toHtml = []
    for(let eachData in d){
      let eachTitleText = eachData.split(",");
      if(eachTitleText[1] == null ) eachTitleText = eachTitleText[0]
      else eachTitleText = eachTitleText[1];
      let theNumber = String(d[eachData]).split(".");
      let theNumber1 = theNumber[0];
      let theNumber2 = theNumber[1];
      if(theNumber2 == null) toHtml.push( eachTitleText + " : " + theNumber1+" <br> <br> ");
      else toHtml.push( eachTitleText + " : " + theNumber1 + "." + theNumber2[0] + theNumber2[1] +" <br> <br> ");
    }
    tooltip.innerHTML = toHtml;
    $("#logDiv").html(toHtml);
    document.body.appendChild(tooltip);
  }
  function RemoveToolTip(d){
    var tooltip=document.getElementById("tipMap");
    if (!tooltip) return;
    tooltip.parentNode.removeChild(tooltip);
  }
  function getMouseLocation(_event, _element) {
    var rect = _element.getBoundingClientRect();
    return {x:_event.clientX - rect.left, y:_event.clientY - rect.top};
  }
} // End ParallelCoordinatesVis


///////////////////////////////////////////////////////////////////////////////////////
function ParallelCoordinatesInit(_parentDiv, _theData, _title, _logDiv){
  this.mainDiv = document.getElementById(_parentDiv);
  this.div = document.createElement("div"); 
  this.mainDiv.appendChild(this.div);       
  this.div.className = "PCVis";
  this.div.id="parallelCoordinatesVis";
  ParallelCoordinatesInit.IdGenerator++;
  this.theData = _theData;
  
  this.width = $(this.mainDiv).width()
  this.height = $(this.mainDiv).height()
  this.theColor = "rgb(200, 200, 200)"
  this.div.style.backgroundColor = this.theColor;
  this.div.style.opacity = 0.9;

  this.div.style.zIndex = "9";
  this.div.style.height = this.height+"px";
  this.div.style.width = this.width +"px";

  this.div.style.bother = "1px 1px 1px 1px";
  this.div.style.borderColor = this.theColor;
  this.div.style.borderStyle = "dotted"; //"solid"
  this.div.style.borderWidth = "0.2px";

  this.topDiv = document.createElement("div"); 
  this.div.appendChild(this.topDiv);
  this.topDiv.style.padding = "0.5em";
  this.topDiv.style.fontSize = "1.5em";
  this.topDiv.style.color = this.theColor;

  this.topDiv.style.height = "50px";
  this.topDiv.style.width = this.width +"px";
  this.topDiv.style.backgroundColor = "white";
  this.topDiv.innerHTML  = _title ===undefined ? "Panel" : _title;

  // log div
  // if(!_logDiv){
  //   this.logDivParent = document.getElementById(_logDiv);
  //   this.logDiv = document.createElement("div");
  //   this.logDivParent.appendChild(this.logDiv); 
  //   this.logDiv.id = "logMainDiv";
  //   this.logDiv.style.backgroundColor = "rgb(15, 191, 214)";
  //   this.logDiv.style.bother = "1px 1px 0px 1px";
  //   this.logDiv.style.borderColor = "#rgb(15, 191, 214)";
  //   this.logDiv.style.borderStyle = "dotted"; //"dotted"
  //   this.logDiv.style.borderWidth = "0.2px";

  //   this.topDivLog = document.createElement("div"); 
  //   this.logDiv.appendChild(this.topDivLog);
  //   this.topDivLog.style.padding = "0.5em";
  //   this.topDivLog.style.fontSize = "1.5em";
  //   this.topDivLog.style.color = "rgb(15, 191, 214)";
  //   this.topDivLog.style.backgroundColor = "white";
  //   this.topDivLog.style.height = "50px";
  //   this.topDivLog.innerHTML  = "Data Log"

  //   this.subLog = document.createElement("div"); 
  //   this.logDiv.appendChild(this.subLog);
  //   this.subLog.id = "logDiv";
  //   this.subLog.style.padding = "0.5em";
  //   this.subLog.style.paddingTop = "20px";
  //   this.subLog.style.fontSize = "1.5em";
  //   this.subLog.style.color = "white";
  //   this.subLog.style.backgroundColor = "rgb(15, 191, 214)";
  //   this.subLog.style.width = "100%";
  //   this.subLog.style.height = ($("#"+ _logDiv).height()) - 52 + "px" ;
  //   this.subLog.innerHTML  = "content"
  // }
  
  // interaction with window resize
  let theMain = this;
  $( window ).resize(function(){
    theMain.Resize();
  });
  ParallelCoordinatesVis(this.div.id, this.logDiv, this.theData, this.width, this.height)
}
ParallelCoordinatesInit.IdGenerator = 0;
ParallelCoordinatesInit.prototype.Resize=function(){
  this.width = $(this.mainDiv).width();
  this.height = $(this.mainDiv).height();
  this.topDiv.style.height = "50px"
  this.topDiv.style.width = this.width +"px";
  this.div.style.height = this.height+"px";
  this.div.style.width = this.width +"px";
  ParallelCoordinatesVis(this.div.id, this.logDiv, this.theData , this.width, this.height);
  $("#logDiv").height( $("#LogDiv").height() - 82 + "px");
}
/////////////////////////////////////////////////////////////////////////////

// ..................................................... the Data structure
// tempData = []
// for(let i=0,c=360;i<c;++i){
//   let theJson = {};
//   theJson.name = "theData : "+i;
//   theJson.angle = getRandomArbitrary(0,360);
//   theJson.xOffset = getRandomArbitrary(0,10);
//   theJson.yOffset = getRandomArbitrary(0,10);
//   theJson.numberCar = getRandomArbitrary(300,1000);
//   theJson.lengthAisle = getRandomArbitrary(100,500);
//   theJson.num6 = getRandomArbitrary(0,100);
//   theJson.efficiency = getRandomArbitrary(0.3,0.6);
//   tempData.push(theJson);
// }
function GetDummyDataForParallelCoordinate(){
  var temp = []

  for(let i = 0; i < 100; ++i){
    var theDic = {};
    theDic.valueA = GetRandom(0, 10);
    theDic.valueB = GetRandom(0, 20);
    theDic.valueC = GetRandom(0, 1000);
    theDic.valueD = GetRandom(0, 50);
    theDic.valueE = GetRandom(0, 100);
    temp.push(theDic);
  }
  return temp;
}
function GetRandom(min, max) {
  return Math.random() * (max - min) + min;
}



function DataWranglingFromList(d){
  d = JSON.parse(JSON.stringify(d));
  d = JSON.parse(d)
  d = d[0].Value
  d = RemoveEmptyListInJSON(d);
  let temp = null;
  for(let k in d){ // this is only for one loop
    let tempData = d[k];
    let c = tempData.length;
    temp = []
    if(c != 0 ){
          for(let j = 0 ; j < c; ++j){
            let theEach = {};
            for(let i in d){
              theEach[i] = d[i][j]; 
            }
            temp.push(theEach)
          }
      }
  break;
  }
  return temp;
}
function RemoveEmptyListInJSON(d){
  let newJSON = {};
  for(let t in d){ 
    let temp = d[t];
    if(temp.length != 0) newJSON[t] = temp;
  }
  return newJSON;
}

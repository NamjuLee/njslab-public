
function MapLog(theDiv, mapVis){

	var mapLog = this;
	this.mapVis = mapVis;
	this.mainDiv = document.getElementById(theDiv);
	this.div = document.createElement("div"); 
	this.div.id = MapLog.counter++;;
	this.mainDiv.appendChild(this.div); 			
	this.div.className = "MapLog";
	this.div.style.left = 50 + MapLog.posIncrease + "px";				
	this.div.style.top = 50 + MapLog.posIncrease + "px";

	console.log(this.div);

	this.div.style.position="absolute";
	this.div.style.backgroundColor = "#ffffff";
	this.div.style.opacity = 0.8;
	this.div.style.bother = "1px 1px 1px 1px";
	this.div.style.zIndex = "9";
	this.capture = false;

	$(this.div).draggable({ 

containment: "parent",
// containment: $('body'),
// helper: 'clone'
		appendTo: 'parent',
		// helper: 'clone'
    });


	if(this.color == null) {this.color = MapLog.GetRandomColor()};
	// this.div.addEventListener("click", function(e){ this.OnMouseDown(e);});
	// this.div.addEventListener("mousemove", function(e){ this.OnMouseMove(e);});
	// this.div.addEventListener("mouseup", function(e){ this.OnMouseUp(e);});
	// this.div.addEventListener("mousedown", this.onMouseDown );

	this.subTopDiv = document.createElement("div"); 
	this.subTopDiv.className = "MapLogSubTopDiv";
	this.div.appendChild(this.subTopDiv);
	this.subTopDiv.innerHTML = "data log : " + this.div.id;

	this.subTopDiv2 = document.createElement("div"); 
	this.subTopDiv2.className = "MapLogSubTopDiv2";
	this.div.appendChild(this.subTopDiv2);

	this.btnData1 = document.createElement("BUTTON"); 
	this.btnData1.className = "BtnData1";    
	var t3 = document.createTextNode("D1");    
	this.btnData1.appendChild(t3);   
	this.btnData1.addEventListener("click", function(){mapLog.ImportDataA();});
	this.subTopDiv2.appendChild(this.btnData1); 

	this.btnAdd = document.createElement("BUTTON");  
	this.btnAdd.className = "BtnAddLog";	   
	var t1 = document.createTextNode("Add Log");    
	this.btnAdd.appendChild(t1);                            
	this.btnAdd.addEventListener("click", function(e){ MapLog.AddMapLog();});
	this.subTopDiv2.appendChild(this.btnAdd);



              

	this.btnRemove = document.createElement("BUTTON");
	this.btnRemove.className = "BtnARemoveLog";   
	var t2 = document.createTextNode("Remove Log");    
	this.btnRemove.appendChild(t2);                  
	this.btnRemove.addEventListener("click", function(){mapLog.Remove();});
	this.subTopDiv2.appendChild(this.btnRemove);  

	this.btnData2 = document.createElement("BUTTON"); 
	this.btnData2.className = "BtnData2";   
	var t4 = document.createTextNode("D2");    
	this.btnData2.appendChild(t4);   
	this.btnData2.addEventListener("click", function(){mapLog.ImportDataB();});
	this.subTopDiv2.appendChild(this.btnData2);   



	this.subTopDiv3 = document.createElement("div"); 
	this.subTopDiv3.className = "MapLogSubTopDiv3";
	this.div.appendChild(this.subTopDiv3);
	// this.subTopDiv3.innerHTML = "data";

	this.subTopDiv3_1 = document.createElement("div"); 
	this.subTopDiv3_1.className = "MapLogSubTopDiv3_1";
	this.subTopDiv3.appendChild(this.subTopDiv3_1);
	this.subTopDiv3_1.innerHTML = "Data A";
	this.subTopDiv3_1.style.width = 100+"px";
	this.subTopDiv3_1.style.float = "left";

	this.subTopDiv3_2 = document.createElement("div"); 
	this.subTopDiv3_2.className = "MapLogSubTopDiv3_1";
	this.subTopDiv3.appendChild(this.subTopDiv3_2);
	this.subTopDiv3_2.innerHTML = "Data B";
	this.subTopDiv3_2.style.width = 100+"px";
	this.subTopDiv3_2.style.float = "right";

	this.subTopDiv4 = document.createElement("div"); 
	this.subTopDiv4.className = "MapLogSubTopDiv4";
	this.subTopDiv4.id = "MapLogSubTopDiv4-" + this.div.id;
	this.div.appendChild(this.subTopDiv4);

	///
	// this.subTopDiv5_1 = document.createElement("div"); 
	// this.subTopDiv5_1.className = "MapLogSubTopDiv5";
	// this.subTopDiv5_1.id = "MapLogSubTopDiv4-" + this.div.id;
	// this.div.appendChild(this.subTopDiv5_1);
	// this.subTopDiv3_1.style.height = 3 +"px";
	// this.subTopDiv5_1.innerHTML = "dd";

	this.subTopDiv5_2 = document.createElement("div"); 
	this.subTopDiv5_2.className = "MapLogSubTopDiv5";
	this.subTopDiv5_2.id = "MapLogSubTopDiv4-" + this.div.id;
	this.div.appendChild(this.subTopDiv5_2);

	this.btnDataA = document.createElement("BUTTON"); 
	this.btnDataA.className = "BtnData1";
	this.btnDataA.style.width = 100+"px";
	var tA = document.createTextNode("Send D1");    
	this.btnDataA.appendChild(tA);   
	this.btnDataA.addEventListener("click", function(){mapLog.SendDataA();});
	this.subTopDiv5_2.appendChild(this.btnDataA); 

	this.btnDataB = document.createElement("BUTTON"); 
	this.btnDataB.className = "BtnData2";  
	this.btnDataB.style.width = 100+"px";
	var tB = document.createTextNode("Send D2");    
	this.btnDataB.appendChild(tB);   
	this.btnDataB.addEventListener("click", function(){mapLog.SendDataB();});
	this.subTopDiv5_2.appendChild(this.btnDataB);   


this.RComputeLineSeg();

	this.data_A = null;
	this.data_B = null;

	this.piSvg = null;
	this.visData = null;


	MapLog.posIncrease += 17
	MapLog.mapList.push(this);
};

MapLog.prototype.ImportDataA = function(){ 
	// console.log(this);
	this.data_A = MapLog.DataTemp;
	this.UpdateA();
}

MapLog.prototype.ImportDataB = function(){ 
	// console.log(this);
	this.data_B = MapLog.DataTemp;
	this.UpdateB();
}

MapLog.prototype.SendDataA = function(){
	MapLog.DataTemp = this.data_A;
}

MapLog.prototype.SendDataB = function(){
	MapLog.DataTemp = this.data_B;
}

MapLog.prototype.Remove = function(){ 
	var thisID = this.div.id;
	console.log("id" + thisID);
	var newList = []
	if(MapLog.mapList.length > 1){
		for (var i = 0; i < MapLog.mapList.length; i++) {
			if(MapLog.mapList[i].div.id == thisID){

				if(this.line !=null){this.line.remove()};
				if(this.circle1 != null){this.circle1.remove()};
				if(this.circle2 != null){this.circle2.remove()};

				this.div.parentNode.removeChild(this.div);

			}else{
				newList.push(MapLog.mapList[i]);
			}
		}
		MapLog.mapList = newList;
	}
	
};



MapLog.prototype.UpdateA = function(){

	if(this.line != null){this.line.remove();}
	var vis = this.data_A;
	$(this.subTopDiv3_1).html("<font color=" + this.color +">Data 1" + "</br>" +
							   vis["Country "] + "</br>" + 
							   vis["Coordinates"] + "</br>" +
							   vis["CountryID1"] + "</br>" +
							   vis["CountryID2"]+ "</font>");

	if(this.circle1 == null){
		this.circle1 = d3.select("#d3Canvas").append("circle")
								.style("stroke", this.color)
								.style("stroke-width", 2)
						        // .style("fill", this.color)
						        .attr("r", 5)
						        .attr("cx", this.mapVis.Projection(vis["Coordinates"]).x)
						        .attr("cy", this.mapVis.Projection(vis["Coordinates"]).y);
	}

	this.DrawLine();
}

MapLog.prototype.UpdateB = function(){
	if(this.line != null){this.line.remove();}
	var vis = this.data_B;
	$(this.subTopDiv3_2).html("<font color=" + this.color + ">Data 2" + "</br>" +
							   vis["Country "] + "</br>" + 
							   vis["Coordinates"] + "</br>" +
							   vis["CountryID1"] + "</br>" +
							   vis["CountryID2"] + "</font>");
	if(this.circle2 == null){
		this.circle2 = d3.select("#d3Canvas").append("circle")
								.style("stroke", this.color)
								.style("stroke-width", 2)
						        // .style("fill", this.color)
						        .attr("r", 5)
						        .attr("cx", this.mapVis.Projection(vis["Coordinates"]).x)
						        .attr("cy", this.mapVis.Projection(vis["Coordinates"]).y);
	}
	this.DrawLine();
}




MapLog.prototype.DrawLine = function(){
	var vis = this;
	if(this.data_A != null && this.data_B != null){



		this.line = d3.select("#d3Canvas").append("line");
		$( window ).resize(function() {vis.DrawUpdate();});

		;
		this.DrawUpdate();
	}

}

MapLog.prototype.DrawUpdate = function(){
	this.line
             .attr("x1", this.mapVis.Projection(this.data_A["Coordinates"]).x)
             .attr("y1", this.mapVis.Projection(this.data_A["Coordinates"]).y)
             .attr("x2", this.mapVis.Projection(this.data_B["Coordinates"]).x)
             .attr("y2", this.mapVis.Projection(this.data_B["Coordinates"]).y)
             .attr("stroke", this.color)
             .attr("stroke-width","2");

	// this.btnData1
	console.log(this.btnData1);


    // this.RComputeLineSeg(this.mapVis.Projection(this.data_A["Coordinates"]).x,
    // 					this.mapVis.Projection(this.data_A["Coordinates"]).y,
    // 					this.mapVis.Projection(this.data_B["Coordinates"]).x,
    // 					this.mapVis.Projection(this.data_B["Coordinates"]).y);

	if(this.circle1 != null){
		this.circle1.attr("r", 5)
	        .attr("cx", this.mapVis.Projection(this.data_A["Coordinates"]).x)
	        .attr("cy", this.mapVis.Projection(this.data_A["Coordinates"]).y);
	        
	    // this.RComputeLineSeg(this.mapVis.Projection(this.data_A["Coordinates"]).x,
    	// 				this.mapVis.Projection(this.data_A["Coordinates"]).y,
    	// 				this.mapVis.Projection(this.data_B["Coordinates"]).x,
    	// 				this.mapVis.Projection(this.data_B["Coordinates"]).y);
	}
	if(this.circle2 != null){
		this.circle2.attr("r", 5)
	        .attr("cx", this.mapVis.Projection(this.data_B["Coordinates"]).x)
	        .attr("cy", this.mapVis.Projection(this.data_B["Coordinates"]).y);
	}
    // if(this.piSvg == null){this.DataProcess();};
    this.DataProcess();
}

MapLog.prototype.RComputeLineSeg = function(x1,y1, x2,y2){

		var midX = x2 - x1;
		var midY = y2 - y1;
		if(midX > midY){
			MapLog.RCurve( x1, y1, midX, y1, midX, y2, x2, y2, "hsb(.6, .75, .75)");
			//return x1, y1, midX, y1, midX, y2, x2, y2;
		}else{
			MapLog.RCurve( x1, y1, x1, midY, x2, midY, x2, y2, "hsb(.6, .75, .75)");
		}

 
	
	// midPt(200, 200, 670, 400);
	//MapLog.RCurve(midPt(200, 200, 670, 400), "hsb(.6, .75, .75)");
	
	//MapLog.RCurve(100, 100, 410, 100, 430, 200, 470, 200, "hsb(.6, .75, .75)");
}


MapLog.prototype.DataProcess = function(){
	var d = MapLog.Data;
	console.log(d);

	var data_A_key = this.data_A.CountryID1
	var data_B_key = this.data_B.CountryID1

	var fillteredData = []
	for (var i = 0, ic = d.length;  i < ic; ++i) {
		 if(d[i].to_code.includes(data_A_key) && d[i].from_code.includes(data_B_key)){
		 	fillteredData.push(d[i]);
		 }
	}
	var outData = {"sum_articles": 0, "count_actions" : 0};
	if(fillteredData.length != 0){
		// {sum_articles: 67, to_code: "CAF", avg_gs: 2.154, count_actions: 20, from_code: "ESP"}
			for (var i = 0, ic = fillteredData.length;  i < ic; ++i) {
				outData.sum_articles += +fillteredData[i].sum_articles;
				outData.count_actions += +fillteredData[i].count_actions;
			}
		this.visData = outData;
		this.DrawVisUpdate();
	}

}
MapLog.prototype.DrawVisUpdate = function(){

	
	var width = 200;
	var height = 200;
	if(this.piSvg != null) $(".MapLogSubTopDiv4" + this.div.id).remove();
	this.piSvg = d3.select("#MapLogSubTopDiv4-" + this.div.id).append("svg")
				.attr("class","MapLogSubTopDiv4" + this.div.id)
				.attr("width", width)
				.attr("height", height)
				//.attr("class", "svg")
				.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



	// Initialize the data
	var d2 = this.visData.count_actions;
	var d1 = this.visData.sum_articles - d2;
	var data = [d1,d2];
	// Define a default pie layout
	var pie = d3.layout.pie();
	// Ordinal color scale (10 default colors)
	var color = ["#D4D4D4","#A7A7A7","#D4D4D4","#A7A7A7","#D4D4D4","#A7A7A7","#D4D4D4","#A7A7A7"] //, d3.scale.category10();
	// Pie chart settings
	var outerRadius = width / 2;
	var innerRadius = width / 7; // Relevant for donut charts
	// Path generator for the pie segments
	var arc = d3.svg.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius);
	// Append a group for each pie segment
	var g = this.piSvg.selectAll(".arc")
				.data(pie(data))
				.enter()
				.append("g")
				.attr("class", "arc");

	// Use the path generator to draw the arcs
	g.append("path")
				.attr("d", arc)
				// .style("fill",  function(d, index) { return color(index); })
				.style("stroke-width", 1)
				.style("stroke", "gray")
				.style("stroke-opacity", 0.4)
				.style("fill-opacity", 0.2);
	g.append("text")
			    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			    //.attr("transform", "translate( 0," + (-15) + ")")
			    .attr("dy", ".35em")
			    .text(function(d, i) {
			    	if (i ==0){ 
			    		return "other :" + d.value;
				    } else{
				    	return "to :" + d.value;
				    }
			    	//return d.data.age; 
			    });
	g.append("text")
				.attr("x", width/2 -100)
				.attr("y", height /2 - 100)
				.text( ((d1 + d2) / d2).toString().slice(0,4)+"%");

}

MapLog.prototype.OnMouseDown = function(e) {
	// e.stopPropagation();
	// var pos = this.getMouseLocation(e);
	// this.div.style.left = pos.x;
	// this.div.style.top = pos.y;
	this.capture = true;
	console.log("click");

}

MapLog.prototype.OnMouseMove = function(e) {
	e.preventDefault();
	if(this.capture){

		//this.div.style.cursor=cursorStyle;
		console.log("move");
		// console.log(e);
	}

	// this.setValue(this.x2Value(getMouseLocation(_e, this.canvas).x));
}
MapLog.prototype.OnMouseUp = function(e) {
	// e.stopPropagation();
	// var pos = this.getMouseLocation(e);
	// this.div.style.left = pos.x;
	// this.div.style.top = pos.y;
	// console.log(e);
	console.log("up");
	this.capture = false;
	// this.setValue(this.x2Value(getMouseLocation(_e, this.canvas).x));
}
MapLog.prototype.getMouseLocation = function(_event) {
	var rect = this.mainDiv.getBoundingClientRect();
	return {x:_event.clientX - rect.left, y:_event.clientY - rect.top};
}




d3.json("data/data.json", function(error, json) {
  if (error) return console.warn(error);
  MapLog.Data = json;

});


MapLog.DataTemp = null;
MapLog.posIncrease = 5;
MapLog.counter = 1;
MapLog.mapList = [];
MapLog.raphael = Raphael("map", "100%", "100%")
MapLog.raphael.canvas.setAttribute('class', 'Rcanvas');
MapLog.raphael.canvas.setAttribute("position", "absolute");
MapLog.raphael.canvas.setAttribute("z-index", 1);
MapLog.discattr = {fill:"rgba(124,240,10,0.5)", stroke: "none", id:"rCanvas"};


MapLog.AddMapLog = function(){
	new MapLog("map", mapVis);
	console.log("the number of Log: " + MapLog.mapList.length);
}
MapLog.GetRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


MapLog.RCurve = function (x, y, ax, ay, bx, by, zx, zy, color) {
    var path = [["M", x, y], ["C", ax, ay, bx, by, zx, zy]],
        path2 = [["M", x, y], ["L", ax, ay], ["M", bx, by], ["L", zx, zy]],
        curve = MapLog.raphael.path(path).attr({stroke: color || Raphael.getColor(), "stroke-width": 4, "stroke-linecap": "round"}),
        controls = MapLog.raphael.set(
            MapLog.raphael.path(path2).attr({id: "rCurve", stroke: "#ccc", "stroke-dasharray": ". "}),
            MapLog.raphael.circle(x, y, 5).attr(MapLog.discattr),
            MapLog.raphael.circle(ax, ay, 5).attr(MapLog.discattr),
            MapLog.raphael.circle(bx, by, 5).attr(MapLog.discattr),
            MapLog.raphael.circle(zx, zy, 5).attr(MapLog.discattr)
        );
    controls[1].update = function (x, y) {
        var X = this.attr("cx") + x,
            Y = this.attr("cy") + y;
        this.attr({cx: X, cy: Y});
        path[0][1] = X;
        path[0][2] = Y;
        path2[0][1] = X;
        path2[0][2] = Y;
        controls[2].update(x, y);
    };
    controls[2].update = function (x, y) {
        var X = this.attr("cx") + x,
            Y = this.attr("cy") + y;
        this.attr({cx: X, cy: Y});
        path[1][1] = X;
        path[1][2] = Y;
        path2[1][1] = X;
        path2[1][2] = Y;
        curve.attr({path: path});
        controls[0].attr({path: path2});
    };
    controls[3].update = function (x, y) {
        var X = this.attr("cx") + x,
            Y = this.attr("cy") + y;
        this.attr({cx: X, cy: Y});
        path[1][3] = X;
        path[1][4] = Y;
        path2[2][1] = X;
        path2[2][2] = Y;
        curve.attr({path: path});
        controls[0].attr({path: path2});
    };
    controls[4].update = function (x, y) {
        var X = this.attr("cx") + x,
            Y = this.attr("cy") + y;
        this.attr({cx: X, cy: Y});
        path[1][5] = X;
        path[1][6] = Y;
        path2[3][1] = X;
        path2[3][2] = Y;
        controls[3].update(x, y);
    };
    controls.drag(MapLog.Rmove, MapLog.Rup);
}

MapLog.Rmove = function (dx, dy) {
    this.update(dx - (this.dx || 0), dy - (this.dy || 0));
    this.dx = dx;
    this.dy = dy;
}

MapLog.Rup = function() {
    this.dx = this.dy = 0;
}




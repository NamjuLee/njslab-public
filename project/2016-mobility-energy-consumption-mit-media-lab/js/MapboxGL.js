

function MapboxGL(theDiv,zoomFactor, _pitch, navigable, data){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzaWduanUiLCJhIjoidHg5UEpHZyJ9.5MOMo3JQ2YgppKYf9ajEMg';
    this.map = new mapboxgl.Map({
                    container: theDiv, //ex 'map', // container id
                    style: 'mapbox://styles/designju/cild5molw008w9pkne3c8ydgw', //hosted style id
                    center: [-71.067273, 42.344914 ], // starting position
                    zoom: zoomFactor, //2, // starting zoom
                    pitch: _pitch, // pitch in degrees 45
                    bearing: 0.0 // bearing in degrees
                    });
    this.dataPath = data;
    this.theDiv = theDiv;

    if(true){
        console.log("dd")
        this.map.addControl(new mapboxgl.Navigation());
        this.map.on("viewreset", this.Update);
        this.map.on("move", this.Update);
    }
   // console.log(this.Update());
    this.LoadData();
};

MapboxGL.prototype.LoadData=function() {

    var vis = this;
    queue().defer(d3.json, vis.dataPath)
            .await(function(error, data){
                vis.rawData = data
                vis.DataPrcess();

                // for (var i = 0; i < 4; ++i) {
                //     new MapLog("map", mapVis);              
                // };
                

            });
    $( window ).resize(function() {
            vis.Update();
    });
};

MapboxGL.prototype.DataPrcess = function() {
    var vis = this;
    // after data process, we need to update the Visdata to visualze
    vis.VisData = this.rawData  
    //
	vis.VisMap();
};

MapboxGL.prototype.VisMap = function(){
    var vis = this;
    this.theSvg = d3.select("#" + this.theDiv)
                        .append("svg")
                        .attr("class", "d3Canvas")
                        .attr("id", "d3Canvas")
                        .attr("height", "100%")
                        .attr("width", "100%")
                        .attr("z-index", 3)
                        .style("position","absolute");

    this.circle = this.theSvg
                        .selectAll("circle")
                        .data(vis.VisData)
                        .enter()
                        .append("circle")
                        .attr({
                            "class":"cir",
                            // "stroke": "red",
                            "fill": "red",
                            "fill-opacity": 0.2,
                            "r":2
                        })
                        .on("click", function(d){
                            MapLog.DataTemp = d;
                            console.log(d);
                        });
    this.Update()           
};

MapboxGL.prototype.Update = function() {
    var vis = this;
    console.log("log")
    console.log(vis);

    vis.circle
        .attr("cx", function(d){
            return vis.Projection(d.coordinates).x;
        })
        .attr("cy", function(d){
            return vis.Projection(d.coordinates).y; 
        })
        .attr("r", function(d){
            return 5;
        });

    // vis.map.on("viewreset", this.Update);
    // vis.map.on("move", this.Update);

}

MapboxGL.prototype.Projection = function(d) {
    return this.map.project(new mapboxgl.LngLat(+d[1], +d[0]));
};



    

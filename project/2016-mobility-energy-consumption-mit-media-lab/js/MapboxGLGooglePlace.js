

function MapboxGLGooglePlace(theDiv,zoomFactor, _pitch, navigable, data){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzaWduanUiLCJhIjoidHg5UEpHZyJ9.5MOMo3JQ2YgppKYf9ajEMg';
    this.map = new mapboxgl.Map({
                    container: theDiv, //ex 'map', // container id
                    style: 'mapbox://styles/designju/cild5molw008w9pkne3c8ydgw', //hosted style id
                    center: [-71.086053 , 42.362484], // starting position
                    zoom: zoomFactor, //2, // starting zoom
                    pitch: _pitch, // pitch in degrees 45
                    bearing: 0.0, // bearing in degrees
                    interactive: false
                    });
    this.dataPath = data;
    this.theDiv = theDiv;
    self = this;
    $("#selection_01").on("change", function(d) {
            var selBox = document.getElementById('selection_01');
            var selValue = selBox.options[selBox.selectedIndex].value;
            self.DataPrcess(selValue)
        });
    $("#theBtn").on("click", function(d) {
            var selBox = document.getElementById('selection_01');
            var selValue = selBox.options[selBox.selectedIndex].value;
            self.Remove();
  
        });

    if(true){
        console.log("dd")
        this.map.addControl(new mapboxgl.Navigation());
        this.map.on("viewreset", this.Update);
        this.map.on("move", this.Update);
    }
   // console.log(this.Update());
    this.LoadData();
    
};

MapboxGLGooglePlace.prototype.LoadData=function() {

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
MapboxGLGooglePlace.prototype.DataPrcess = function(theIndex) {
    var vis = this;
    // after data process, we need to update the Visdata to visualze
    if(theIndex != null){
        vis.VisData = this.rawData[theIndex] 
    }else{
        vis.VisData = this.rawData['school'] 
    }
    //
	vis.VisMap();
};
MapboxGLGooglePlace.prototype.Remove = function(){
    var vis = this;
    this.circle = d3.select("#d3Canvas").remove();
                    // .exit()
                    // .transition()
                    // .delay(3000)
                    
};
MapboxGLGooglePlace.prototype.VisMap = function(){
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
                            "class":"cirGooglePlace",
                            // "stroke": "red",
                            "fill": "purple",
                            "fill-opacity": 0.5,
                            "r":0.5
                        })
                        .on("click", function(d){
                            $("#maplog").html("<p>type:"+d.type +"<br>" +
                                              "lat:" + d.lat +"<br>" +
                                              "long:"+ d.long +"</p>");
                            console.log(d);
                        });
    this.Update()           
};

MapboxGLGooglePlace.prototype.Update = function() {
    var vis = this;
    console.log("log")
    console.log(vis);

    vis.circle
        .attr("cx", function(d){

            return vis.Projection(d).x;
        })
        .attr("cy", function(d){
            return vis.Projection(d).y; 
        })
        .attr("r", function(d){
            return 3;
        });

    // vis.map.on("viewreset", this.Update);
    // vis.map.on("move", this.Update);

}

MapboxGLGooglePlace.prototype.Projection = function(d) {
    return this.map.project(new mapboxgl.LngLat(+d['long'], +d['lat']));
};



    

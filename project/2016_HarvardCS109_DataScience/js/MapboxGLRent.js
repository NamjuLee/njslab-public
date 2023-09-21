
function MapboxGLRent(theDiv,zoomFactor, _pitch, navigable, data){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzaWduanUiLCJhIjoidHg5UEpHZyJ9.5MOMo3JQ2YgppKYf9ajEMg';
    this.map = new mapboxgl.Map({
                    container: theDiv, //ex 'map', // container id
                    style: 'mapbox://styles/designju/cild5molw008w9pkne3c8ydgw', //hosted style id
                    center: [-71.067273, 42.314914 ], // starting position
                    zoom: zoomFactor, //2, // starting zoom
                    pitch: _pitch, // pitch in degrees 45
                    bearing: 0.0 // bearing in degrees
                    });
    this.dataPath = data;
    this.theDiv = theDiv;

    if(true){
        this.map.addControl(new mapboxgl.Navigation());
        this.map.on("viewreset", this.Update);
        this.map.on("move", this.Update);
    }
    this.LoadData();
};
MapboxGLRent.prototype.LoadData=function() {

    var vis = this;

    queue().defer(d3.json, vis.dataPath)
            .await(function(error, data){
                vis.rawData = data
                vis.DataPrcess();

            });
    $( window ).resize(function() {
            vis.Update();
    });
};
MapboxGLRent.prototype.DataPrcess = function() {
    var vis = this;
    // after data process, we need to update the Visdata to visualze
    vis.VisData = this.rawData  
	vis.VisMap();
};
MapboxGLRent.prototype.VisMap = function(){
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
                            "fill": "purple",
                            "fill-opacity": 0.5,
                            "r":2
                        })
                        .on("click", function(d){
                            $("#maplogRent").html("<p>address:" + d.Address +"<br>" +          
                                              "zip:" + d.Zip +"<br>" +                        
                                              "Price: $" + d.Price +"<br>" +                           
                                              "Date:" + d.Date +"<br>" +
                                              "SQFT:" + d.SQFT +"<br>" +                     
                                              "lat:" + (+d.Latitude) +"<br>" +
                                              "long:"+ (+d.Longitude) +"</p>");
                        });
    this.Update()           
};
MapboxGLRent.prototype.Update = function() {
    var vis = this;

    vis.circle
        .attr("cx", function(d){

            theCoordinates = [d.Longitude, d.Latitude]
            return vis.Projection(theCoordinates).x;
        })
        .attr("cy", function(d){
            theCoordinates = [d.Longitude, d.Latitude]
            return vis.Projection(theCoordinates).y; 
        })
        .attr("r", function(d){
            try {
                str = d.prices.replace(/[^\d\.\-]/g, ""); 
                var num = parseFloat(str);
                return 2 + (num* 0.000002);
            }
            catch(err) {
                return 2
            }
        });

    // vis.map.on("viewreset", this.Update);
    // vis.map.on("move", this.Update);

}
MapboxGLRent.prototype.Projection = function(d) {
    return this.map.project(new mapboxgl.LngLat(+d[0], +d[1]));
};



    



function MapboxGLGoogleStreet(theDiv,zoomFactor, _pitch, navigable, data){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzaWduanUiLCJhIjoidHg5UEpHZyJ9.5MOMo3JQ2YgppKYf9ajEMg';
    this.map = new mapboxgl.Map({
                    container: theDiv, //ex 'map', // container id
                    style: 'mapbox://styles/designju/cild5molw008w9pkne3c8ydgw', //hosted style id
                    center: [-71.067273, 42.335914 ], // starting position
                    zoom: zoomFactor, //2, // starting zoom
                    pitch: _pitch, // pitch in degrees 45
                    bearing: 0.0, // bearing in degrees
                    interactive: false
                    });

    this.dataPath = data;
    this.theDiv = theDiv;
    var self = this;
    $("#selection_02").on("change", function(d) {
            var selBox = document.getElementById('selection_02');
            var selValue = selBox.options[selBox.selectedIndex].value;
            self.DataPrcess(selValue)
        });

    if(true){

        this.map.addControl(new mapboxgl.Navigation());
        this.map.on("viewreset", this.Update);
        this.map.on("move", this.Update);
    }
   // console.log(this.Update());
    this.theIndex  = "tree"
    this.LoadData();
    
};

MapboxGLGoogleStreet.prototype.LoadData=function() {

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
MapboxGLGoogleStreet.prototype.DataPrcess = function(theIndex) {
    var vis = this;
    // // after data process, we need to update the Visdata to visualze
    // if(theIndex != null){
    //     vis.VisData = this.rawData[theIndex] 
    // }else{
    //     vis.VisData = this.rawData['school'] 
    // }
    // //
    vis.Remove();
    vis.theIndex = theIndex;
    vis.VisData = this.rawData.data
	vis.VisMap();
};
MapboxGLGoogleStreet.prototype.Remove = function(){
    var vis = this;
    this.circle = d3.select("#d3CanvasGoogleStreetView").remove();
                    // .exit()
                    // .transition()
                    // .delay(3000)
                    
};
MapboxGLGoogleStreet.prototype.VisMap = function(){
    var vis = this;
    this.theSvg = d3.select("#" + this.theDiv)
                        .append("svg")
                        .attr("class", "d3CanvasGoogleStreetView")
                        .attr("id", "d3CanvasGoogleStreetView")
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
                            "fill-opacity": 0.5,
                            "r":0.7
                        })
                        .attr("fill", function(d){
                            
                            try{
                                // console.log("the index is" + vis.theIndex)
                                for(var i in d){
                                    theI = d[i][0]
                                    // console.log(theI)
                                    // console.log(typeof(theI))

                                    // console.log(theI.includes(vis.theIndex)); 
                                    // console.log("this is d")
                                    // console.log(theI)
                                    if(theI.includes(vis.theIndex)){
                                        var numericVal = d[i][1]
                                        console.log(vis.theIndex)
                                        // if(vis.theIndex.includes("tree")) return rgb(0,255,0)
                                        // if(vis.theIndex.includes("sky"))return rgb(0,0,255)
                                        return "green"
                                        
                                    }
                                }

                            }catch(err){
                            //         console.log("error")
                                return "purple";
                             }



                            // console.log(vis.theIndex);
                            // return "purple";
                        })
                        .on("click", function(d){
                            $("#maplog").html("<p>type:"+d.type +"<br>" +
                                              "lat:" + d.lat +"<br>" +
                                              "long:"+ d.long +"</p>");
                        })
                        .on("mouseover", function(d) {
                            var div = document.getElementById("googleStreetLog");
                            // div.class = "tipImg";
                            // div.style.background = "#1a5559";
 

                            theJsonDataForSeg = []
                            for(var i in d){
                                try{
                                   i = parseFloat(i)
                                   theSegJson = {}
                                   theSegJson["label"] = d[i][0]
                                   theSegJson["value"] = d[i][1]
                                   theJsonDataForSeg.push(theSegJson)
                                }catch(err){
                                }
                            }

                            theData = theJsonDataForSeg;

                            vis.pie = new d3pie("thePieChart", {
                                header: {
                                    title: {
                                        text: "semantic segmentation",
                                        color: "#333333",
                                        fontSize: 13
                                    },
                                    location: "pie-center"
                                },
                                size: {
                                        pieInnerRadius: "80%",
                                        canvasHeight: 300, 
                                        canvasWidth: 450
                                },
                                data: {
                                    sortOrder: "label-asc",
                                    content: theData
                                },
                                misc: {
                                    colors: {
                                    segments: ["#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1","#b160b1"] 
                                    }
                                }
                            });


                            
                            var list = {}
                            for(var j in theData){

                                    list[theData[j]['label']] = theData[j]['value'] 

                            }
                            var sortable = [];
                            for (var item in list)
                                sortable.push([item, list[item]])

                            sortable.sort(function(a, b) {
                                return a[1] - b[1]
                            })
                            // console.log(sortable)


                            div.style.color = "white";


                            try {
                                texts  = "<img src='img/imgStreetThumbnail/" + d["node_id"] + "_thumbnail.jpg" + "' id='streetImage' width='520px'></br>";
                                // var inliersMatched = d["data obj/o3.jpg"];
                                // var v1 = inliersMatched.split("-");
                                // var v2 = v1[1].split(":");
                                // console.log(inliersMatched)
                                var total = 384 * 384 * 5
                                var the1 = (sortable[sortable.length-1][1]+0.01) / total * 100
                                var the2 = (sortable[sortable.length-2][1]+0.01) / total * 100
                                var the3 = (sortable[sortable.length-3][1]+0.01) / total * 100
                                var the4 = (sortable[sortable.length-4][1]+0.01) / total * 100
                                var the5 = (sortable[sortable.length-5][1]+0.01) / total * 100
                                var the6 = (sortable[sortable.length-6][1]+0.01) / total * 100

                                texts += "<spam id='dataContent_A'> 1st:  "+ the1.toString().slice(0,4) +" % for "+ sortable[sortable.length-1][0] +"</br>";
                                texts += "<spam id='dataContent_A'> 2nd:  "+ the2.toString().slice(0,4) +" % for "+ sortable[sortable.length-2][0] +"</br>";
                                texts += "<spam id='dataContent_A'> 3th:  "+ the3.toString().slice(0,4) +" % for "+ sortable[sortable.length-3][0] +"</br>";
                                texts += "<spam id='dataContent_A'> 4th:  "+ the4.toString().slice(0,4) +" % for "+ sortable[sortable.length-4][0] +"</br>";
                                texts += "<spam id='dataContent_A'> 5th:  "+ the5.toString().slice(0,4) +" % for "+ sortable[sortable.length-5][0] +"</br>";
                                texts += "<spam id='dataContent_A'> 6th:  "+ the6.toString().slice(0,4) +" % for "+ sortable[sortable.length-6][0] +"</br>";
                                // var maxIndex =  GetHightIndex(d);
                                // texts += "<img src='street/" + d["path obj/o" + maxIndex + ".jpg"]  + "' id='streetImage' height='150' width='600' ></br>";
                                // var theStreet = d["filename"].split("_")
                                // var theCoordin = d["coordinates"];
                                // texts += "<spam id='dataContent_A'>Street Name : " + theStreet[1] + "</br>Coordinates : " + theCoordin + " </spam> </br> </br>";
                                div.innerHTML = texts;
                            }
                            catch(err) {
                                div.innerHTML = "null";
                            }


                        })
                        .on("mouseout", function(d){
                            //RemoveToolTip(d);

                            // var maxIndex =  GetHightIndex(d);
                            // var referIndex = ".refer" + maxIndex
                            // console.log(referIndex)
                            // var referImage = d3.select(referIndex);
                            // console.log(referImage);
                            // referImage.style('opacity', 0.3)

                            if (vis.pie !== null) {
                                vis.pie.destroy();
                                vis.pie = null;
                            }
                         }); 
    this.Update()           
};

MapboxGLGoogleStreet.prototype.Update = function() {
    var vis = this;

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

MapboxGLGoogleStreet.prototype.Projection = function(d) {
    return this.map.project(new mapboxgl.LngLat(+d['coordinates'][0], +d['coordinates'][1]));
};














    

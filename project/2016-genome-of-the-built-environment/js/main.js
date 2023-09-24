






mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzaWduanUiLCJhIjoidHg5UEpHZyJ9.5MOMo3JQ2YgppKYf9ajEMg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/designju/cild5sy5m007u9nkicouzzndq', //hosted style id
    center: [ -73.989054, 40.742139], // starting position
    zoom: 12, // starting zoom
    pitch: 45, // pitch in degrees
    bearing: 0.0 // bearing in degrees
});

var container = map.getCanvasContainer()




queue()
    .defer(d3.json, "street/Ctown_Canal Street/Ctown-CanalStreet_streetviews._OpenCV.json")
    .defer(d3.json, "street/Ctown_ElizabethStreet/Ctown-ElizabethStreet_streetviews._OpenCV.json")
    .defer(d3.json, "street/Ctown_MottStreet/Ctown-MottStreet_streetviews._OpenCV.json")
    .defer(d3.json, "street/Ctown_Mulberry Street/Ctown-MulberryStreet_streetviews._OpenCV.json")
    //.defer(d3.csv, "data/global-malaria-2015.csv")
    .await(function(error, CanalStreet_streetviews, ElizabethStreet_streetviews, MottStreet_streetviews, MulberryStreet_streetviews){
    
    var data = $.merge(CanalStreet_streetviews, ElizabethStreet_streetviews);
    data = $.merge(data, MottStreet_streetviews); 
    data = $.merge(data, MulberryStreet_streetviews);
    mapDraw(data);
    });




//mapbox GL
function mapDraw(data){



    map.addControl(new mapboxgl.Navigation());

    
    var svg = d3.select(container).append("svg")
                                    .attr("class", "d3Canvas")
                                    .attr("height", "100%")
                                    .attr("width", "100%")
                                    .attr("z-index", 10)
                                    .attr("position","absolute");

    function project(d) {
        return map.project(new mapboxgl.LngLat(+d[0], +d[1]));
    } 

    // var transform = d3.geo.transform({point: projectPoint});
    // var path = d3.geo.path().projection(transform);
    
    var circle = svg.selectAll("circle")
                            .data(data)
                            .enter()
                            .append("circle")
                            .attr({
                                "class":"cir",
                                // "stroke": "red",
                                "fill": "black",
                                "fill-opacity": 0.4,
                                "r":6
                            });
    
    function update() {
            // 
        circle
            .attr("cx", function(d){
                return project(d.coordinates).x;
                // }
            })
            .attr("cy", function(d){
                return project(d.coordinates).y; 
            })
            .attr("r", function(d){
                var value = GetHightValue(d);
                return value/2;
            })
            .on("mouseover", function(d) {
                var div = document.getElementById("vis1");
                console.log(d);
                // div.class = "tipImg";
                // div.style.background = "#1a5559";
                div.style.color = "white";
                texts  = "<img src='street/" + d["File"]  + "' id='streetImage'></br>";
                var inliersMatched = d["data obj/o3.jpg"];
                var v1 = inliersMatched.split("-");
                var v2 = v1[1].split(":");
                console.log(inliersMatched)
                texts += "<spam id='dataContent_A'>Inliers / Matched : "+ v1[0] + " / " + v2[0] + "   Similarity : 0." + v2[1] + " % </spam></br>";
                var maxIndex =  GetHightIndex(d);
                texts += "<img src='street/" + d["path obj/o" + maxIndex + ".jpg"]  + "' id='streetImage' height='150' width='600' ></br>";
                var theStreet = d["filename"].split("_")
                var theCoordin = d["coordinates"];
                texts += "<spam id='dataContent_A'>Street Name : " + theStreet[1] + "</br>Coordinates : " + theCoordin + " </spam> </br> </br>";
                div.innerHTML = texts;

                var referIndex = ".refer" + maxIndex
                console.log(referIndex)
                var referImage = d3.select(referIndex);
                console.log(referImage);
                referImage.style('opacity', 1)
            })
            .on("mouseout", function(d){
                RemoveToolTip(d);

                var maxIndex =  GetHightIndex(d);
                var referIndex = ".refer" + maxIndex
                console.log(referIndex)
                var referImage = d3.select(referIndex);
                console.log(referImage);
                referImage.style('opacity', 0.3)


             });  
    }
    
    // map.on("viewreset", update)
    // map.on("movestart", function(){
    //     svg.classed("hidden", true);
    // }); 
    // map.on("rotate", function(){
    //     svg.classed("hidden", true);
    // }); 
    // map.on("moveend", function(){
    //     update()
    //     svg.classed("hidden", false);
    // })
    
    map.on("viewreset", update);
    map.on("move", update);
    

    update();
    visA();

    



}



function visA(){

}





MapBoxPopup() 




function projectPoint(lon, lat) {
    var point = map.project(new mapboxgl.LngLat(lon, lat));
    this.stream.point(point.x, point.y);
}



function RemoveToolTip(d){
  var div = document.getElementById("tipImg");
  if (!div) return;
  div.parentNode.removeChild(div);
}


function GetHightIndex(d){
    var index = d3.range(1,8);
    var maxValue;
    var maxIndex = 1;
    // console.log(index)
    for(var i in index){
        i++;
        if( i == 1 ){
            var tempString = d["data obj/o" + i + ".jpg"];
            var tempString2 = tempString.split(":")
            maxValue = tempString2[1]
            // console.log(tempString2);
        } else {
            var tempString = d["data obj/o" + i + ".jpg"];
            var tempString2 = tempString.split(":")
            if ( maxValue < tempString2[1]){
                maxIndex = i
            }
            // console.log(tempString2);
        }
    }
    // console.log(maxIndex)
    return maxIndex;
}

function GetHightValue(d){
    var index = d3.range(1,8);
    var maxValue;
    var maxIndex = 1;
    // console.log(index)
    for(var i in index){
        i++;
        if( i == 1 ){
            var tempString = d["data obj/o" + i + ".jpg"];
            var tempString2 = tempString.split(":")
            maxValue = tempString2[1]
            // console.log(tempString2);
        } else {
            var tempString = d["data obj/o" + i + ".jpg"];
            var tempString2 = tempString.split(":")
            if ( maxValue < tempString2[1]){
                maxIndex = i
            }
            // console.log(tempString2);
        }
    }
    // console.log(maxIndex)
    return maxValue;
}

// var mapDiv=document.getElementById("map")
// var newdiv=document.createElement("div"); 	//we create the bubble div that will display the text that users write. this div will be added to the user div as a sub element. So when the user div moves the bubble will move along
// newdiv.appendChild(mapDiv); 



// var visA = d3.select(container).append("svg")
//                                     .attr("class", "visA")
//                                     .attr("width", "400px")
//                                     .attr("height", "400px");
// console.log("dddddddddd")




// var dataPath = "data/CdataSample.csv";
// //var dataPath = "data/Crime_Incident_Reports_edit_01.csv";
// d3.csv(dataPath, function(d) {

// 	//var pos =[];
// 	d.filter(function(d){
// 		//console.log(d.Location)
// 		var dd = parseFloat(d.Location)
// 		var dd = d.Location.split(",",2);
// 		var x = parseFloat(dd[0].split("(")[1]);
// 		var y = parseFloat(dd[1].split(")")[0]);
// 	//console.log(d);
// 		// var x = parseFloat(d.X);
// 		// var y = parseFloat(d.Y);
// 		// console.log(x,y);
// 		//L.circle([y, x], 20).addTo(map);
// 		//updateVis(x,y);
// 	});
// //g.leaflet-clickable
	
// $("path").attr("fill","green")
// 		 .mouseover( function(d){
// 		 	console.log(d);
// 		 } );

//   //console.log(d.Location);
  



// });



// function pointOnCircle(angle) {
//     return {
//         "type": "Point",
//         "coordinates": [
//             Math.cos(angle) * radius,
//             Math.sin(angle) * radius
//         ]
//     };
// }



                        
                        

// Chinatown
// New York, NY
// 40.716602, -73.997224

// Little Italy
// New York, NY
// 40.719302, -73.997329

// Korean Town
// 40.746473, -73.987999

 
// 40.803061, 





////////////////////////////////////////////




// map.addSource("earthquakes", {
//         type: "geojson",
//         // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
//         // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
//         data: "../data/China-town.NYC.geojson",
//         cluster: true,
//         clusterMaxZoom: 14, // Max zoom to cluster points on
//         clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
//     });

//     // Use the earthquakes source to create five layers:
//     // One for non-clustered markers, three for each cluster category,
//     // and one for cluster labels.
//     map.addLayer({
//         "id": "non-cluster-markers",
//         "type": "symbol",
//         "source": "earthquakes",
//         "layout": {
//             "icon-image": "marker-15"
//         }
//     });















// console.log("d");

// $.getJSON( "data/xy.json", function( data ) {

//     console.log(data);
//     var markers = data
//     map.on('style.load', function() {
//         // Add marker data as a new GeoJSON source.
//         map.addSource("markers", {
//             "type": "geojson",
//             "data": markers
//         });

//         // Add a layer showing the markers.
//         map.addLayer({
//             "id": "markers",
//             "interactive": true,
//             "type": "symbol",
//             "source": "markers",
//             "layout": {
//                 "icon-image": "{marker-symbol}-15",
//                 "icon-allow-overlap": true
//             }
//         });
//     });

// });



// $.getJSON( "data/test.json", function( data ) {

//     console.log(data);
    
//     var markers = data;

//     map.on('style.load', function() {
//         // Add marker data as a new GeoJSON source.
//         map.addSource("markers", {
//             "type": "geojson",
//             "data": markers
//         });

//         // Add a layer showing the markers.
//         map.addLayer({
//             "id": "markers",
//             "interactive": true,
//             "type": "symbol",
//             "source": "markers",
//             "layout": {
//                 "icon-image": "{marker-symbol}-15",
//                 "icon-allow-overlap": true
//             }
//         });
//     });

//     map.on('mousemove', function(e) {
//         map.featuresAt(e.point, {
//             radius: 7.5, // Half the marker size (15px).
//             includeGeometry: true,
//             layer: 'markers'
//         }, function(err, features) {
//             // Change the cursor style as a UI indicator.
//             map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';

//             if (err || !features.length) {
//                 popup.remove();
//                 return;
//             }

//             var feature = features[0];

//             // Populate the popup and set its coordinates
//             // based on the feature found.
//             popup.setLngLat(feature.geometry.coordinates)
//                 .setHTML(feature.properties.description)
//                 .addTo(map);
//         });
//     });
// });


// var popup = new mapboxgl.Popup({
//     closeButton: false,
//     closeOnClick: false
// });























//d3.json(data, {function(){

// map.on('style.load', function () {
// 	console.log("kkkkkkkkkkkkkkkk");
//     map.addSource('maine', 
//     		"/data/education_01.json"
//     	);

//     map.addLayer({
//         'id': 'route',
//         'type': 'fill',
//         'source': 'maine',
//         'layout': {},
//         'paint': {
//             'fill-color': '#088',
//             'fill-opacity': 0.8
//         }
//     });
// });

// });

//  45.137451890638886,-67.13734351262877
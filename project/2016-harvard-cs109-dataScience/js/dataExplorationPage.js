$( document ).ready(function() {




    var mapVis1 = new MapboxGLGooglePlace("map1", 11.5, 0, false, "data/_GooglePlaceData.json");


    var mapVis3 = new MapboxGL("map3", 11.0, 0, false, "data/_CrimeData.json");

    var mapVis4 = new MapboxGLHousing("map4", 11.0, 0, false, "data/_HousingPriceFromWebTestWithPropertiesData.json");

    var mapVis5 = new MapboxGLRent("map5", 11.0, 0, false, "data/_RentPrice.json");


    var mapVis2 = new MapboxGLGoogleStreet("map2", 11, 0, false, "data/_DeepLearningSegData.json");




// var dummyData = GetDummyDataForParallelCoordinate();
// var ParallelCoordinatesDiv = document.getElementById("ParallelCoordinatesDiv");

// new ParallelCoordinatesInit("ParallelCoordinatesDiv", dummyData, "design space - Parallel coordinate" );



// var dataFromYou = [
//     {
//         "name": "Talks",
//         "children": [
//             {
//                 "name": "talk_1",
//                 "size": 722,
//                 "url": "www.example_1.com"
//             },
//             {
//                 "name": "talk_2",
//                 "size": 722,
//                 "url": "www.example_2.com"
//             },
//             {
//                 "name": "talk_3",
//                 "size": 722,
//                 "url": "www.example_3.com"
//             }
//         ]
//     }
// ];

// var data = dataFromYou[0].children;

// var width = 800,
//     height = 250,
//     radius = Math.min(width, height) / 2;

// var color = d3.scale.ordinal()
//     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// var arc = d3.svg.arc()
//     .outerRadius(radius - 10)
//     .innerRadius(radius - 70);

// var pie = d3.layout.pie()
//     .sort(null)
//     .value(function (d) {
//     return d.size;
// });






// var svg = d3.select("#").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//     var g = svg.selectAll(".arc")
//         .data(pie(data))
//         .enter().append("g")
//         .attr("class", "arc");

//     g.append("path")
//         .attr("d", arc)
//         .style("fill", function (d) {
//         return color(d.data.name);
//     });

//     g.append("text")
//         .attr("transform", function (d) {
//         return "translate(" + arc.centroid(d) + ")";
//     })
//         .attr("dy", ".35em")
//         .style("text-anchor", "middle")
//         .text(function (d) {
//         return d.data.size;
//     });




// d3.scale.ordinal()
// .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
// "#999999", "#888888", "#777777", "#666666", "#555555", "#444444", "#333333", "#222222"










});
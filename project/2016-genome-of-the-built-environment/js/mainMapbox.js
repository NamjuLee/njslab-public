// L.mapbox.accessToken = 'pk.eyJ1IjoiZGVzaWduanUiLCJhIjoidHg5UEpHZyJ9.5MOMo3JQ2YgppKYf9ajEMg';
// //streets pirates  dark  pencil 'fcc.map-toolde8w' 'mapbox.dark'
// var map = L.mapbox.map('map2', 'Light-copy')
//       		.setView([40.772807, -73.971295], 13);


L.mapbox.accessToken = 'pk.eyJ1IjoiZGVzaWduanUiLCJhIjoiNWYwZTI4NjEyOTRkNjVjMjIwNzQ0NWUzYWVkZWU5OWEifQ.YgcrEnTPmwEemcYvKtQyGw';
//streets pirates  dark  pencil 'fcc.map-toolde8w' 'mapbox.dark'
var map = L.mapbox.map('map2', 'fcc.map-toolde8w')
            .setView([40.742139, -73.989054], 12);


// var dataPath = "data/CdataSample.csv";
// //var dataPath = "data/Crime_Incident_Reports_edit_01.csv";
// d3.csv(dataPath, function(d) {

//     //var pos =[];
//     d.filter(function(d){
//         //console.log(d.Location)
//         var dd = parseFloat(d.Location)
//         var dd = d.Location.split(",",2);
//         var x = parseFloat(dd[0].split("(")[1]);
//         var y = parseFloat(dd[1].split(")")[0]);
//     //console.log(d);
//         // var x = parseFloat(d.X);
//         // var y = parseFloat(d.Y);
//         // console.log(x,y);
//             L.circle([x, y], 20).addTo(map);

    

//     });
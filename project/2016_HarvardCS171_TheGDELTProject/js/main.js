var allData = [];

// Variable for the visualization instance
var stationMap;
var slider;

// Start application by loading the data
loadData();


function loadData() {

  // Hubway XML station feed
  //var url = 'https://www.thehubway.com/data/stations/bikeStations.xml';

  // TO-DO: LOAD DATA
  // Build YQL query (request whole JSON feed from the given url)

  // Send an asynchronous HTTP request with jQuery
  d3.json('data/data-total1.json', function(jsonData) {
    allData = jsonData;
    allData = allData.sort(function compareNumbers(a, b) {
      return b.NUMARTS - a.NUMARTS;
    });
    console.log(allData);

    createVis();

  });
}


function createVis() {

  // TO-DO: INSTANTIATE VISUALIZATION
  stationMap = new StationMap("station-map", allData, [10, 20]);
  slider = new Timeline("slider", allData);

};



/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

StationMap = function(_parentElement, _data,_mapPosition) {
  this.parentElement = _parentElement;
  this.data = _data;
  this.position = _mapPosition;
  console.log(_data);

  this.initVis();
};


/*
 *  Initialize station map
 */

StationMap.prototype.initVis = function() {
  var vis = this;

  this.map = L.map('station-map').setView(this.position, 2);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contrib utors' }).addTo(this.map);

  vis.date = "20160420";

  vis.wrangleData();
};


/*
 *  Data wrangling
 */

StationMap.prototype.wrangleData = function() {
  var vis = this;

  // Currently no data wrangling/filtering needed
  vis.displayData = vis.data.filter(function(d){return d.DATE == vis.date;});
  console.log(vis.displayData);

  // Update the visualization
  vis.updateVis();
};


/*
 *  The drawing function
 */

StationMap.prototype.updateVis = function() {
  var vis = this;
  console.log(this.map);

  vis.events = L.layerGroup().addTo(this.map);

  for (var i = 0; i < this.displayData.length; i++) {
    var popupContent = this.displayData[i].NUMARTS + ' articles';
    var lat = this.displayData[i].GEO_LAT;
    var long = this.displayData[i].GEO_LONG;

    var circle = L.circle([lat, long], Math.sqrt(this.displayData[i].NUMARTS)*10000, {
      stroke: false,
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.2 }).bindPopup(popupContent);

    this.events.addLayer(circle);

  };


};

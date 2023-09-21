


function MapBoxPopup() {

var town1 = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat([ -73.986776, 40.747711]) // -73.989054, 40.742139
    .setHTML('<h1 class="tooltip">Korean Town!</h1>')
    .addTo(map);

var town2 = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat([-73.997224, 40.716602])
    .setHTML('<tooltip> <h1 class="tooltip">China Town!</h1> <tooltip>')
    .addTo(map);

var town3 = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat([ -73.997363, 40.719340])
    .setHTML('<h1 class="tooltip">Little Italy!</h1>')
    .addTo(map);

var town4 = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat([-73.952220, 40.803061])
    .setHTML('<tooltip> <h1 class="tooltip">Le Petit Senegal </h1> <tooltip>')
    .addTo(map);

console.log("popupDone")

}







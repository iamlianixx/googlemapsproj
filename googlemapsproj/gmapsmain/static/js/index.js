let map;
var renderedCircle;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
  });

  if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
         var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         map.setCenter(initialLocation);
     });
 }
}

function renderCircle() {
    
    if(document.getElementById("areaCheck").checked) {
        renderedCircle = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: map.getCenter(),
            radius: 5000,
        });
    
    } else {
        if(renderedCircle != null) {
            renderedCircle.setMap(null);
            renderedCircle = null;
        }
    }
}


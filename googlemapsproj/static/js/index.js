let map;
let service;
let infowindow;
let markers = [];
var renderedCircle;
var initialLocation;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
  });

  initialLocation = new google.maps.LatLng(10.3099,123.893);
  map.setCenter(initialLocation);

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
       radius: 10000,                                            
     });
    
    } else {
        renderedCircle.setMap(null);
        renderedCircle = null;
    }

    getCircleRestaurants();
}

function getFilRestos() {

	if(document.getElementById("filipinoRestos").checked) {
		document.getElementById("allRestos").checked = false;
		document.getElementById("seafoodRestos").checked = false;
		document.getElementById("cafes").checked = false;
	
		
     var request = {
     	 query: 'filipino',
         type: 'restaurant',
         location: new google.maps.LatLng(10.3099,123.893),                                             
         radius: 10000,
     };

     searchPlaces(request);

    } else {
    	deleteMarkers();
    }
 
}

function getSeafoodRestos() {

    if(document.getElementById("seafoodRestos").checked) {
     
     document.getElementById("allRestos").checked = false;
	 document.getElementById("filipinoRestos").checked = false;
	 document.getElementById("cafes").checked = false;

     var request = {
     	 query: 'seafood',
         type: 'restaurant',
         location: new google.maps.LatLng(10.3099,123.893),                                             
         radius: 10000,
     };

     searchPlaces(request);
    } else {
        deleteMarkers();
    }
 
}

function getCafes() {
 
    if(document.getElementById("cafes").checked) {
     document.getElementById("allRestos").checked = false;
	 document.getElementById("seafoodRestos").checked = false;
	 document.getElementById("filipinoRestos").checked = false;

     var request = {
         type: 'cafe',
         location: new google.maps.LatLng(10.3099,123.893),                                             
         radius: 10000,
     };

     searchPlaces(request);
    } else {
        deleteMarkers();
    }
 
}

function getCircleRestaurants() {

    if(document.getElementById("allRestos").checked) {
        document.getElementById("allRestos").checked = false;
    }

     getAllRestos();

}

function getAllRestos() {

	if(document.getElementById("allRestos").checked
		|| document.getElementById("areaCheck").checked) {
		
		if(document.getElementById("filipinoRestos").checked) {
			document.getElementById("filipinoRestos").checked = false;
		}

		if(document.getElementById("seafoodRestos").checked) {
			document.getElementById("seafoodRestos").checked = false;
		}

		if(document.getElementById("cafes").checked) {
			document.getElementById("cafes").checked = false;
		}
		
		var filRequest = {
     	 query: 'filipino',
         type: 'restaurant',
         location: new google.maps.LatLng(10.3099,123.893),                                             
         radius: 10000,
        };

        var seafoodRequest = {
     	 query: 'seafood',
         type: 'restaurant',
         location: new google.maps.LatLng(10.3099,123.893),                                             
         radius: 10000,
        };

        var cafeRequest = {
         type: 'cafe',
         location: new google.maps.LatLng(10.3099,123.893),
         radius: 10000,
        };

        searchPlaces(filRequest);
        searchPlaces(seafoodRequest);
        searchPlaces(cafeRequest);

	} else {
		deleteMarkers();
	}

}

function searchPlaces(request) {
     service = new google.maps.places.PlacesService(map);
     service.textSearch(request, (results, status) => {
         if (status === google.maps.places.PlacesServiceStatus.OK) {
             for (let i = 0; i < results.length; i++) {
                 createMarker(results[i]);
             }
             map.setCenter(results[0].geometry.location);
         }
     });	
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  markers.push(marker);
  marker.addListener("click", () => {
    console.log(place);
    infowindow = new google.maps.InfoWindow();
    let contentString = "<p><b>" + place.name + "</b><br/>" + 
        "Address: " + place.formatted_address + "<br/>" +
        "Phone #: " + place.formatted_phone_number + "<br/>";
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

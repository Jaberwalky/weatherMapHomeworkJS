

var MapWrapper = function(coords){
  var container = document.getElementById('main-map');
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: 12,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    styles: [
      {
        elementType: 'all', stylers: [
          {hue: '#708090'},
          {visibility: 'simplified'},
          {saturation: "-30"},
          {weight: "1"},

          // {invert_lightness: true} use js to switch to this at night.
      ]},
      {
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
        { "visibility": "off" }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
      { "visibility": "off" }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "road.local",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "transit",
        "stylers": [{ "visibility": "off" }]
      }
    ]
  });
}

MapWrapper.prototype = {
  getCoords: function(){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
      return position;
    });
  },
}

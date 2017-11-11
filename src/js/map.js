function initMap() {
  var myLatLng = {lat: 53.910577, lng: 27.516807};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });
}
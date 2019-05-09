$(document).ready( function(){

  var gmapDiv = $("#google-map");
  var gmapMarker = gmapDiv.attr("data-address");

  gmapDiv.gmap3({
    zoom: 16,
    address: gmapMarker,
    oomControl: true,
    navigationControl: true,
    scrollwheel: false,
    styles: [
      {
      "featureType":"all",
      "elementType":"all",
        "stylers":[
          { "saturation":"0" }
        ]
    }]
  })
  .marker({
    address: gmapMarker,
    icon: "img/map_pin.png"
  })
  .infowindow({
    content: "V Tytana St, Manila, Philippines"
  })
  .then(function (infowindow) {
    var map = this.get(0);
    var marker = this.get(1);
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
});
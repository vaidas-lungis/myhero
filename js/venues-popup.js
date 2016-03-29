var map;
var myCenter= null;
var marker= null;

function initialize(lat, long) {
    myCenter = new google.maps.LatLng(lat, long);
    marker = new google.maps.Marker({
        position:myCenter
    });
    var mapProp = {
        center:myCenter,
        zoom: 16,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {

        infowindow.setContent(contentString);
        infowindow.open(map, marker);

    });
};
//google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, "resize", resizingMap());

$('.modal.venue-maps').on('hide.bs.modal', function() {
    $('#map-canvas').remove();
});

$('.modal.venue-maps').on('show.bs.modal', function() {
    jQuery('<div/>', {
        id: 'map-canvas'
    }).appendTo($(this).find('.row'));

    initialize($(this).data('coord_lat'), $(this).data('coord_long'));
    resizeMap();
});

function resizeMap() {
    if(typeof map =="undefined") return;
    setTimeout( function(){resizingMap();} , 400);
}

function resizingMap() {
    if(typeof map =="undefined") return;
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
}
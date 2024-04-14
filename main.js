(function () {

	map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(-31.0797, 142.4601),
      zoom: 10,
      mapTypeId: 'terrain'
	});

	var infowindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();
	var stopsLayer = new google.maps.Data({map: map});

	stopsLayer.loadGeoJson('https://gsnsw-philn.github.io/geotrails/mutawintji-geotrail-stops.geojson', null, function () {
		stopsLayer.addListener('click', function (event) {
			console.log(event.feature.getProperty('name'))
			infowindow.setContent(`<h3>` + event.feature.getProperty('name') + '</h3>' + event.feature.getProperty('description'));
			infowindow.setPosition(event.feature.getGeometry().get());
			infowindow.setOptions({
				pixelOffset: new google.maps.Size(0, -30)
			});
			infowindow.open(map)
		});


		stopsLayer.forEach(function(feature){
			feature.getGeometry().forEachLatLng(function(latlng){
				bounds.extend(latlng);
			});
		});

		map.fitBounds(bounds);

	});
	map.data.loadGeoJson('https://gsnsw-philn.github.io/geotrails/mutawintji-geotrail.geojson');
})();

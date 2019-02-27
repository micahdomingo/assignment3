// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var map = L.map('map').setView([17.000000, 22.000000], 10);

// Add base layer
L.tileLayer('http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png ', {
  maxZoom: 18
}).addTo(map);

// Fetch data from our Glitch project
fetch('https://cdn.glitch.com/aa3fcbc4-fdcf-4100-945a-8a7830123962%2Fairports.geojson?1548631813691')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    
  var airportlayer = L.geoJson(data, {
     // We make the points circles instead of markers so we can style them
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng);
      },
      
      // Then we can style them as we would other features
      style: function (geoJsonFeature) {
        return {
          fillColor: '#8a4693',
          radius: 4,
          fillOpacity: 0.5,
          stroke: false
        };
      }
    
  });
  
    airportlayer.bindPopup(function (layer) {
      // This function is called whenever a feature on the layer is clicked
      
      // Uncomment this to see all properties on the clicked feature:
      console.log(layer.feature.properties);
      return '<div class="popup-name">' + '<strong>' + layer.feature.properties['name'] + '</strong> ' + '</div>' + '<div class="popup-abbrev">' + layer.feature.properties['abbrev']+ '</div>' + '<div class="popup-type">' + '<strong>-' + layer.feature.properties['type'] + '- </strong>' + '</div>';
    });
  
    // Add data to the map
    airportlayer.addTo(map);
  
    // Move the map view so that the airportlayer is visible
    map.fitBounds(airportlayer.getBounds());
  });
var start = ee.Date('2017-01-01');
var end = ee.Date('2017-01-31');
var lon = 140;
var lat = 36;
var point = ee.Geometry.Point(lon, lat);

var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterBounds(point)
  .filterDate(start, end);

// Center the Map.
Map.setCenter(lon, lat, 8);
// Display the image.
var trueColorVizParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000 };
var naturalColorVizParams = { bands: ['B4', 'B5', 'B2'], min: 0, max: 3000 };
var falseColorVizParams = { bands: ['B5', 'B4', 'B3'], min: 0, max: 3000 };
Map.addLayer(landsat8_img, trueColorVizParams, "True color");
Map.addLayer(landsat8_img, naturalColorVizParams, "Natural color");
Map.addLayer(landsat8_img, falseColorVizParams, "False color");
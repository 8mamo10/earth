var start = ee.Date('2017-01-01');
var end = ee.Date('2017-01-31');
var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterDate(start, end);

// Center the Map.
Map.setCenter(140, 36, 8);
// Display the image.
var vizParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000 };
Map.addLayer(landsat8_img, vizParams);

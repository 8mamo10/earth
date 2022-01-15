var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
var lon = 140;
var lat = 36
var point = ee.Geometry.Point(lon, lat);

var sentinel2_img = sentinel2ImageCollection
  .filterBounds(point)
  .filterDate(start, finish);

var landsat8_img = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterBounds(point)
  .filterDate(start, finish);

Map.setCenter(lon, lat, 13);
var sentinel2VizParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000 };
var landsat8VizParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000 };
Map.addLayer(sentinel2_img, sentinel2VizParams, "sentinel2");
Map.addLayer(landsat8_img, landsat8VizParams, "landsat8");
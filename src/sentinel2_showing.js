var start = ee.Date('2017-01-01');
var finish = ee.Date('2017-01-31');
var lon = 140;
var lat = 36
var point = ee.Geometry.Point(lon, lat);

var sentinel2_img = sentinel2ImageCollection
  .filterBounds(point)
  .filterDate(start, finish);
var vizParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000 };
Map.addLayer(sentinel2_img, vizParams);
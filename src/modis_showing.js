var start = ee.Date('2017-01-01');
var end = ee.Date('2017-01-31');
var lon = 140;
var lat = 36;
var point = ee.Geometry.Point(lon, lat);

var sentinel2_img = sentinel2ImageCollection
  .filterBounds(point)
  .filterDate(start, end);
var landsat8_img = landsat8ImageCollection
  .filterBounds(point)
  .filterDate(start, end);
var modis_img = modisImageCollection
  .filterBounds(point)
  .filterDate(start, end);

Map.setCenter(lon, lat, 13);
var sentinel2VizParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000 };
var landsat8VizParams = { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000 };
var modisVizParams = { bands: ['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'], min: 0, max: 3000 };

Map.addLayer(sentinel2_img, sentinel2VizParams, 'sentinel2');
Map.addLayer(landsat8_img, landsat8VizParams, 'landsat8');
Map.addLayer(modis_img, modisVizParams, 'modis');


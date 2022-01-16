var start = ee.Date('2005-01-01');
var finish = ee.Date('2005-12-31');

var roi = ee.Geometry.Rectangle(90, 5, 150, 55);

var elev = ee.Image("USGS/GTOPO30");
var land = elev.gte(0);

var images = ee.ImageCollection('MODIS/006/MOD09A1')
  .filterDate(start, finish);

var ndvi_series = images.map(calc_MODIS_NDVI);
var ndvi_max = ndvi_series.max();
var ndvi_max_land = ndvi_max.updateMask(land);

var visParams = {
  bands: ['NDVI'], min: 0.0, max: 1.0, palette: ['0000FF', 'FFFF00', 'FF0000']
};

Map.setCenter(120, 35, 4);
Map.addLayer(ndvi_max_land.clip(roi), visParams);

function calc_MODIS_NDVI(image) {
  var red = image.select('sur_refl_b01');
  var nir = image.select('sur_refl_b02');
  var nir_minus_red = nir.subtract(red);
  var nir_plus_red = nir.add(red);
  var ndvi = nir_minus_red.divide(nir_plus_red).rename("NDVI");
  return ndvi;
}
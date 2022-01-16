var start = ee.Date('2005-01-01');
var finish = ee.Date('2005-12-31');

var roi = ee.Geometry.Rectangle(90, 5, 150, 55);

var images = ee.ImageCollection('MODIS/006/MOD09A1')
  .filterDate(start, finish);

// need to cast as ee.Image
var image = ee.Image(images.first());
var ndvi = calc_MODIS_NDVI(image);


Map.setCenter(120, 35, 4);
var visParams = {
  bands: ['NDVI'], min: 0.0, max: 1.0, palette: ['0000FF', 'FFFF00', 'FF0000']
};
Map.addLayer(ndvi.clip(roi), visParams);

function calc_MODIS_NDVI(image) {
  var red = image.select('sur_refl_b01');
  var nir = image.select('sur_refl_b02');
  var nir_minus_red = nir.subtract(red);
  var nir_plus_red = nir.add(red);
  var ndvi = nir_minus_red.divide(nir_plus_red).rename("NDVI");
  return ndvi;
}
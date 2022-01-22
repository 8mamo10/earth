// Load Sentinel-2 TOA reflectance data.
var s2 = ee.ImageCollection('COPERNICUS/S2');

// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
    qa.bitwiseAnd(cirrusBitMask).eq(0));

  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}

// Map the function over one year of data and take the median.
var composite = s2.filterDate('2016-01-01', '2016-12-31')
  // Pre-filter to get less cloudy granules.
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .map(maskS2clouds)
  .median();

var roi = ee.Geometry.Rectangle(140.05, 36.05, 140.40, 36.25);
// Display the results.
Map.setCenter(140.25, 36.12, 11);
Map.addLayer(composite.clip(roi), { bands: ['B3', 'B2', 'B1'], min: 0, max: 0.3 });
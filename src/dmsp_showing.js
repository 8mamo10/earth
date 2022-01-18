var image_1996 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
  .filterDate('1996-01-01', '1996-12-31')
  .median();

var image_2010 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
  .filterDate('2010-01-01', '2010-12-31')
  .median();

var visParams = { bands: ['avg_vis'], palette: ["000000", "FFFFFF"] };


Map.setCenter(140, 36, 3);
Map.addLayer(image_1996, visParams, '1996');
Map.addLayer(image_2010, visParams, '2010');

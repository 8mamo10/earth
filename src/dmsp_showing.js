var dmsp_1996 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
  .filterDate('1996-01-01', '1996-12-31')
  .median();

var dmsp_2010 = ee.ImageCollection("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4")
  .filterDate('2010-01-01', '2010-12-31')
  .median();

var npp_2014 = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
  .filterDate('2014-01-01', '2014-12-31')
  .median();


var dmspVisParams = { bands: ['avg_vis'], palette: ["000000", "FFFFFF"] };
var nppVisParams = { bands: ['avg_rad'], palette: ["000000", "FFFFFF"] };


Map.setCenter(140, 36, 3);
Map.addLayer(dmsp_1996, dmspVisParams, '1996');
Map.addLayer(dmsp_2010, dmspVisParams, '2010');
Map.addLayer(npp_2014, nppVisParams, '2014');

var start = ee.Date('2005-01-01');
var finish = ee.Date('2010-12-31');

var roi = ee.Geometry.Rectangle(90, 5, 150, 55);

var images = ee.ImageCollection('MODIS/006/MOD09A1')
  .filterDate(start, finish);

function calc_MODIS_NDVI(image) {
  var ndvi = image.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']).rename('NDVI');
  var elev = ee.Image("USGS/GTOPO30");
  var land = elev.gte(0);
  return image.addBands(ndvi).updateMask(land);
}

var ndvi_land = images.map(calc_MODIS_NDVI);
var ndvi_max_land = ndvi_land.max();

var visParams = {
  bands: ['NDVI'], min: 0.0, max: 1.0, palette: ['0000FF', 'FFFF00', 'FF0000']
};

var intro = ui.Panel([
  ui.Label({
    value: 'NDVI Inspector',
    style: { fontSize: '20px', fontWeight: 'bold' }
  }),
  ui.Label('Click a point on the map to inspect NDVI over time.')
]);

var lon = ui.Label();
var lat = ui.Label();

var panel = ui.Panel();
panel.add(intro);
panel.add(lon);
panel.add(lat);

ui.root.insert(0, panel);

Map.setCenter(120, 35, 4);
Map.addLayer(ndvi_max_land, visParams);

Map.onClick(function (coords) {
  lon.setValue('lon: ' + coords.lon);
  lat.setValue('lat: ' + coords.lat);

  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, { color: 'red' });
  Map.layers().set(1, dot);

  var chart = ui.Chart.image.series({
    imageCollection: ndvi_land.select('NDVI'),
    region: point,
    reducer: ee.Reducer.mean(),
    scale: 250
  });
  chart.setOptions({
    title: 'NDVI Over Time',
    vAxis: { title: 'NDVI' },
    hAxis: { title: 'date', format: 'MM-yy', gridlines: { count: 7 } },
    interpolateNulls: true
  });
  panel.widgets().set(3, chart);
});

Map.style().set('cursor', 'crosshair');
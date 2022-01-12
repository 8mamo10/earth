// Display an image given its ID.

var image = ee.Image('CGIAR/SRTM90_V4');
// Center the Map.
Map.setCenter(140, 36, 8);
// Display the image.
Map.addLayer(image, { min: 3000, max: 4000, palette: ['FFFFFF', '000000'] }, 'SRTM');

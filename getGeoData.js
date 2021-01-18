var http = require('http');
var parseString = require('xml2js').parseString;

const getValue = (g, key) => g.geoPlugin[key][0];

const getGeoData = (ip, callback) => {
  http.get(
    `http://www.geoplugin.net/xml.gp?ip=${ip}`,
    (result) => {
      let xmlString = '';

      result.on('data', (chunk) => {
        xmlString += chunk;
      });

      result.on('end', () => {
        parseString(xmlString, (error, g) => {
          callback({
            country: getValue(g, 'geoplugin_countryCode'),
            region: getValue(g, 'geoplugin_region'),
            city: getValue(g, 'geoplugin_city'),
          });
        });
      });
    }
  );
};

exports.get = getGeoData;
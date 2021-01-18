const mysql = require('mysql');
const events = require('events');

const getDate = require('./getDate').getDate;
const getGeoData = require('./getGeoData').get;

const eventEmitter = new events.EventEmitter();

const connection = mysql.createConnection({
  database: process.env.DB,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const logToDb = (ip, table, values) => {
  let geoData = {};

  console.log("values", values);
  console.log("tables", table);

  getGeoData(ip, (geo) => {
    geoData = geo;
    eventEmitter.emit('geoDataLoaded');
  });

  eventEmitter.on('geoDataLoaded', () => {
    connection.connect((error) => {
      if (error) throw error;

      const insertables = {
        date: getDate(),
        timestamp: Math.floor(Date.now() / 1000),
        ...values,
        ...geoData,
      };

      console.log(insertables);

      connection.query(`INSERT INTO ${table} SET ?`, insertables, (error, result) => {
        if (error) throw error;
      });
    });
  });
};

exports.logToDb = logToDb;
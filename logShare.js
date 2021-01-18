const logToDb = require('./logToDb').logToDb;
const getDeviceData = require('./getData').getDeviceData;
const getKolamData = require('./getData').getKolamData;

const getValues = (data) => {
  const {
    value,
  } = data;

  const values = {
    shared_with: value,
    ...getDeviceData(data),
    ...getKolamData(data),
  };

  delete values.device; // TODO

  return values;
};

const logShare = (data, ip) => {
  logToDb(ip, 'shares', getValues(data));
};

exports.logShare = logShare;

const logToDb = require('./logToDb').logToDb;
const getDeviceData = require('./getData').getDeviceData;
const getKolamData = require('./getData').getKolamData;
const getTutorialData = require('./getData').getTutorialData;

const getValues = (data) => {
  const {
    value,
    s: saved_kolams_count,
  } = data;

  return {
    time_spent: value,
    ...getDeviceData(data),
    ...getKolamData(data),
    ...getTutorialData(data),
    saved_kolams_count,
  };
};

const logSession = (data, ip) => {
  logToDb(ip, 'sessions', getValues(data));
};

exports.logSession = logSession;

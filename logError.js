var nodemailer = require('nodemailer');
var fs = require('fs');
const getDate = require('./getDate').getDate;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASSWORD,
  },
});

const log = ({
  key,
  value,
  deviceId,
  systemVersion,
  appVersion,
}) => {
  const errorEntry = `${getDate()}
${value}
deviceId: ${deviceId}
systemVersion: ${systemVersion}
appVersion: ${appVersion}

`;

  if (key === 'CRASH') {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: 'Crash report',
      text: errorEntry,
    };

    transporter.sendMail(mailOptions);
  }

  fs.appendFile('./logs/error.log', errorEntry, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
};

exports.log = log;
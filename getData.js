const getDeviceData = (data) => {
  const {
    deviceId,
    systemVersion,
    appVersion,
    isTablet,
    d: device,
  } = data;

  return {
    device_id: deviceId,
    system_version: systemVersion,
    app_version: appVersion,
    is_tablet: isTablet,
    device,
  };
};

const getKolamData = (data) => {
  const {k = {}} = data;
  return {
    background_color: k.bgc,
    line_color: k.lc,
    dot_color: k.dc,
    tiles: k.t,
    dots: k.d,
    rotation: k.r,
    size: k.s,
  };
};

const getTutorialData = (data) => {
  const {t = {}} = data;
  return {
    is_tutorial_opened: t.o,
    last_tutorial_chapter: t.h,
  };
};

exports.getDeviceData = getDeviceData;
exports.getKolamData = getKolamData;
exports.getTutorialData = getTutorialData;
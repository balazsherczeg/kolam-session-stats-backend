exports.getDate = () => {
  const now = new Date();
  const isoString = now.toISOString();
  return `${isoString.slice(0, 10)} ${isoString.slice(11, 19)}`;
}

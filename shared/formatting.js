
const safeJSONParse = (input, defaultVal = {}) => {
  let json;
  if (typeof input === 'object') {
    return input;
  }
  try {
    json = JSON.parse(input);
  } catch (ex) {
    json = undefined;
  }
  return json || defaultVal || {};
};

module.exports = {
  safeJSONParse,
};

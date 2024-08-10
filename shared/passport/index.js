const jwtStratergy = require('./jwt-strategy');

const strategies = (passport) => {
  jwtStratergy(passport);
};

module.exports = strategies;
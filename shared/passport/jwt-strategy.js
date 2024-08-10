const passportJwt = require('passport-jwt');
const { application: { jwt: { key } } } = require('../../config/config.json');
const { safeJSONParse } = require('../formatting');
const {userSchema} = require('../../models');

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;

const jwtStrategy = (passport, req) => {
  const opts = {
    secretOrKey: key,
    passReqToCallback: true,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  const errorMessage = { success: false, error: 'UnAuthorized' };
  passport.use(new JwtStrategy(opts, async(req, jwtPayload, done) => {
    const { sub } = jwtPayload;
    const parsedData = safeJSONParse(sub) || {};
    const user = await userSchema.findOne({userId: parsedData.userId});
    return done(null, user);
  }, () => {
    req.res.status(401).send(errorMessage);
  }));
};

module.exports = jwtStrategy;

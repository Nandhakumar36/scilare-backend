const jwt = require('jsonwebtoken');
const { application: { jwt: { key } } } = require('../../config/config.json');
const baseMap = {
  getAll(req, res, data) {
    res.status(200).send({
      success: true,
      data,
      message: 'Data Retrieved Successfully',
    });
  },
  get(req, res, data) {
    res.status(200).send({
      success: true,
      data,
      message: 'Data Retrieved Successfully',
    });
  },
  post(req, res, data) {
    res.status(200).send({
      success: true,
      data,
      message: 'Created Successfully',
    });
  },
  put(req, res, data) {
    res.status(200).send({
      success: true,
      data,
      message: 'Updated Successfully',
    });
  },
  del(req, res, data) {
    res.status(200).send({
      success: true,
      data,
      message: 'Deleted Successfully',
    });
  },
  error(req, res, error) {
    res.status(500).send({
      success: false,
      error,
      message: 'Internal Server Error',
    });
  },
  authenticate(req, res, data) {
    const jwtdata = {...data};
    const token = jwt.sign(
      { sub: jwtdata, },
      key,
    );
    res.status(200).send({
      success: true,
      data: { userCred: data, token },
      message: 'Login Successfull',
    });

  },
  customStatus(req, res, { message, success }, data) {
    res.status(200).send({
      success,
      data,
      message,
    });
  },
};

module.exports = baseMap;

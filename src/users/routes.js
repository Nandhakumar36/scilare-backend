const router = require('express').Router();
const controller = require('./controller');

router.get('/user_list', controller.list);
router.get('/profile', controller.getProfile);
router.post('/register', controller.registration);
router.post('/login', controller.login);
router.post('/create_user', controller.createUser);
router.post('/fake_user_addition', controller.fakerUserAddition)
module.exports = router;

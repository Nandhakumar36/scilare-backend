const router = require('express').Router();
const controller = require('./controller');

router.get('/profile', controller.getProfile);
router.put('/update_user/:id', controller.updateUser);
router.delete('/delete_user/:id', controller.deleteUser);
module.exports = router;

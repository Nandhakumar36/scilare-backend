const router = require('express').Router();
const userRouter = require('../src/users/routes');
const userActionController = require('../src/user_actions/routes');
const routes = (passport)=>{
    const authenticate = passport.authenticate('jwt', { session: false });

    router.use('/users', userRouter);
    router.use('/user_actions', authenticate, userActionController);
    router.use('/health-check',(req, res)=>{
        res.status(200).send({success:true, message:"server is up an running"})
    })
    return router;
}
module.exports = routes;
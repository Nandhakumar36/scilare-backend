const { usersSchema, organizationSchema, userSchema } = require('../../models');
const bcrypt = require('bcrypt');
const baseMap = require('../../shared/base/map');
class userActionController {
    async getProfile(req, res, next){
        try {
            const {_id} = req.user;
            const user = await userSchema.findOne({_id});
            baseMap.get(req, res, user)
        } catch (error) {
            next(error)
        }
    }
    async updateUser(req, res, next){
        try {
            const {id} = req.params;
            console.log(id,req.body)
            const body = {
                firstName: req.body.firstName          
            }
            const user = await userSchema.findOneAndUpdate({_id:id},{$set: body}, {new: true});
            baseMap.get(req, res, user)
        } catch (error) {
            next(error)
        }
    }
    async deleteUser(req, res, next){
        try {
            const {id} = req.params;
            console.log(id)
            const body = {
                isActive: false,
                isDeleted: true
            }
            const user = await userSchema.findOneAndUpdate({_id:id},{$set: body}, {new: true});
            baseMap.put(req, res, user)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new userActionController();
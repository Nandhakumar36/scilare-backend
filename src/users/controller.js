const { usersSchema, organizationSchema, userSchema } = require('../../models');
const bcrypt = require('bcrypt');
const baseMap = require('../../shared/base/map');
const e = require('express');
const { faker } = require('@faker-js/faker');

class userController {
    async registration(req, res, next) {
        try {
            const { firstName, organizationName, email, password, address } = req.body;
            const isOrgExists = await organizationSchema.findOne({ email });
            if (!isOrgExists) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const userPayload = new userSchema({
                    email,
                    password: hashedPassword,
                    firstName: firstName,
                    userType: 'Admin',
                })
                console.log(userPayload)
                const createdUser = await userPayload.save();
                const organizationPayload = new organizationSchema({
                    organizationName,
                    email,
                    ownerId: createdUser.id
                });

                const createdOrg = await organizationPayload.save();
                console.log('createdOrg', createdOrg)
                baseMap.post(req, res, createdOrg);
            } else {
                res.status(200).send({ success: false, message: 'Organization with this email already exists' })
            }
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body;
            console.log(email)
            const user = await userSchema.findOne({
                email: email,
                isActive: true,
                isDeleted: false
            });
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, message: "User Does not exists" });
            } else {
                const isPasswordValid = await bcrypt.compare(password, user.password || '');
                if (!isPasswordValid) {
                    return res
                        .status(401)
                        .json({ success: false, message: "Invalid Password" });
                } else {
                    const loginParams = {
                        email: user.email,
                        id: user.id,
                        firstName: user.firstName,
                        userType:user.userType
                    };
                    baseMap.authenticate(req, res, loginParams);
                }
            }
        } catch (error) {
            next(error);
        }
    }
    async createUser(req, res, next) {
        try {
            const { firstName, password, email } = req.body;
            const isUseExists = await userSchema.findOne({ email });
            if (!isUseExists) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const userPayload = new userSchema({
                    firstName,
                    email,
                    userType: 'User',
                    password: hashedPassword
                })
                const createdUser = await userPayload.save();
                const users = [];
                for (let i = 0; i < 5; i++) {
                    const fakeUser = new userSchema({
                        firstName: faker.person.firstName(),
                        email: faker.internet.email(),
                        userType: 'User',
                        password: await bcrypt.hash('Test@123', 10),
                    });
                    users.push(fakeUser);
                }
                await userSchema.insertMany(users);
                baseMap.post(req, res, createdUser);
            } else {
                res.status(200).send({ success: false, message: 'User with this email already exists' })
            }

        } catch (error) {
            next(error)
        }
    }
    async list(req, res, next) {
        try {
            const users = await userSchema.find({isActive: true});
            res.status(200).send({ success: true, users })
        } catch (error) {
            next(error)
        }
    }

    async getProfile(req, res, next){
        try {

            const user = await userSchema.find();
            res.status(200).send({ success: true, user })
        } catch (error) {
            next(error)
        }
    }
    async fakerUserAddition(req, res, next) {
        try {
            const users = [];

            for (let i = 0; i < 5; i++) {
                const fakeUser = new userSchema({
                    firstName: faker.name.firstName(),
                    email: faker.internet.email(),
                    userType: 'User',
                    password: bcrypt.hash('Test@123', 10),
                });
                users.push(fakeUser);
            }
            await userSchema.insertMany(users);

            res.status(201).json({
                success: true,
                message: 'Fake user created successfully!',
                user: fakeUser
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new userController();
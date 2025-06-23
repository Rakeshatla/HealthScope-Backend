const express = require('express')
const authRouter = express.Router();
const { validateSignUp } = require('../utils/validation')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
authRouter.post('/signup', async (req, res) => {
    try {
        //validation of api
        validateSignUp(req);
        //hashing of password
        const { firstName, lastName, emailId, password, age, gender } = data;
        const passwordhash = await bcrypt.hash(password, 10)
        // const data = req.body
        const user = new User({
            firstName, lastName, emailId, password: passwordhash, age, gender
        });

        // if (data.skills.length > 10) {
        //     throw new Error("caan't be more than 10")
        // }
        await user.save();
        //cookies 
        res.send('registration sucessful.');
    }
    catch (err) {
        res.status(404).send("Error " + err.message)
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        // console.log(user)
        if (!user) {
            throw new Error("invalid credentials ")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            //jwt token
            const token = await jwt.sign({ _id: user._id }, "DEVTINDER", { expiresIn: '1d' })
            //cookies 
            res.cookie('token', token)
            res.send(user)
        } else {
            throw new Error("invalid credentials ")
        }
    } catch (err) {
        res.status(404).send("Error: " + err.message)
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now())
    })
    res.send("logut successfull")
})
module.exports = authRouter;
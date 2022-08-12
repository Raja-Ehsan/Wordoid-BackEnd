require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");
const userModel = mongoose.model("User");
const handleLogin = async (req, res) => {
    const username = req.body.user;
    const password = req.body.password;
    try {
        console.log(username)
        let data = await userModel.findOne({ userName: username});
        if (data) {
            const isMatch = bcrypt.compare(password, data.userPassword)
            isMatch.then((match) => {
                if (match) {
                    let foundUser = data;
                    const user = { name: username }
                    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })

                    const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2m' })

                    data.refreshToken = refresh_token;
                    data.save().then(savedDoc => {
                        savedDoc = data
                    })
                    console.log({
                        accessToken: access_token,
                        foundUser
                    })
                    res.cookie('jwt', refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
                    res.json({
                        accessToken: access_token,
                        foundUser
                    })
                }
                else {
                    res.sendStatus(403)
                }

            })
        }
        else{
            res.sendStatus(403)
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = handleLogin
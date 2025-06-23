const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user')
const { validateSignUp } = require('./utils/validation')
const bcrypt = require('bcrypt')
// app.use('/', (req, res) => {
//     res.send('hello')
// });
app.use(express.json());
app.post('/signup', async (req, res) => {
    try {
        validateSignUp(req)
        const { firstName, lastName, emailId, password, age, gender } = req.body;
        // console.log('done')
        const passwordhash = await bcrypt.hash(password, 10)
        // console.log(passwordhash)
        const data = {
            firstName, lastName, emailId, password: passwordhash, age, gender
        }
        const user = new User(data);
        await user.save();
        res.send("data added sucessfully!.")
    } catch (err) {
        res.status(500).send("invalid data" + err)
    }

})
app.get('/get', async (req, res) => {
    try {
        const email = req.body.emailId;
        console.log(email)
        const users = await User.find({ emailId: email })
        res.send(users)
    } catch (err) {
        res.status(400).send("not found" + err)
    }
})
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(400).send("not found" + err)
    }
})
app.delete('/delete', async (req, res) => {
    try {
        const id = req.body.emailId;
        const users = await User.findOneAndDelete({ emailId: id })
        res.send('deleted successfully..')
    } catch (err) {
        res.status(400).send("not found" + err)
    }
})
app.patch('/update', async (req, res) => {
    try {
        const id = req.body;
        console.log(id)
        const { firstName } = req.body
        const data = { firstName }
        await User.findByIdAndUpdate(id, data)
        res.send('updated suceesfully..')
    } catch (err) {
        res.status(400).send("not found" + err)
    }
})
console.log('d')
connectDB().then(() => {
    console.log('connected to db sucessfully..');
    app.listen(8000, () => {
        console.log('server running on port 8000....')
    })
}).catch((err) => {
    console.log("error occured" + err);
});
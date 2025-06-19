const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user')
// app.use('/', (req, res) => {
//     res.send('hello')
// });

app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: 'rakesh',
        lastName: 'reddy',
        age: 20,
        gender: 'male',
    });
    await user.save();
    res.send("data added sucessfully!.")
})
connectDB().then(() => {
    console.log('connected to db sucessfully..');
    app.listen(8000, () => {
        console.log('server running on port 8000....')
    })
}).catch((err) => {
    console.log("error occured" + err);
});
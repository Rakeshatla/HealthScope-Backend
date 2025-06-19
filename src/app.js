const express = require('express');
const connectDB = require('./config/database');
const app = express();

app.use('/', (req, res) => {
    res.send('hello')
});

connectDB().then(() => {
    console.log('connected to db sucessfully..');
    app.listen(8000, () => {
        console.log('server running on port 8000....')
    })
}).catch((err) => {
    console.log("error occured" + err);
});
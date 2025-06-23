const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
app.use(express.json());
app.use(cookieParser())
app.use('/', authRouter)

connectDB().then(() => {
    console.log('connected to db sucessfully..');
    app.listen(8000, () => {
        console.log('server running on port 8000....')
    })
}).catch((err) => {
    console.log("error occured" + err);
});
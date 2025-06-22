const validator = require('validator')
const validateSignUp = (req) => {
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    // console.log(firstName)
    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("please enter fields");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error('please enter valid email')
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("please enter strong password")
    }
    data = req.body
}
module.exports = { validateSignUp };
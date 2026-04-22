const User = require('../models/user');
const jwt = require('jsonwebtoken');

const loginUser = async (email, password ) => {
    const user = await User.findOne ({email});

    if (!user){
        throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        throw new Error('invalid credentials');
    }

    const token = jwt.sign(
        { id: user._id},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token;
};

module.exports = { loginUser }; 
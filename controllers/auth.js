const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Validate email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'The email does not exist. Please check and try again.'
            });
        }

        // Validate user status
        if (!user.status) {
            return res.status(400).json({
                msg: 'Your account is currently inactive. Please contact support for assistance.'
            });
        }

        // Validate password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'The password you entered is incorrect. Please try again.'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login successful! Welcome back.',
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'An unexpected error occurred. Please contact the administrator for assistance.'
        });
    }
}

module.exports = {
    loginController
}
    
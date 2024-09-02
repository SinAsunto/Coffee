const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const getUsers = async(req, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const query = {status: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        msg: 'Sucessfully fetched users',
        total,
        users
    });
};

const postUsers = async (req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user in DB
    await user.save();

    res.json({
        msg: 'User created successfully',
        user
    });
};

const putUsers = async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    if (password) {
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        msg: 'User updated successfully',
        user
    });
};

const deleteUsers = async(req, res = response) => {

    const {id} = req.params;

    // Fisically delete
    // const user = User.findByIdAndDelete(id);

    // Logical delete
    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        msg: `User ${user.name} deleted successfully`,
    });
};

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
};
const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const existsRole = await Role.findOne({role});
    if (!existsRole) {
        throw new Error(`Role ${role} is not registered in the database`);
    }
}

const emailExists = async(email = '') => {
    const userEmailExists = await User.findOne({email});
    if (userEmailExists) {
        throw new Error(`Email ${email} is already registered`);
    }
}

const userExistsById = async(id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error(`User with ID ${id} does not exist`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}

const { Category, User, Role, Product } = require('../models');

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

const categoryExistsById = async(id) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new Error(`Category with ID ${id} does not exist`);
    }
}

const productExistsById = async(id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error(`Product with ID ${id} does not exist`);
    }
}

const isValidCollection = (collection = '', collections = []) => {
    const isValid = collections.includes(collection);
    if (!isValid) {
        throw new Error(`Collection ${collection} is not allowed. Valid collections are: ${collections}`);
    }
    return true;
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById,
    categoryExistsById,
    productExistsById,
    isValidCollection
}

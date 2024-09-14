const { Category } = require('../models');

const getCategories = async(req, res) => {
    
    const {limit = 5, from = 0} = req.query;
    const query = {status: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('User', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        msg: 'Sucessfully fetched categories',
        total,
        categories
    });
};

const createCategory = async (req, res) => {
    
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});

    if (categoryDB) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name} already exists.`
        });
    }

    // Generate data to save
    const data = {
        name,
        User: req.user._id
    }

    const category = new Category(data);

    // Save category in DB
    await category.save();

    res.status(201).json({
        msg: 'Category created successfully',
        category
    });
};

const getCategory = async(req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('User', 'name');
    res.json(category);
};

const updateCategory = async(req, res) => {
    const { id } = req.params;
    const { status, User, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.User = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json({
        msg: 'Category updated successfully',
        category
    });
};

const deleteCategory = async(req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});
    
    res.json({
        msg: 'Category deleted successfully',
        category
    });
};

module.exports = {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}
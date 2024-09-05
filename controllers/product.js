const { Product } = require('../models');

const getProducts = async(req, res) => {
        
    const {limit = 5, from = 0} = req.query;
    const query = {status: true};

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        msg: 'Sucessfully fetched products',
        total,
        products
    });
}

const createProduct = async (req, res) => {
        
    const {status, user, ...body} = req.body;

    const productDB = await Product.findOne({name: body.name});

    if (productDB) {
        return res.status(400).json({
            msg: `The product ${productDB.name} already exists.`
        });
    }

    // Generate data to save
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data);

    // Save product in DB
    await product.save();

    res.status(201).json({
        msg: 'Product created successfully',
        product
    });
}

const getProduct = async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');

    res.json(product);
}

const updateProduct = async(req, res) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json({
        msg: 'Product updated successfully',
        product
    });
}

const deleteProduct = async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json({
        msg: 'Product deleted successfully',
        product
    });
}

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}
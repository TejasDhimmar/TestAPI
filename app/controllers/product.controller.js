const { products } = require('../config/products');
const { pricing } = require('../config/price');
const { categories } = require('../config/categories');

const product = async (req, res) => {
    let finalProducts = [];
    products.map((v) => {
        let pr = pricing.filter(pr => pr.sku == v.sku);
        let cat = categories.filter(cat => cat.id==v.category)
        v.price = pr[0].price;
        v.category = cat[0].name;
        finalProducts.push(v)
    })
    return res.send(finalProducts);
}

module.exports = {
    product
};
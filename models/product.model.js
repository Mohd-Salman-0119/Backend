const { mongoose } = require('../imports/modules.imports')


// Define the Product schema
const productSchema = new mongoose.Schema({
     id: { type: String, unique: true },
     name: { type: String, required: true, maxlength: 50 }, // Product name
     picture: { type: String, default: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }, // URL to product picture
     description: { type: String, required: true }, // Product description
     gender: { type: String, enum: ['male', 'female'] }, // Gender options
     category: { type: String, enum: ['makeup', 'skincare', 'haircare'], required: true }, // Category options
     price: { type: Number, required: true }, // Product price
}, {
     timestamps: true
});

// Create the Product model
const ProductModel = mongoose.model('Product', productSchema);

// Export the Product model
module.exports = {
     ProductModel
}
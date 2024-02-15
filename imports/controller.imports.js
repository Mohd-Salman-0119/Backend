const { registerController, loginController, getUserByIdController } = require('../controller/auth.controller')
const { getProductController, addProductController, getSingleProductController, editProductController, deleteProductController, searchProducts, filterProducts } = require('../controller/product.controller')


module.exports = {
     registerController,
     loginController,
     getProductController,
     addProductController,
     getSingleProductController,
     editProductController,
     deleteProductController,
     filterProducts,
     searchProducts,
     getUserByIdController
}
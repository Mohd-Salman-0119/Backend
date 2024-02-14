const { registerController, loginController } = require('../controller/auth.controller')
const { getProductController, addProductController, getSingleProductController, editProductController, deleteProductController } = require('../controller/product.controller')


module.exports = {
     registerController,
     loginController,
     getProductController,
     addProductController,
     getSingleProductController,
     editProductController,
     deleteProductController
}
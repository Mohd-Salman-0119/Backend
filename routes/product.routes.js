const { express } = require('../imports/modules.imports');
const { authorize } = require('../imports/middleware.import')
const { getProductController, addProductController, getSingleProductController, editProductController, deleteProductController } = require('../imports/controller.imports')


// Creating Product Router
const productRoutes = express.Router();

productRoutes.route('/')
     .get(getProductController)
     .post(authorize, addProductController)

productRoutes.route('/:id')
     .get(getSingleProductController)
     .put(authorize, editProductController)
     .delete(authorize, deleteProductController)




// Export the Product Router
module.exports = { productRoutes }
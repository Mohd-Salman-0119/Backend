const { express, multer } = require('../imports/modules.imports');
const { authorize } = require('../imports/middleware.import')
const { registerController, loginController, getUserByIdController } = require('../imports/controller.imports')

const upload = multer({ dest: 'uploads/' });

// Creating Auth Router for routing.
const authRoutes = express.Router();

authRoutes.route('/register').post(registerController)
authRoutes.route('/login').post(loginController)

authRoutes.route('/user').get(authorize, getUserByIdController)


// Export the Auth Router
module.exports = {
     authRoutes
}
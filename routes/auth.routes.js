const { express, multer } = require('../imports/modules.imports');
const { registerController, loginController } = require('../imports/controller.imports')

const upload = multer({ dest: 'uploads/' });

// Creating Auth Router for routing.
const authRoutes = express.Router();

authRoutes.route('/register').post(registerController)
authRoutes.route('/login').post(loginController)


// Export the Auth Router
module.exports = {
     authRoutes
}
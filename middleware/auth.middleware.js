require("dotenv").config()
const { jwt } = require("../imports/modules.imports")
const auth = (req, res, next) => {

     const token = req.headers?.authorization?.split(" ")[1]

     jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
          if (decoded) {
               req.userId = decoded.userId;
               next()
          } else {
               res.send({ msg: "Login First" })
          }
     });


}

module.exports = { auth }
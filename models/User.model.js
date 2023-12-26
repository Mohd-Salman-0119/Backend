const { mongoose } = require("../imports/modules.imports")

// name, email, password, phone_number, department.
const userSchema = {
     name: { type: String, required: true },
     email: { type: String, required: true },
     password: { type: String, required: true },
     phone_number: { type: String, required: true },
     department: { type: String, required: true },
}

const UserModel = mongoose.model("user", userSchema);

module.exports = {UserModel}
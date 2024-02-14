const { mongoose, bcrypt } = require('../imports/modules.imports')


// Define the User schema
const userSchema = new mongoose.Schema({
     id: { type: String, unique: true },
     name: { type: String, required: true, maxlength: 50 },
     avatar: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR02gJtXW0zf7hSeWXudW-iBMhmlXBNZwlvNg' },
     email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
     password: { type: String, required: true },
},
     {
          timestamps: true
     }
);

userSchema.pre('save', async function (next) {
     if (this.isModified('password') || this.isNew) {
          try {
               const salt = await bcrypt.genSalt(10);
               const hashedPassword = await bcrypt.hash(this.password, salt);
               this.password = hashedPassword;
               next();
          } catch (error) {
               next(error);
          }
     } else {
          return next();
     }
});

// Create the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = {
     UserModel
}
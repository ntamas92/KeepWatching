const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true, },
  name: String,
  passwordHash: String,
});

const transformSchema = (document, returnedObject) => { 
  returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }

userSchema.set("toJSON", {
  transform: transformSchema
});

userSchema.set("toObject", {
  transform: transformSchema
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema);

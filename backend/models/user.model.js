const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;

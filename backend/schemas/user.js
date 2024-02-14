const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const User = Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: String,
});

User.index({ userName: 1 });

module.exports = mongoose.model("User", User);

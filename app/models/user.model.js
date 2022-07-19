const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength:[6, 'name min 6 ch']
      },
    password: {
        type: String,
        required: true,
        minLength:[8, 'pass min 8 ch']
      },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToDo"
      }
    ]
  })
);
module.exports = User;
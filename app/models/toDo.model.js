const mongoose = require("mongoose");
const ToDo = mongoose.model(
  "ToDo",
  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    title:{
        type: String,
        required: true,
        minlength:[4,'min 4 ch']
      },
    state:{
        type: Boolean,
        default:false
      }
  })
);

ToDo.schema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});
module.exports = ToDo;
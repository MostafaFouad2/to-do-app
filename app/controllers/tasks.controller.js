const db = require("../models");
const User = db.user;
const Task = db.toDo;


exports.newTask = async(req, res) => {
    
      try{
        const task = new Task({
          user: req.userId,
          title: req.body.title
        });
        await task.save();

        const user = await User.findById({_id: task.user})
        user.tasks.push(task.id);
        await user.save();

      //return new book object, after saving it to Publisher
      res.send({ message: `Task was created successfully!`, task:task });
      }catch (err) {
        res.status(400).json({success: false, message:err.message})
     }
      
}

exports.upTask = async(req, res) => {
  try {
    const task = await Task.findById({_id: req.params.id})
    if(req.userId==task.user){
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true
        }
      );
      res.send(task);
    }else{
      throw new Error("invalid id")
    }
  }catch (err) {
    res.status(400).json({success: false, message:err.message})
 
  }
}

exports.delTask = async(req, res) => {
  try {
    const task = await Task.findById({_id: req.params.id})
    
    if(req.userId==task.user){
      const user = await User.findById({_id: task.user})
      user.tasks.pull(task.id);
      await user.save();
      await Task.findByIdAndDelete(req.params.id,{new:true});
      
      res.send({message: `Task was deleted successfully!`});
    }else{
      throw new Error("invalid id")
    }
  }catch (err) {
    res.status(400).json({success: false, message:err.message})
  }
}

exports.getTasks = async(req, res) => {
  try {
    const user = await  User.findOne({_id: req.userId}).populate("tasks");
    res.send(user.tasks);
} catch (error) {
    res.send(error);
}
}
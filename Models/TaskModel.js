import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["todo", "in progress", "done"],
    default: "todo",
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function (value) {
        // Custom validator function to check if the due date is in the future
        return value > new Date();
      },
      message: "Due date must be in the future.",
    },
  },
});

export default mongoose.model("tasks", taskSchema);

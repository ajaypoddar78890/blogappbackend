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
});

export default mongoose.model("tasks", taskSchema);

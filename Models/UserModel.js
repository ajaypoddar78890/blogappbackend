import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },

    email: {
      type: String,
      require: true,
      uniqe: true,
    },

    password: {
      type: String,
      require: true,
    },

    phone: {
      type: Number,
      requre: true,
    },
  },
  { timestamps: true }
);

//timestamp  is use to get time when userdata is created

export default mongoose.model("users", userSchema);

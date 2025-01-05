import express from "express";
import {
  Createtasks,
  GetAlltasks,
  GetTaskbyid,
  DeleteTasks,
  UpdateTaskbyID,
} from "../Controller/TaskController.js";

// router object

const router = express.Router();

// Task Crud Operation

// create
router.post("/createtasks", Createtasks);

// get all task
router.get("/gettasks", GetAlltasks);

//get task by id
router.get("/gettasks/:id", GetTaskbyid);

//delete the task
router.delete("/delete/:id", DeleteTasks);

// update Task by id
router.put("/update/:id", UpdateTaskbyID);

export default router;

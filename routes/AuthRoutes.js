import express from "express";
import {
  logincontroller,
  registerController,
} from "../Controller/UserController.js";

// router object

const router = express.Router();

// routing
//register controler  || method

router.post("/register", registerController);

// login

router.post("/login", logincontroller);

export default router;

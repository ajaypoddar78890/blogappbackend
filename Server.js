import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/DB.js";
import AuthRoutes from "./routes/AuthRoutes.js";
// import TaskModel from "./Models/TaskModel.js";
import TaskRoutes from "./routes/TaskRoutes.js";

//configure env
dotenv.config();
//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());

// app.use(
//   cors({
//     origin: ["https://ionassist.vercel.app ", "http://localhost:3000"], // Replace with your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(
//   cors({
//     // origin: ["http://localhost:3000", "https://ionassist.vercel.app/"],

//     credentials: true,
//   })
// );

app.use(express.json());

//Routes

app.use("/api/auth", AuthRoutes);
app.use("/api/task", TaskRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to test app</h1>");
});

//port
const PORT = process.env.PORT || 5500;
//listing the app

app.listen(PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});

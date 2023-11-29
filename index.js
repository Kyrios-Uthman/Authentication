import express from "express";
import cors from "cors";
import router from "./routes/user.js";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/auth")
  .then((e) => console.log("MongoDB connected"));
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"./Fronted Part/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"./Fronted Part/dist/index.html"))
})

app.use("/", router);

app.listen(2000);

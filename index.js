import express from "express";
import cors from "cors";
import router from "./routes/user.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 2000

mongoose
  .connect("mongodb+srv://UsmanBey:usman@usmanbey.okrmjxy.mongodb.net/auth?retryWrites=true&w=majority")
  .then((e) => console.log("MongoDB connected"));
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"./Fronted Part/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"./Fronted Part/dist/index.html"))
})

app.use("/", router);

app.listen(PORT);

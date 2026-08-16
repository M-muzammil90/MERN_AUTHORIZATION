import express, { Router } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import DBconnection from "./config/index.js";
import router from "./routes/route.js";
DBconnection();
const app = express();

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
const PORT = 3000;

app.use("/api/auth", router);
app.get("/", (req, res) => {
  res.send("your express successfully created");
});

app.listen(PORT, () => {
  console.log("PORT IS SUCCESSFULY RUNING", PORT);
});

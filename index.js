import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

import DBconnection from "./config/index.js";
import authRouter from "./routes/route.js";
import productRouter from "./routes/ProductRoutes.js";
import OrderRoutes from './routes/OrderRoute.js'
configDotenv();

DBconnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/Order", OrderRoutes);

app.get("/", (req, res) => {
  res.send("Your Express server is successfully running");
});

app.listen(PORT, () => {
  console.log(`PORT IS SUCCESSFULLY RUNNING ON ${PORT}`);
});
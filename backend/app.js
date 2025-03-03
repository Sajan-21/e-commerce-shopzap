import express from "express";
import "dotenv/config"
import cors from "cors";
import mongoConnect from "./config/db/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import authRoutes from "./routes/auth-routes.js";
import productRoutes from "./routes/product-routes.js";
import userRoutes from "./routes/user-routes.js";

const app = express();
const port = process.env.PORT || 4000;
mongoConnect();
connectCloudinary();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(authRoutes);
app.use(productRoutes);
app.use(userRoutes);

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);
})
import express from "express";
import { addProduct, addCategory, addSubCategory, getCategories, getSubCategory, vendorProducts, deleteProduct } from "../controllers/product-controllers.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post('/add-product/:vendorId',upload.fields([{name: 'image1',maxCount:1},{name: 'image2',maxCount:1},{name: 'image3',maxCount:1},{name: 'image4',maxCount:1}]),addProduct);
router.post('/add-category',addCategory);
router.get('/get-categories',getCategories);
router.post('/add-sub-category',addSubCategory);
router.get('/get-sub-categories/:categoryId',getSubCategory);
router.get('/vendor-product/:vendorId',vendorProducts);
router.delete('/delete-product/:productId',deleteProduct);

export default router;

import { v2 as cloudinary } from 'cloudinary';
import subCategoryModel from '../config/db/models/subCategoryModel.js'
import productModel from '../config/db/models/productModel.js';
import categoryModel from '../config/db/models/categoryModel.js';
import mongoose from 'mongoose';

export const addProduct = async function(req, res) {
    try {
        let { name, description, price, category, subCategory, stock } = req.body;
        
        let vendorId = req.params.vendorId;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
                return result.secure_url
            })
        )
        
        let subCategoryCollection = await subCategoryModel.findById( new mongoose.Types.ObjectId(subCategory) ).populate('category');       

        const productData = {
            name,
            description,
            price,
            images: imagesUrl,
            category: subCategoryCollection.category._id,
            subCategory: subCategoryCollection._id,
            stock,
            vendor: vendorId,
            permission: true
        }

        const product = new productModel(productData);
        await product.save();
        
        res.status(200).json({
            success: true,
            message: "product added successfully"
        });

    } catch (error) {
        console.log("error in addProduct : ",error);
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}

export const addCategory = async function(req, res) {
    try {
        console.log("yes");
        
        let category = req.body.category;
        if(!category) {
            return res.status(400).json({
                success: false,
                message: "category required"
            });
        }else{
            let addedCategory = await categoryModel.create({category});

            return res.status(200).json({
                success: true,
                message: "category added successfully",
            });
        }
    } catch (error) {
        console.log("error in addCategory : ",error);
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}

export const getCategories = async function(req, res) {
    try {
        let categoriesData = await categoryModel.find().populate('subCategories');

        return res.status(200).json({
            success: true,
            data: categoriesData,
        });
    } catch (error) {
        console.log("error in getCategories : ",error);
        return res.status(500).json({
            success: false,
            message : error.message || error,
        });
    }
}

export const addSubCategory = async function(req, res) {
    try {
        let { category_id, subCategory } = req.body;

        // Find category and populate subCategories
        let categoryCollection = await categoryModel.findById(category_id).populate('subCategories');
        if (!categoryCollection) {
            return res.status(400).json({
                success: false,
                message: "Category not found",
            });
        }

        // Check if the subCategory already exists
        const isSubCategoryExists = categoryCollection.subCategories.some(
            (subCat) => subCat.subCategory.toLowerCase() === subCategory.toLowerCase()
        );

        if (isSubCategoryExists) {
            return res.status(400).json({
                success: false,
                message: "SubCategory already exists in this category",
            });
        }

        // Create new subCategory
        let newSubCategory = await subCategoryModel.create({ 
            subCategory, 
            category: category_id // Directly use category_id without mongoose.Types.ObjectId
        });

        // Update category with the new subCategory ID
        await categoryModel.findByIdAndUpdate(category_id, {
            $push: { subCategories: newSubCategory._id } // Directly use newSubCategory._id
        });

        return res.status(200).json({
            success: true,
            message: "SubCategory added successfully",
        });

    } catch (error) {
        console.log("Error in AddSubCategory:", error);
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}

export const getSubCategory = async function(req, res) {
    try {
        let categoryId = req.params.categoryId;
        let subCategories = await subCategoryModel.find({category: categoryId});
        
        return res.status(200).json({
            success: true,
            data: subCategories
        });
        
    } catch (error) {
        console.log("error in getSubCategory : ",error);
        return res.status(500).json({
            success: true,
            message: error.message || error,
        });
    }
}

export const vendorProducts = async function (req, res) {
    try {
        let vendorId = req.params.vendorId;

        const products = await productModel.aggregate([
            {
                $match: { vendor: new mongoose.Types.ObjectId(vendorId) }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "subCategory",
                    foreignField: "_id",
                    as: "subCategory"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "vendor",
                    foreignField: "_id",
                    as: "vendor"
                }
            },
            {
                $unwind: { path: "$category", preserveNullAndEmptyArrays: true }
            },
            {
                $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: true }
            },
            {
                $unwind: { path: "$vendor", preserveNullAndEmptyArrays: true }
            }
        ]);
        

        return res.status(200).json({
            succses: true,
            data: products
        });

    } catch (error) {
        console.log("error in vendorProducts : ", error);

    }
}

export const deleteProduct = async function(req, res) {
    try {
        let productId = req.params.productId;
        let deleteProduct = await productModel.deleteOne({_id: productId});

        res.status(200).json({
            success: true,
            message: "product deleted successfully"
        });
    } catch (error) {
        console.log("error in deleteProduct : ",error);
        res.status(500).json({
            success: false,
            message: error.message || error
        });
    }
}
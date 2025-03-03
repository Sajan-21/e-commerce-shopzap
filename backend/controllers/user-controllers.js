import usesrModel from '../config/db/models/userModel.js'
import bcrypt from 'bcryptjs'
import productModel from '../config/db/models/productModel.js'
import orderModel from '../config/db/models/orderModel.js'
import userModel from '../config/db/models/userModel.js'
import categoryModel from '../config/db/models/categoryModel.js'


export const vendorRegistration = async function(req, res) {
    try {
        const {email, password, brand} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: `${!email ? "Email" : "Password"} is required`,
            });
        }
        if(!brand) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Brand name is required!",
            });
        }
        const user = await usesrModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "user not found",
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Wrong password. Try again",
            });
        }else{
            let updatedUser = await usesrModel.findByIdAndUpdate(user._id, {role: "vendor"}, {runValidators: true});

            return res.status(200).json({
                success: true,
                message: "successfully became a vendor",
            });
        }

    } catch (error) {
        console.log("error in vendorRegistration : ",error);
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}

export const getUser = async function(req, res) {
    try {
        let _id = req.params.userId;
        let user = await usesrModel.findById(_id).populate('cartList').populate("wishList").populate("orders");
        return res.status(200).json({
            success: true,
            data: user
        });
        
    } catch (error) {
        console.log("error in getUser : ",error);
    }
}

export const updateUser = async function(req, res) {
    try {
        let body = req.body;
        let _id = req.params.userId;
        let updatedUser = await userModel.findByIdAndUpdate(_id, {$set : (body)});
        return res.status(200).json({
            success: true,
            message: "user updated successfully"
        });
    } catch (error) {
        console.log("error in updateUser : ",error);
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}
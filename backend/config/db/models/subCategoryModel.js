import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    subCategory : {
        type : String,
        required : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'categories'
    }
});

const subCategoryModel = mongoose.models.subCategories || mongoose.model("subCategories", subCategorySchema);
export default subCategoryModel;
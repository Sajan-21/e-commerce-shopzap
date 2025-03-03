import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subCategories: [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'subCategories'
    }
  ],
});

const categoryModel = mongoose.model('categories', categorySchema);
export default categoryModel;
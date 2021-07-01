import mongoose from "mongoose";
import ReviewSchema from "./review.schema.js";

const ProductInfoSchema = new mongoose.Schema(
    //* Passando as definicoes de productInfo
    {
        productId: Number,
        category: String,
        width: String,
        height: String,
        depth: String,
        reviews: [ReviewSchema]
    }, { collection: "productInfo" }
);

export default ProductInfoSchema;
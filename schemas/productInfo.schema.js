import mongoose from "mongoose";

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
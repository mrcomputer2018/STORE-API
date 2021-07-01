import mongoose from "mongoose";

async function connect() {
    const uri = "mongodb+srv://proeja:m0411n0304@cluster0.g01er.mongodb.net/store?retryWrites=true&w=majority";
    return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
}

export { connect };
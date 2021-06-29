import mongodb from "mongodb";

function getClient() {
    const uri = "mongodb+srv://proeja:m0411n0304@cluster0.g01er.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    return new mongodb.MongoClient(uri);
}

export { getClient };
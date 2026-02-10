import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        console.log("Conectado con mongoDB");
    } catch (error) {
        console.log("Error al conectar con mongoDB");
        console.log(error.message);
    }
};

export default connectMongoDB;
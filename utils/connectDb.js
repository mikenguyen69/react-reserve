import mongoose from 'mongoose';

const connection =  {}

async function connectDb() {
    if (connection.isConnected) {
        console.log("Using existing connection");
        return;
    }

    // Use new database connection 
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log("DB connected", db.connection._readyState);

    connection.isConnected = db.connection._readyState;
}

export default connectDb;
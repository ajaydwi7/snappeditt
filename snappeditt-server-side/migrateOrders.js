const mongoose = require("mongoose");
const ServiceOrder = require("./models/ServiceOrder"); // Ensure this path is correct

// MongoDB connection string
const mongoURI =
  "mongodb+srv://ajaydwi7:Raja%23dwi7@cluster0.zy0by.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI

const migrateOrders = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");

    // Update all documents to add `order_cancelled` field
    await ServiceOrder.updateMany({}, { $set: { order_cancelled: false } });
    console.log(
      "Migration completed: Added `order_cancelled` field to all orders."
    );
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.connection.close();
  }
};

migrateOrders();

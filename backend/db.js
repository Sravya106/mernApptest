const mongoose = require('mongoose');
const mongoU = 'mongodb+srv://gofood:gofood%40123@cluster0.mho60.mongodb.net/gofood';

const main = async () => {
  try {
    await mongoose.connect(mongoU);
    console.log("Connected to MongoDB");
    const db = mongoose.connection.db;
    const collection = db.collection("food");
    const data = await collection.find({}).toArray();
    const collection_c = db.collection("foodC");
    const catdata = await collection_c.find({}).toArray();

    global.food_items = data;
    global.foodcat = catdata;
  } catch (err) {
    console.log(err);
  }
};

module.exports = main;







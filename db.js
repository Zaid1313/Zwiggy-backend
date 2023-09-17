const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const dburl = process.env.MONGODB_URI;

const mongoDB = async (err) => {
    try {
        await mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("DB connected");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        global.food_items = data;

        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();
        global.foodCategory = catData;

        // console.log("Food Items:", global.food_items);
        // console.log("Food Categories:", global.foodCategory);

        if(err){
            console.log("Error in fetching data", err)
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = mongoDB;

const mongoose = require('mongoose');
const serviceSchema= new mongoose.Schema(
    {
        name: String,
        averageTime: Number,
        price: Number
    }
);
const categorySchema = new mongoose.Schema({
    name: String,
    services:[{serviceSchema}],
});

const Category = mongoose.model('categories',categorySchema)
module.exports = Category;
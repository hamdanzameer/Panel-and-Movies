const mongoose = require('mongoose');
const moviesSchema = new  mongoose.Schema({
    title : String,
    genre : String,
    quality : String,
    imageUrl : String,
    downloadUrl : String,
    imageId: mongoose.Schema.Types.ObjectId,
});
module.exports = mongoose.model("Movies",moviesSchema);
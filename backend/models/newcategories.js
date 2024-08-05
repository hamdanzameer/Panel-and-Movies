const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceId: mongoose.Schema.Types.ObjectId,
  serviceName: { type: String, required: true },
  price: { type: Number, required: true },
  averageTime: { type: Number, required: true }
});

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  services: [serviceSchema]
});

const checkcat = mongoose.model('newcategory', categorySchema);

module.exports = checkcat;






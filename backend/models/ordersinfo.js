const mongoose = require('mongoose')
const ordersSchema = new mongoose.Schema({
  category :String,
  service:String,
  price:Number,
  link:String,
  charges:Number,
  amount:Number,
  time:Number,  

});
const orders= mongoose.model('orders',ordersSchema)
module.exports = orders

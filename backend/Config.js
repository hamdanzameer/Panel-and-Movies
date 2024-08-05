const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/PANELDATA";
mongoose.connect(url);

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error ;'))
db.once('open',()=>{
  console.log("Connected to database MongoDB")
});
module.exports =db;




import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let DatawSchema = new Schema({
  name: String,
  surname: String
});

module.exports = mongoose.model('Data', DatawSchema);
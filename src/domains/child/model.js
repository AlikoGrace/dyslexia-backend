const mongoose = require('mongoose');


const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      grade: {
        type: String,
        required: true
      },
      parent:{
        type: String,
        require:true
      }
      
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;

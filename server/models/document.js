const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
   id: { type: String },
   name: { type: String },
   url: { type: String },
   children: [{
    id: { type: String },
    name: { type: String },
    url: { type: String }
   }]
});

module.exports = mongoose.model('Document', documentSchema);
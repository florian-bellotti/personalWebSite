var mongoose = require('mongoose');

// define the mongo shema
var schema = new mongoose.Schema({ 
    artiste: String, 
    album: String, 
    categorie: String,
    imagePath: String
});

// define the collection to use 
var collection = mongoose.model('collection', schema);

// make the connexion
mongoose.connect('mongodb://localhost/collection');
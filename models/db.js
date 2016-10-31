var mongoose = require('mongoose');

// define the mongo shema
var albumSchema = new mongoose.Schema({ 
    artiste: String, 
    album: String, 
    categorie: String,
    imagePath: String
});

var filmSchema = new mongoose.Schema({ 
    titre: String, 
    imagePath: String
});

// define collections 
var Album = mongoose.model('collection', albumSchema);
var Film = mongoose.model('film', filmSchema);

// make the connexion
mongoose.connect('mongodb://localhost/collection');
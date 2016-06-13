var mongoose = require('mongoose'); 
var fs = require('fs');

// get all album
exports.albumlist = function albumlist(callback) {  
    var Album = mongoose.model('collection');
    Album.find({}, function(err, album) {
        if (err) {
            console.log(err);
        } else {
            callback("", album);
        }
    }).sort([['artiste', 'ascending']]);
};

// get album by id
exports.albumbyid = function albumlist(id, callback) {  
    var Album = mongoose.model('collection');
    Album.find({'_id' : id}, function(err, album) {
        if (err) {
            console.log(err);
        } else {
            callback("", album);
        }
    });
};

// add an album to the database 
exports.addalbum = function addalbum(artiste, album, categorie, imagePath, callback) {  
	var Album = mongoose.model('collection');
	var album = new Album({artiste: artiste, album: album, categorie: categorie, imagePath: imagePath});
	album.save(function (err, albumObj) {
		if (err) {
			console.log(err);
		} else {
			console.log('saved successfully:', albumObj);
		}
	});
};

// remove an album (by id)
exports.removealbum = function addalbum(id, callback) {  
	var Album = mongoose.model('collection');
	Album.find({'_id' : id}).remove().exec();
};
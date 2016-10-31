var mongoose = require('mongoose'); 
var fs = require('fs');

// get all film
exports.filmlist = function filmlist(callback) {  
    var Film = mongoose.model('film');
    Film.find({}, function(err, film) {
        if (err) {
            console.log(err);
        } else {
            callback("", film);
        }
    }).sort([['artiste', 'ascending']]);
};

// get film by id
exports.filmbyid = function filmlist(id, callback) {  
    var Film = mongoose.model('film');
    Film.find({'_id' : id}, function(err, film) {
        if (err) {
            console.log(err);
        } else {
            callback("", film);
        }
    });
};

// add an film to the database 
exports.addfilm = function addfilm(titre, imagePath, callback) {  
	var Film = mongoose.model('film');
	var film = new Film({titre: titre, imagePath: imagePath});
	film.save(function (err, filmObj) {
		if (err) {
			console.log(err);
		} else {
			console.log('saved successfully:', filmObj);
		}
	});
};

// remove an film (by id)
exports.removefilm = function addfilm(id, callback) {  
	var Film = mongoose.model('film');
	Film.find({'_id' : id}).remove().exec();
};
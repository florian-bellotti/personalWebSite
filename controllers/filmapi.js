var express = require('express'),
    router = express.Router(),
    db = require('./../models/db'),
    filmdata = require('./../models/film'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    multer  = require('multer'),
    upload = multer({ dest: 'public/images/' }),
    fs = require("fs");

// return the musique view  
function getFilmView(req, res){
    res.status(200).render('film');
}

// return the film admin view
function getFilmAdminView(req, res){
    res.status(200).render('filmadmin');
}

// return all ablums 
function getAllFilm(req, res){
    filmdata.filmlist(function(err, filmlist) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({films : filmlist});
        }
    });
}

// add an film to the database
function addFilm(req, res){
    if (req.body.titre != undefined) {
        filmdata.addfilm(req.body.titre, req.file.filename, function(err, filmlist) {        
            if (err) {
                console.log(err);
            } else {
                console.log(filmlist);
            }
            
        });
    }    
    res.redirect('/film/admin');
}

// remove an film from the database
function removeFilm(req, res){
    var id = req.param('id');

    // get all information from this film
    filmdata.filmbyid(id, function(err, film) {
        if (err) {
            console.log(err);
        } else {
            var path = 'public/images/' + film[0].imagePath;

            // remove the image
            fs.unlink(path , function(err) {
               if (err) {
                   return console.error(err);
               }
            });

            // remove from the database
            filmdata.removefilm(id, function(err, filmlist) {        
                if (err) {
                    console.log(err);
                } else {
                    console.log("supprimer : " + filmlist);
                }
            });
        }
        res.redirect('/musique/admin');
    });
}

// define all routes
router.get('/', getFilmView);
router.get('/list', getAllFilm);
router.get('/admin', getFilmAdminView);
router.get('/remove', removeFilm);
router.post('/add/', upload.single('image'), urlencodedParser, addFilm);

// export router
module.exports = router;
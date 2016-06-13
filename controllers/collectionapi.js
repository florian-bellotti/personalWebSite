var express = require('express'),
    router = express.Router(),
    db = require('./../models/db'),
    collectiondata = require('./../models/collection'),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: false }),
    multer  = require('multer'),
    upload = multer({ dest: 'public/images/' }),
    fs = require("fs");

// return the album view  
function getAlbumView(req, res){
    res.status(200).render('collection');
}

// return the album admin view
function getAlbumAdminView(req, res){
    res.status(200).render('collectionadmin');
}

// return all ablums 
function getAllAlbum(req, res){
    collectiondata.albumlist(function(err, albumlist) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({albums : albumlist});
        }
    });
}

// add an album to the database
function addAlbum(req, res){
    if (req.body.artiste != undefined && req.body.album != undefined) {
        collectiondata.addalbum(req.body.artiste, req.body.album, req.body.category, req.file.filename, function(err, albumlist) {        
            if (err) {
                console.log(err);
            } else {
                console.log(albumlist);
            }
            
        });
    }    
    res.redirect('/collection/admin');
}

// remove an album from the database
function removeAlbum(req, res){
    var id = req.param('id');

    // get all information from this album
    collectiondata.albumbyid(id, function(err, album) {
        if (err) {
            console.log(err);
        } else {
            var path = 'public/images/' + album[0].imagePath;

            // remove the image
            fs.unlink(path , function(err) {
               if (err) {
                   return console.error(err);
               }
            });

            // remove from the database
            collectiondata.removealbum(id, function(err, albumlist) {        
                if (err) {
                    console.log(err);
                } else {
                    console.log("supprimer : " + albumlist);
                }
            });
        }
        res.redirect('/collection/admin');
    });
}

// define all routes
router.get('/', getAlbumView);
router.get('/list', getAllAlbum);
router.get('/admin', getAlbumAdminView);
router.get('/remove', removeAlbum);
router.post('/add/', upload.single('image'), urlencodedParser, addAlbum);

// export router
module.exports = router;
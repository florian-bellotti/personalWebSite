var express = require('express'),
	app = express(),
	musique = require('./controllers/musiqueapi'),
	film = require('./controllers/filmapi');

app.use('/public', express.static(__dirname + '/public'))
.use('/node_modules', express.static(__dirname + '/node_modules'))
.set('view engine', 'jade')

.use('/musique', musique)
.use('/film', film)


.use(function(req, res, next){
    res.redirect('/musique');
})

.listen(8080, function () {
  console.log('Listening on port 8080!');
});
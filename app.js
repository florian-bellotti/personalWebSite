var express = require('express'),
	app = express(),
	collection = require('./controllers/collectionapi');

app.use('/public', express.static(__dirname + '/public'))
.use('/node_modules', express.static(__dirname + '/node_modules'))
.set('view engine', 'jade')

.use('/collection', collection)


.use(function(req, res, next){
    res.redirect('/collection');
})

.listen(8080, function () {
  console.log('Listening on port 8080!');
});
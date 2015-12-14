var express = require('express');
var app = express();

app.use('/content', express.static('content'));
app.use('/bower_components', express.static('bower_components'));

app.use(function(req, res) {
	res.sendFile(__dirname+'/index.html');
});

var port = process.argv[2] || 3000;
app.listen(port);
console.log('listening on '+port);
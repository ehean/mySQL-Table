var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

var mysql = require('./dbcon.js');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var DATACOUNT = 5;

app.set('port', 3000);


app.get('/',function(req, res, next){
	var context = {};
	mysql.pool.query('SELECT * FROM exerciseData', function(err, rows, fields){
	if(err){
		next(err);
		return;
	}
	console.log("rows: " + JSON.stringify(rows));
	context.results = rows;

	res.render('home', context);
	});
});



app.post('/', function(req,res,next){
	console.log("input: " + JSON.stringify(req.body));
	//var context = {};
	mysql.pool.query("INSERT INTO exerciseData (`name`) VALUES (?)", [req.body.name], function(err, result){
		if(err){
			next(err);
			return;
		}
		else {
			var context = {};
			mysql.pool.query('SELECT * FROM exerciseData', function(err, rows, fields){
			if(err){
				next(err);
				return;
			}
			console.log("rows: " + JSON.stringify(rows));
			context.results = rows;

			res.render('home', context);
			});
		}
	});
});




app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

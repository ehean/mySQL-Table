//document.addEventListener('DOMContentLoaded', submitData);
var express = require('express');
var mysql = require('./dbcon.js');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

var DATACOUNT = 5;
var dataObject = { 'name': '', 'reps': '', 'weight': '', 'date': '', 'lbs': '' }


app.get('/',function(req,res,next){
	var context = {};
	//document.addEventListener('DOMContentLoaded', submitData);
	mysql.pool.query("DROP TABLE IF EXISTS excerciseData", function(err){
		var createString = "CREATE TABLE excerciseData(" +
		"id INT PRIMARY KEY AUTO_INCREMENT," +
		"name VARCHAR(255)," +
		"reps INT," +
		"weight INT"
		"date DATE" +
		"lbs INT)";
		mysql.pool.query(createString, function(err){
	       context.results = "Table reset";
	       res.render('home',context);
		//   var submitData = document.getElementById('submitData').addEventListener('click', function(event){
		//   	console.log("submit button clicked");
		//   });
	     })
	});
});



// 	var req = new XMLHttpRequest();
// 	var payload = {data:null};
//
// 	for (key in dataObject) {
// 		if (!document.getElementById(key + "Form").value)
// 			dataObject[key] = null;
// 		else
// 			dataObject[key] =  document.getElementById(key + "Form").value;
// 	}
//
// 	payload.data = dataObject;
// 	req.open('POST', 'http://httpbin.org/post', true);
// 	req.setRequestHeader('Content-Type', 'application/json');
// 	req.addEventListener('load', function() {
// 	if (req.status >= 200 && req.status < 400) {
// 		//var response = JSON.parse(req.responseText);
// 		console.log(JSON.parse(req.response));
// 		document.getElementById('dataOutput').textContent = req.responseText;
// 	}
// 	else {
// 		console.log("Error in network request: " + req.statusText);
// 	}});
// 	req.send(payload.data);
// 	event.preventDefault();
// })


function makeBold(str) {
  return '<strong>' + str + '</strong>';
}

function populateElement(elem, val) {
  elem.innerHTML = val;
}

function removeChildren(parent) {
  var p = document.getElementById(parent);
  while (p.firstChild) {
    p.removeChild(p.firstChild);
  }
}


function createAndAppendDiv(id, parent, val) {
  var newDiv = document.createElement("div");
  parent.appendChild(newDiv);
  newDiv.id = id;
  populateElement(newDiv.id, val);
}

function createTempForm(id, parent) {
	var newForm = document.createElement("form");
	parent.appendChild(newForm);
	newForm.id = id;
	var newField = document.createElement("fieldset");
	newForm.appendChild(newField);
	var newLegend = document.createElement("legend");
	newLegend.innerHTML = "Enter Your Exercise Data Below";

}


app.use(function(req,res){
	res.type('plain/text');
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

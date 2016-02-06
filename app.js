var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('appointmentlist',['appointmentlist']);
var bodyParser = require('body-parser');
//var mycollection = db.collection('appointmentlist');*/

/*console.log(db);
console.log(mycollection);*/


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/appointmentlist',function(req,res){
	console.log('I received a GET request');
	db.appointmentlist.find(function(err, docs){
		console.log('in database connection');
		res.json(docs);
	});

});

app.post('/appointmentlist',function(req,res){
	console.log(req.body);
	db.appointmentlist.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/appointmentlist/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.appointmentlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
})

app.get('/appointmentlist/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.appointmentlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/appointmentlist/:id', function(req,res){
	var id=req.params.id;
	console.log(req.body.description);
	db.appointmentlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update: {$set: {date: req.body.date, time: req.body.time, description: req.body.description}},
	new: true}, function(err,doc){
		res.json(doc);
	
	});
});


console.log("Server running on port 3000");

module.exports = app;
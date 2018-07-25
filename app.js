const express = require('express');
var mysql = require('mysql');
const app = express ();

var pool = mysql.createPool({
	host	: process.env.db_host,
	user	: process.env.db_username,
	password: process.env.db_password,
	database: process.env.db_name
});

var bodyParser = require('body-parser');//allows use of body parser, similar to express

app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

var path = require('path');

app.use(express.static(__dirname + '/Public')); // set the static files location /public/img will be /img for users


//Frontend route

app.get('/', function(req, res) {

   res.sendFile(path.resolve('Public/index.html'));
 
 })

app.get('/index2', function(req, res) {

   res.sendFile(path.resolve('Public/index2.html'));
 
 })

app.get('/index3', function(req, res) {

   res.sendFile(path.resolve('Public/index3.html'));
 
 })
app.get('/index4', function(req, res) {

   res.sendFile(path.resolve('Public/index4.html'));
 
 })
app.get('/buttontest', function(req, res) {

   res.sendFile(path.resolve('Public/buttontest.html'));
 
 })

///////////////////////////////////////////////////////

app.get ('/Company_Name_All', function (req,res){ //'/routetest' name of route

	pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM companies ORDER BY companies.Company_Name ASC', function (error, results, fields){
			connection.release();
			if(!err) {
				res.json(results);
			}
		});
	});
});
app.get ('/NTID_Name_ALL', function (req,res){ //'/routetest' name of route

	pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM NOLATECH_CALC ORDER BY NOLATECH_CALC.Title ASC', function (error, results, fields){
			connection.release();
			if(!err) {
				res.json(results);
			}
		});
	});
});
app.get ('/Position_All', function (req,res){ //'/routetest' name of route
//localhost:3000/Position_All?Company_Name=wade after route name, ? then key name (case sensitive) = value. Value is then passed to route function via req.query."key"
//localhost:3000/Position_All?Company_Name=wade&key=value&key=value
	pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM openings INNER JOIN companies on openings.Company_ID = companies.Company_ID ORDER BY openings.position ASC', function (error, results, fields){
			connection.release();
			if(!err) {
				res.json(results);
			}
		});
	});
});

app.get ('/Company_Name_Search', function (req,res){ 
	var searchinput = req.query.Company_Name;
	pool.getConnection(function(err, connection){
		var sqlquery= "SELECT * FROM companies WHERE Companies.Company_Name LIKE '%"+searchinput+"%' ORDER BY companies.Company_Name ASC";
		connection.query(sqlquery, function (error, results, fields){
			connection.release();
			if(!err) {
				res.json(results);
			}
		});
	});
});
app.get ('/Company_Name_Openings_Search', function (req,res){ 
	var searchinput = req.query.Company_Name;
	pool.getConnection(function(err, connection){
		var sqlquery= "SELECT * FROM openings INNER JOIN companies on openings.Company_ID = companies.Company_ID WHERE companies.Company_Name LIKE '%"+searchinput+"%' ORDER BY companies.Company_Name ASC";
		console.log(sqlquery);
		connection.query(sqlquery, function (error, results, fields){
			connection.release();
			if(!err) {
				res.json(results);
			}
		});
	});
});
app.get ('/Position_Search', function (req,res){ 
	var searchinput = req.query.Position;
	pool.getConnection(function(err, connection){ 
		var sqlquery= "SELECT * FROM openings INNER JOIN companies on openings.Company_ID = companies.Company_ID WHERE openings.Position LIKE '%"+searchinput+"%' ORDER BY openings.position ASC";
		console.log(sqlquery);
		connection.query(sqlquery, function (error, results, fields){
			connection.release();
			if(!err) {
				res.json(results);
			}
		});
	});
});
app.get ('/NTID_TITLE_SEARCH', function (req,res){ 
	var searchinput = req.query.Title;
	pool.getConnection(function(err, connection){
		var sqlquery= "SELECT * FROM NOLATECH_CALC WHERE NOLATECH_CALC.Title LIKE '%"+searchinput+"%' ORDER BY nolatech_calc.Title ASC";
		console.log(sqlquery);
		connection.query(sqlquery, function (error, results, fields){
			connection.release();
			if(!err) {
				res.json(results);
			}
		});
	});
});
app.get ('/Openings_NT_TITLE', function (req,res){ 
	var searchinput = req.query.Title;
	pool.getConnection(function(err, connection){
		var sqlquery= "SELECT * FROM openings INNER JOIN NOLATECH_CALC on openings.NTID = NOLATECH_CALC.NTID WHERE NOLATECH_CALC.title LIKE '%"+searchinput+"%' ORDER BY openings.NTID ASC";
		console.log(sqlquery);
		connection.query(sqlquery, function (error, results, fields){
			connection.release();
			if(!err) {
				res.json(results);
			}
		});
	});
});
app.post ('/New_Pos', function (req,res){ 
	var CID_D = req.body.CID_D_i; //CID_D_i var name listed in front, var CID_D defined in backend in this route
	var pos_input = req.body.pos_input_i;
	var pos_web_input = req.body.pos_web_input_i;
	var NTID_D = req.body.NTID_D_i;
	pool.getConnection(function(err, connection){
		var sqlquery= "INSERT INTO Openings (Company_ID,Position,Position_Source,NTID) Values ("+CID_D+",'"+pos_input+"','"+pos_web_input+"',"+NTID_D+")"
		console.log(sqlquery);
		connection.query(sqlquery, function (error, results, fields){
			if (error) {
				console.log("ERROR", error);
			}
			connection.release();
			if(!err) {
				res.send({"success":"true"});
			}
		});
	});
});
	/*console.log(req);
	console.log('route test');
	res.send('route test - this is the response');*/


// app.post ('/routetest2', function (req,res){
// 	console.log('route test2 2');
// 	//res.send('route test2 2- this is the response');
// });

var port = process.env.PORT || 3001

app.listen(port, function(){ console.log('Example app listening on port 3001!')})

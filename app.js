var express = require("express");
var mongoose = require("mongoose");
var fs = require("fs");
var bodyParser = require("body-parser");


var app = express();
var port = 3000 || process.env.PORT;



var db = mongoose.connect('mongodb://localhost/HunterDB');
var db1 = mongoose.connection;
db1.on('error', console.error.bind(console, 'MongoDB connection error'));
var hunterModel = require("./models/hunterModel");
var HuntRt = require("./Routes/hunterRoutesAndMiddleWares")();

app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
/*
var hutchinstance = new hunterModel({_id:8, Name:"Crowley", ht:174, kills:150});

hutchinstance.save( (err) =>  err ? console.log("error : "+err): console.log("saved"));
*/


//setting up route for 'get'

/*
var Rt = express.Router();

Rt.route('/superhunters')
.post((req, res) => {
	var hunter1 = new hunterModel(req.body);
	
	hunter1.save();
	res.send(hunter1);
})
.get((req, res) => hunterModel.find(req.query, (err, ans) => err ? res.status(500).send(err) : res.json(ans)));
*/

var HuntRt = require("./Routes/hunterRoutesAndMiddleWares")();
app.use('/AnyWord/superhunters',HuntRt);


//--------------------------------------------------------------------------------------------------------



//get #0
HuntRt.route('/books').get((req, res) => res.json({Message : "Welcome"}));

//get #1
app.get("/", (req, res, next) => 
{
    res.json(["Tony","Lisa","Michael","Ginger","Food","Hunt"]);
});

//get #2
app.get('/flower', (req, res) => res.send("Are you sweet?"));


//get #3 - with parameters
app.get("/cars/:car/:num", (req,res) => {

	res.send('The hunters own '+ req.params.num+' '+req.params.car);
});

//----------------------------------------------------------------------------------------------------//

//using get request to add data

//will return raw data because unbeknownst to FS that it's a JSON
var data = fs.readFileSync('./Hunters.json');



//We parse the raw data to JSON format
var hunters = JSON.parse(data);

app.get('/all', (req, res) => res.send(hunters))

app.get('/add/:hname/:ht', addHunter);


//explicitly defining callback function
function addHunter(req, res)
{
	var hunter = req.params.hname;
	var ht = Number(req.params.ht);

	hunters[hunter] = ht;

	var data = JSON.stringify(hunters);
	fs.writeFile('./Hunters.json', data , (err) => console.log("All set"));

	res.send('ADDED');
}

//----------------------------------------------------------------------------------------------------//

//Adding another route for search
app.get('/search/:hunter', (req,res) => hunters[req.params.hunter] ? res.send("Found") : res.send("Not Found"));

//----------------------------------------------------------------------------------------------

//Adding another router
const anRt = express.Router({strict:true});
app.use('/addHunters',anRt);

anRt.get('/:hname/:ht', addHunter);

//----------------------------------------------------------------------------------------------

app.listen(3000, () => 
{
    console.log("Server running on port "+port);
});


//app.use(express.static('nuffin'));

//----------------------------------------------------------------------------------------------------//




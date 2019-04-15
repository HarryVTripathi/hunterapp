const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var hunterSchema = new Schema({
	_id : Number,
	Name : String,
	ht : Number,
	kills : Number
});


//Compile model from schema
var Hunter = mongoose.model('Hunter',hunterSchema);


module.exports = Hunter;


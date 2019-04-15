var express = require('express');
var hunterModel = require("../models/hunterModel");
const HunterController = require("./HunterController")(hunterModel);

var routes = function()
{
	var HuntRt = express.Router();

	HuntRt.route('/')
	.post(HunterController.post)
	.get(HunterController.get);


	HuntRt.route('/:huntID')
	.get((req, res) => hunterModel.findById(req.params.huntID, (err,ans) => err ? res.status(500).send(err) : res.json(ans)))
	.put((req, res) => hunterModel.findById(req.params.huntID, (err, hunter) => {
		if(err)
			res.status(500).send(err);

		else
		{
			hunter.Name = req.body.Name;
			hunter.ht = req.body.ht;
			hunter.kills = req.body.kills;
			hunter.save();
			res.send(hunter);
		}
	}));
	


	return HuntRt;
};

module.exports = routes;
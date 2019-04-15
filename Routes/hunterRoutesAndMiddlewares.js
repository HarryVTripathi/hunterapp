const express = require('express');
const hunterModel = require("../models/hunterModel");
const HunterController = require("./HunterController")(hunterModel);

const routes = function()
{
	var HuntRt = express.Router();

	HuntRt.route('/')
	.post(HunterController.post)
	.get(HunterController.get);


	//Using middleware for the only routes with "huntID"
	HuntRt.use('/:huntID', (req, res, next) => {
		hunterModel.findById(req.params.huntID, (err, hunter) => {
			if(err)
				res.status(500).send(err);

			else if(hunter)
			{
				//The middleware does something to the request; defines and sets a new property hunter in this case
				req.hunter = hunter;
				next();
			}

			else
				res.status(404).send("Hunter not found");

	})});

	//If we get redirected to .get from the middleware that means every thing's good.
	HuntRt.route('/:huntID')
	.get((req, res) => res.json(req.hunter)	/* If there IS no hunter, then it will never get here */)
	.put((req, res) => hunterModel.findById(req.params.huntID, (err, hunter) => {

		req.hunter.Name = req.body.Name;
		req.hunter.ht = req.body.ht;
		req.hunter.kills = req.body.kills;
		req.hunter.save();
		res.send(hunter);
	}))
	.patch((req, res) => {
		for(var p in req.body)
		{
			req.hunter[p] = req.body[p];
		}

		req.hunter.save();

		res.json(req.hunter);
	})
	.delete((req, res) => req.hunter.remove((err) => err ? res.status(500).send(err): res.send("Removed")));
	
	return HuntRt;
};

module.exports = routes;
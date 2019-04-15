let HunterController = function(hunterModel)
{
    var post = (req, res) => {
        var hunter1 = new hunterModel(req.body);
    
        hunter1.save();
        res.status(201);
        res.send(hunter1);
    }

    var get = (req, res) => 
    {
        hunterModel.find(req.query, (err, hunters) => {
            if(err)
            {
                res.status(500);
                res.send(err);
            } 
            
            else
            {
                var returnHunters = [];
                hunters.forEach((element, index, array) => {
                    var newHunter = element.toJSON();
                    newHunter.links = {};
                    newHunter.links.self = 'http://' + req.headers.host + '/AnyWord/superhunters/' + newHunter._id;
                    returnHunters.push(newHunter);
                });
            res.json(returnHunters);

            }
        });
            
    }

    return { post: post, get: get};
}

module.exports = HunterController;
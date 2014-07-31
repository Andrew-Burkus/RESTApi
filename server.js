/*=============================================
=            Server.js
=============================================*/
/*==========  Application and HTTP Server  ==========*/

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
var router = express.Router();
var port = process.env.PORT || 8080;

/*=============================================
=            Mongoose API
=============================================*/

var mongoose = require('mongoose');

/*==========  DB URL  ==========*/

mongoose.connect('mongodb://YOUR_DATABASE_HERE');

/*==========  DB Models  ==========*/

var Bear = require('./app/models/bear');
var Student = require('./app/models/student');

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

/*=============================================
=            Test Route
=============================================*/

router.get('/', function(req, res) {
	res.json({ message: 'it works!' });
});

/*=============================================
=            HTTP Requests
=============================================*/

router.route('/bears')

/*==========  POST  ==========*/

	.post(function(req, res) {

		var bear = new Bear();
		bear.name = req.body.name;

		bear.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Bear created!' });
		});

	})

/*==========  GET  ==========*/

	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err) {
				res.send(err);
			}
			res.json(bears);
		});
	});

/*==========  :PARAM  ==========*/

router.route('/bears/:bear_id')

	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

/*==========  PUT  ==========*/

	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err) {
				res.send(err);
			}

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err) {
					res.send(err);
				}

				res.json({ message: 'Bear updated!' });
			});

		});
	})

/*==========  DELETE  ==========*/

	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		},
		function(err, bear) {
			if (err) {
				res.send(err);
			}
			res.json({message:'Successfully Deleted'});
		});
	});

/*=============================================
=            End of HTTP Requests
=============================================*/

app.use('/api', router);

/*==========  Listening on...  ==========*/

app.listen(port);
			//random line for -_=+=
console.log('Frankie-Jackie-Magic-Hands on port: ' + port);

/*=============================================
=            End of Server.js
=============================================*/
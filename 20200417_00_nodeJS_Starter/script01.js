var request = require('request');

request('http://www.google.com', function(err, res, body){
	if(err){
		console.log("error!!!!");
	}
	else{
		console.log(body);
	}
});

var express = require('express');
var app = express();
var requestModule = require("request")

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	// TODO: show help instead
	res.send("Use <a href='team/29238'>team/29238</a>")
});

app.get('/team/:teamID', function (req, res) {
	getTeamInfo(req.params.teamID, res);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// Important URLs
var teamInfoAPIPrefix = "https://extra-life-team-info.herokuapp.com/team/";

function getTeamInfo(teamID, res) {
	requestModule({ url: teamInfoAPIPrefix + teamID }, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var teamInfo = JSON.parse(body);
			res.render('dash', teamInfo);
		} else {
			// TODO: handle error
			console.log(error);
		}
	});
}

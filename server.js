
var express = require("express");
var app = express();
var path = require("path");

app.use('/libs',  express.static(__dirname + '/bower_components'));
app.use('/app',  express.static(__dirname + '/app'));
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server listening on port %d in %s mode", this.address().port, app.settings.env);
});

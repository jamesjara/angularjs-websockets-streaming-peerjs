
var express = require("express");
var app = express();
var path = require("path");

app.use('/app', express.static(__dirname + '/src'));
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server listening on port %d in %s mode", this.address().port, app.settings.env);
});

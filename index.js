var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})


var getRandom = function() {

	//1-6之间的随机数
    var num = parseInt(Math.random() * 5 + 1, 10);
    return num;
}
var getRandomLinks = function() {
	var links = [];
	var link;
    for(var i = 0; i < 6; i++) {
        link = {};
    	link.source = getRandom() + ',' + getRandom();
    	link.target = getRandom() + ',' + getRandom();
    	links.push(link);
    }
    return links;
}
io.on('connection', function(socket) {
  if(linkInterval) {
    clearInterval(linkInterval);
  }
  console.log('user connected');
  var linkInterval = setInterval(function() {
  	  console.log('once' + new Date());
      io.emit('link change', getRandomLinks());
  }, 5000);
  socket.on('disconnect', function(){
  	clearInterval(linkInterval);
    console.log('user disconnected');
  });
});
http.listen(3000, function() {
	console.log('server is running on *:3000')
})
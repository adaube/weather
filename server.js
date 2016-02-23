var express = require('express'),
    logger  = require('morgan')('dev'),
    handlebars = require('handlebars');
    server  = express();

server.use(express.static(__dirname+'/public'));
server.use(logger);
server.set('port', process.env.PORT || 8080);

server.get('/', home);

server.listen(server.get('port'), listenCallback);


function home(req, res){
  res.sendFile('/html/index.html', {root: __dirname+'/public'});
}

function listenCallback(){
  console.log('Now listening on port ' + server.get('port'));
}

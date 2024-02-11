const express = require("express");
const mustacheExpress = require('mustache-express');

const app = express();
const port = process.env.PORT || 3005;

// Watch live
if (process.argv.includes('dev')) {
    const vaccs = require('./vaccs');
    vaccs.startWatch(app);
}

// Set template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// WebSocket
const expressWs = require('express-ws')(app);
let currentCode = '';

app.ws('/', function(ws, req) {
  console.log('¡Hey, aquí hay un nuevo cliente! Enviémosle los que tenemos hasta ahora.');
  ws.send(currentCode);
  ws.on('message', function(msg) {
    currentCode = msg;
    expressWs.getWss().clients.forEach((client)=> client.send(msg))
  });
});

// Endpoints
app.get('/', (req, res) => {
    res.render('index.mustache')
});

//
const server = app.listen(port, () => console.log(`Collaboritor app listening on port http://localhost:${port}.`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

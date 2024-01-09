const express = require("express");
const mustacheExpress = require('mustache-express');

const app = express();
const port = process.env.PORT || 3000;

// Watch live
if (process.argv.includes('dev')) {
    const vaccs = require('./vaccs');
    vaccs.startWatch(app);
}

// Set template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Endpoints
app.get('/', (req, res) => {
    res.render('index.mustache', { name: 'Gnuu' })
});

//
const server = app.listen(port, () => console.log(`Collaboritor app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
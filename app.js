var express = require('express');
var path = require('path');

var app = express();

// Database Setup
var mongo = require('mongodb');
var mongoose = require('mongoose');
var databaseURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/tasky2';
mongoose.connect(databaseURI);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.listen(app.get('port'));
console.log('App listening on port 3000');

// Routes
var routes = require('./routes/config');

app.get('/', routes.Root);
app.get('/tasks', routes.Tasks.Index);
app.post('/tasks', routes.Tasks.Create);
app.put('/tasks/:id', routes.Tasks.Update);
app.delete('/tasks/:id', routes.Tasks.Destroy);
app.put('/tasks/:id/finish', routes.Tasks.Finish);
app.put('/tasks/:id/unfinish', routes.Tasks.Unfinish);
app.get('/phone_numbers', routes.PhoneNumbers.Index);
app.post('/phone_numbers', routes.PhoneNumbers.Create);
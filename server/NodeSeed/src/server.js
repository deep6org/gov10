
const express = require('express');
const log = require('./utils/logger.js');

const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

// EXPRESS CONFIGS ===================================
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser()); 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

// APPLY ROUTES
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const hypercore = require('hypercore')
var feed = hypercore('./data', {valueEncoding: 'json'})

app.post('/', (req,res) => {
	console.log(req.body)
	// add to store
	feed.append(req.body)
	res.send(req.body).status(200)
});

let list = []

feed.createReadStream({ live: true }).on('data', (data) => {
	console.log('-------------')
	console.log(data.needsFunder)
	list.push(data)
})

app.get('/list', (req,res) => {
	
	// get the list not approved
	res.send(list)
})

app.listen(PORT, () => {
  log.info({ module: 'api' }, `${app.name} listening on port:${PORT}`);
});

// Used for testing
module.exports = app;

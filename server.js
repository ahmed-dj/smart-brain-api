const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image'); 
const profile = require('./controllers/profile');

const db =  knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'bachir',
	  password : '',
	  database : 'smartbrain'
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

//app.get('/', (req, res) => { res.send(database.users); });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/image', image.handleApiCall);


app.listen(3000, () => {
	console.log('app is running on port 3000...');
});
// Minimal Simple REST API Handler (With MongoDB and Socket.io)
// Plus support for simple login and session
// Plus support for file upload
// Author: Yaron Biton misterBIT.co.il

// content:
// defs
// demo server array
// socket 
// yaron - mongo and session

"use strict";
var users = [];
var usersIdCount = 100;
var cl = console.log;

const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongodb = require('mongodb')

const clientSessions = require("client-sessions");
const upload = require('./uploads');
const app = express();

var corsOptions = {
	origin: /http:\/\/localhost:\d+/,
	credentials: true
};

const serverRoot = 'http://localhost:3003/';
const baseUrl = serverRoot + 'data';
app.use(express.static('uploads'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(clientSessions({
	cookieName: 'session',
	secret: 'C0d1ng 1s fun 1f y0u kn0w h0w', // set this to a long random string!
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));
const http = require('http').Server(app);
const io = require('socket.io')(http);

cl('init server  - function - restartUsers: ', users.length)

/////    utils

function getUniqueId() {
	usersIdCount++;
	return usersIdCount;
	// TBD - get reat unique id
}

//////////////////////////////////////////////////////////////
////////////////   DEMO SERVER BY USING ARRAY   //////////////
//////////////////////////////////////////////////////////////
//  restart users at array
restartUsers();

//======================================================================
// GETs filtered list - either matched or the rest. not the reuesting user
app.get('/data/:objType/:filter/:id', function (req, res) {
	const objType = req.params.objType;
	const filter = req.params.filter;
	const objId = req.params.id;
	console.log('Get USERS FILTERED: obj:', objType, ' filter:', filter, ' objId:', objId);
	var filteredUsers;
	if (filter === 'matched') { // all that match
		console.log('Get USERS FILTERED: inside matched');
		filteredUsers = users.filter(function (user) {
		//	console.log('*****Get FILTERED USERS****',  user.matches)
			return ((user.matches[objId] === true)&&(user.id!=objId));
		});
	}
	else {
		filteredUsers = users.filter(function (user) {//all that is not match
	//	console.log('Get filters - browse', user)
			return (!(user.matches[objId] === true)&&(user.id!=objId));
		});
	}
	//console.log('Get USERS FILTERED: filtered users:', filteredUsers)
	res.json(filteredUsers);
});


//====================================================================================
app.put('/likeUser', function (req, res) {
	//console.log('LIKE1: req.body.data:', req.body.data);
	var id1 = req.body.data.id1;
	var id2 = req.body.data.id2;
	var user1 = getUserById(id1);
	var user2 = getUserById(id2);
	var bul = req.body.data.bul
	//console.log('LIKE2: user1, user2, bul', user1, user2, bul);
	user1.likes[user2.id] = bul; // bul === true: like , false:dislike 
	//console.log('LIKE3: user1 likes', user1.likes);
	if (bul === true) {//check for match
		//console.log('LIKE: user clicked "LIKE" ');
		if (user2.likes[user1.id] === true) { //there is a match!
			user1.matches[user2.id] = true;
			user2.matches[user1.id] = true;
			console.log('LIKE: matches!!, reurning both users:', user1, user2);
			res.json({ user1, user2 });
			//return;
		}
		else {//no match - not exist or not like
			user1.matches[user2.id] = false;
			user2.matches[user1.id] = false;
		//	console.log('LIKE: NO matches!!, returning USER1: ', user1);
			res.json({ user1 });
		}
	}
	else { // check if to set an unmatch
		console.log('LIKE: user clicked "DISLIKE" ');
		if (user1.matches[user2.id] === true) { //there was a match
			user1.matches[user2.id] = false;
			user2.matches[user1.id] = false;
		//	console.log('LIKE: there was a match before, now reset it to unmatch:', user1);
		}
		res.json({ user1 });
	}
	//console.log('LIKE: End of LIKE function');
	res.end();
});

//====================================================================================

function getUserIdxById(id) {
	var index = users.findIndex((user) => user.id === id);
	return index;
}

//====================================================================================

function getUserById(id) {
	var objUser = users.find(function (user) {
		return (id === user.id)
	})
	return objUser
}
//====================================================================================
// GETs restart users
app.get('/restartUsers', function (req, res) {
	// const objType = req.params.objType;
	restartUsers();
	cl('GET - function - restartUsers: ', users.length)
	res.json(users);
});
//======================================================================
function restartUsers() {

	users = [
		{
			id: 1, name: 'lora from server', gender: 'f', birth: '1990', description: 'like to love',
			userName: '111', password: '111', likes: { '2': false }, dislikes: { '11': false }, matches: {},
			lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-1.jpg']
		},
		{
			id: 2, name: 'chen', gender: 'f', birth: '1991', description: 'love to love',
			userName: '222', password: '222', likes: {}, dislikes: { '45': false }, matches: {},
			lastLine: "hola??", photos: ['http://dreamatico.com/data_images/woman/woman-2.jpg']
		},
		{
			id: 3, name: 'keren', gender: 'f', birth: '1995', description: 'love to love',
			userName: '333', password: '333', likes: { '1': true }, dislikes: { '45': false }, matches: {},
			lastLine: "daaa??", photos: ['http://dreamatico.com/data_images/woman/woman-3.jpg']
		},
		{
			id: 4, name: 'inbar', gender: 'f', birth: '1996', description: 'love to love',
			userName: '444', password: '444', likes: { '2': true, '11': false }, dislikes: { '4': false }, matches: {},
			lastLine: "dooo??", photos: ['http://dreamatico.com/data_images/woman/woman-4.jpg']
		},
		{
			id: 11, name: 'yakterina', gender: 'f', birth: '1997', description: 'love is in the air',
			userName: '555', password: '555', likes: { '1': true, '2': false }, dislikes: { '2': false }, matches: {},
			lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-5.jpg']
		},
		{
			id: 12, name: 'ilan', gender: 'm', birth: '1998', description: 'like to lora', userName: '666',
			password: '666', likes: { '1': true, '11': true, '12': true, '2': false }, dislikes: { '3': false }, matches: {}, lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-6.jpg']
		}
	]
	cl('function - restartUsers: ', users.length)
}
//======================================================================
//app.get('/restartUsers', function (req, res) {
// GETs a single user
app.get('/getUser', function (req, res) {
	const objType = req.params.objType;
	const id = req.params.id;
	cl(`Getting you an ${objType} with id: ${objId}`);
	var obj = getUserById(id)
	cl("Returning a user" + obj);
	res.json(obj);

});

//====================================================================================
// add user - old (update) or new
app.post('/users/addUser', upload.single('file'), function (req, res) {

var user=req.body.data;
	if(req.body.data.id){
		//console.log('ADD USER: OLD USER req.body.data.id', req.body.data.id)
		var idx = getUserIdxById(req.body.data.id);
	//	console.log('ADD USER: OLD USER get ID by IDX', req.body.data.id, idx);
		users.splice(idx,1,user);
	//	console.log('ADD USER: OLD USER updated: idx, user[idx]', idx, users[idx]);
	}
	else{
	//console.log('ADD USER: NEW USER req.body', req.body.data);
	var userId = getUniqueId();
	var photos=[];
	photos.push(`https://thechive.files.wordpress.com/2012/01/beautiful-women-${Math.floor(Math.random()*36)}.jpg`)
//	console.log('*******ADD USER: image address', photos);
	var templateUser = { id:userId, likes: {}, dislikes: {}, matches: {}, lastLine: "whatsapp??", photos: photos}
	user = Object.assign(req.body.data,templateUser);
//	console.log('ADD USER: **new created user**:',user)
	users.push(user)
	cl("ADD USER: user added", user);
	}
	res.json(user);
});

//====================================================================================
// Login
app.post('/login', function (req, res) {
	//	cl('LOGIN0: req.body.user:', req.body.user);
	//cl('LOGIN1: userName:', req.body.user.login, '/pass:', req.body.user.password);
	var userName = req.body.user.login;
	var password = req.body.user.password;
	var currUser = users.find(function (user) {
		//cl('LOGIN 1.5 user-', user.userName, user.password)
		return (user.userName == userName && user.password == password)
	})
//	cl('LOGIN2: currUser:', currUser);
	res.json(currUser);
});

//////////////////////////////////////////////////////////////
////////////////   Yaron's simple ful server   //////////////
//////////////////////////////////////////////////////////////

//==============================================================================
function dbConnect() {
	return new Promise((resolve, reject) => {
		// Connection URL
		var url = 'mongodb://ilan:123@ds029665.mlab.com:29665/sprint4';
		// Use connect method to connect to the Server
		mongodb.MongoClient.connect(url, function (err, db) {
			if (err) {
				cl('Cannot connect to DB', err)
				reject(err);
			}
			else {
				//cl("Connected to DB");
				resolve(db);
			}
		});
	});
}
//======================================================================
// GETs full list
app.get('/data/:objType', function (req, res) {
	console.log('GET FULL LIST - entered')
	const objType = req.params.objType;
	dbConnect().then(db => {
		const collection = db.collection(objType);
		collection.find({}).toArray((err, objs) => {
			if (err) {
				cl('Cannot get you a list of ', err)
				res.json(404, { error: 'not found' })
			} else {
				cl("Returning list of " + objs.length + " " + objType + "s");
				res.json(objs);
			}
			db.close();
		});
	});
});

//======================================================================

// GETs log out
app.post('/logOut', function (req, res) {
	// const objType = req.params.objType;
	cl('logOut:', req.body.data);
	res.json(req.body.data)
});


//====================================================================================
// DELETE
app.delete('/data/:objType/:id', function (req, res) {
	const objType = req.params.objType;
	const objId = req.params.id;
	cl(`Requested to DELETE the ${objType} with id: ${objId}`);
	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.deleteOne({ _id: new mongodb.ObjectID(objId) }, (err, result) => {
			if (err) {
				cl('Cannot Delete', err)
				res.json(500, { error: 'Delete failed' })
			} else {
				cl("Deleted", result);
				res.json({});
			}
			db.close();
		});
	});
});



//====================================================================================
// POST - addUser 
app.post('/addUser', upload.single('file'), function (req, res) {
	// console.log('req.body', req.body);
	const objType = req.params.objType;
	cl("*************************************");
	// cl('POST for req.body- ', req.body );
	const obj = req.body.data;
	delete obj._id;
	//console.dir( obj);
	// If there is a file upload, add the url to the obj
	if (req.file) {
		obj.imgUrl = serverRoot + req.file.filename;
	}

	dbConnect().then((db) => {
		var txt = 'users'
		const collection = db.collection('users');

		collection.insert(obj, (err, result) => {
			if (err) {
				cl(`Couldnt insert a new ${objType}`, err)
				res.json(500, { error: 'Failed to add' })
			} else {
				cl("user added1=", obj);
				res.json(obj);
			}
			db.close();
		});
	});

});



//====================================================================================
// PUT - updates
app.put('/data/:objType/:id', function (req, res) {
	const objType = req.params.objType;
	const objId = req.params.id;
	const newObj = req.body;
	if (newObj._id && typeof newObj._id === 'string') newObj._id = new mongodb.ObjectID(newObj._id);

	cl(`Requested to UPDATE the ${objType} with id: ${objId}`);
	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.updateOne({ _id: new mongodb.ObjectID(objId) }, newObj,
			(err, result) => {
				if (err) {
					cl('Cannot Update', err)
					res.json(500, { error: 'Update failed' })
				} else {
					res.json(newObj);
				}
				db.close();
			});
	});
});
//====================================================================================
app.get('/logout', function (req, res) {
	req.session.reset();
	res.end('Loggedout');
});

// //====================================================================================
// app.get('/logout', function (req, res) {
// 	req.session.reset();
// 	res.end('Loggedout');
// });
//====================================================================================
function requireLogin(req, res, next) {
	if (!req.session.user) {
		cl('Login Required');
		res.json(403, { error: 'Please Login' })
	} else {
		next();
	}
};
//====================================================================================
app.get('/protected', requireLogin, function (req, res) {
	res.end('User is loggedin, return some data');
});

// Kickup our server 
// Note: app.listen will not work with cors and the socket
// app.listen(3003, function () {
http.listen(3003, function () {
	console.log(`misterREST server is ready at ${baseUrl}`);
	console.log(`GET (list): \t\t ${baseUrl}/{entity}`);
	console.log(`GET (single): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`DELETE: \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`PUT (update): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`POST (add): \t\t ${baseUrl}/{entity}`);

});


io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	socket.on('chat message', function (msg) {
		// console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

function getDocById(id) {
	db.bios.find({ _id: 5 })

}



cl('WebSocket is Ready');


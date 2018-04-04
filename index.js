const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Ask');
require('./models/Answer');
require('./models/ProfileQuestionDisplay');
require('./models/ProfileVoteDisplay');
require('./models/Conversation');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

// wiring middlewares
// middlewares = small functions that modify incoming requests to our
// app before requests are sent to route handlers
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
//require('./routes/billingRoutes')(app);
require('./routes/profileRoutes')(app);
require('./routes/trainAIRoutes')(app);
require('./routes/askRoutes')(app);
require('./routes/matchesRoutes')(app);
require('./routes/conversationsRoutes')(app);
require('./routes/legalRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets like our main.js or main.css file
	app.use(express.static('client/build'));

	// Express will serve up the index.html file if it doesn't recognize the route
	const path = require('path');
	app.get('*', (request, response) => {
		response.sendFile(
			path.resolve(__dirname, 'client', 'build', 'index.html')
		);
	});
}

// heroku dynamic port
const PORT = process.env.PORT || 5000;
server = app.listen(PORT, function() {
	console.log(
		'Express server listening on port %d in %s mode',
		this.address().port,
		app.settings.env
	);
});

var io = require('socket.io')(server);

let onlineUsers = {};

io.on('connection', function(socket) {
	console.log('a user connected with socket.id = ', socket.id);

	socket.on('TELL_SERVER_CLIENT_IS_ONLINE', function(data) {
		const key = data.mongoDBUserId;
		const value = data.socketId;
		onlineUsers[key] = value;

		// respond with which of the client's contacts can chat
		let contactsOnline = [];
		// socket
		// 	.to(data.socketId)
		// 	.emit('TELL_CLIENT_ONLINE_CONTACTS', contactsOnline);
		socket.emit('TELL_CLIENT_ONLINE_CONTACTS', contactsOnline);
	});

	socket.on('SEND_MESSAGE_FROM_CLIENT_TO_SERVER', function(data) {
		console.log('SEND_MESSAGE_FROM_CLIENT_TO_SERVER data = ', data);

		// TODO: socket.to(matchSocketId).emit('hey', 'I just met you');
	});
});

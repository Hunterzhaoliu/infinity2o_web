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
require('./models/ClientInConversation');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();
const server = require('http').createServer(app);

// heroku dynamic port
const PORT = process.env.PORT || 5000;
server.listen(PORT, function() {
	console.log(
		'Express server listening on port %d in %s mode',
		this.address().port,
		app.settings.env
	);
});

const io = require('socket.io')(server);

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
require('./routes/colorThemeRoutes')(app);
require('./routes/paymentRoutes')(app);
require('./routes/profileRoutes')(app);
require('./routes/voteEditRoutes')(app);
require('./routes/sortingHatRoutes')(app);
require('./routes/askRoutes')(app);
require('./routes/matchesRoutes')(app);
require('./routes/conversationsRoutes')(app);
require('./routes/legalRoutes')(app);

// connection to redis
const redis = require('redis').createClient(keys.redisURL);

// allows for the use of redis inside routes
app.set('redis', redis);

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

async function getRedisMongoDBUserId(serverSocketId) {
	await redis.get(serverSocketId, function(err, reply) {
		console.log('reply.toString() = ', reply.toString());
		return reply.toString();
	});
}

// console.log('Running serverSocket.io code...');
io.on('connection', function(serverSocket) {
	// allows for the use of serverSocket inside routes
	app.set('serverSocket', serverSocket);
	console.log('a user connected with serverSocket.id = ', serverSocket.id);

	// listens for messages to be sent
	serverSocket.on('TELL_SERVER:MESSAGE_TO_CLIENT_B_FROM_CLIENT_A', function(
		messageInfo
	) {
		console.log(
			'TELL_SERVER:MESSAGE_TO_CLIENT_B_FROM_CLIENT_A messageInfo = ',
			messageInfo
		);

		// sends private message to other client
		serverSocket
			.to(messageInfo.selectedContactSocketId)
			.emit('TELL_CLIENT_B:MESSAGE_FROM_CLIENT_A', messageInfo);
	});

	serverSocket.on('disconnect', async () => {
		console.log(
			'user disconnected with serverSocket.id = ',
			serverSocket.id
		);

		//const mongoDBUserId = await getRedisMongoDBUserId(serverSocket.id);
		//console.log('mongoDBUserId = ', mongoDBUserId);
	});
});

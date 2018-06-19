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
const io = require('socket.io')(server);

// heroku dynamic port
const PORT = process.env.PORT || 5000;
server.listen(PORT, function() {
	console.log(
		'Express server listening on port %d in %s mode',
		this.address().port,
		app.settings.env
	);
});

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

const ClientInConversationCollection = mongoose.model('clientsInConversation');

console.log('Running socket.io code...');
io.on('connection', function(socket) {
	app.set('socket', socket);
	console.log('a user connected with socket.id = ', socket.id);

	// listens for messages to be sent
	socket.on('TELL_SERVER:MESSAGE_TO_CLIENT_B_FROM_CLIENT_A', function(
		messageInfo
	) {
		console.log(
			'TELL_SERVER:MESSAGE_TO_CLIENT_B_FROM_CLIENT_A messageInfo = ',
			messageInfo
		);

		// sends private message to other client
		socket
			.to(messageInfo.selectedContactSocketId)
			.emit('TELL_CLIENT_B:MESSAGE_FROM_CLIENT_A', messageInfo);
	});

	socket.on('disconnect', async function() {
		// remove document from ClientInConversation collection
		console.log('user disconnected with socket.id = ', socket.id);
		try {
			await ClientInConversationCollection.deleteOne({
				socketId: socket.id
			});
		} catch (error) {
			console.log('delete client in conversation DB error = ', error);
		}
	});
});

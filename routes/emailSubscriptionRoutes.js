const mongoose = require("mongoose");
const UserCollection = mongoose.model("users");

module.exports = app => {
	app.get('/api/unsubscribe/:userId', async (request, response) => {
		const requestURLArray = request.path.split('/');
		// requestSegments =  [ '', 'api', 'unsubscribe', '5ad55047b4e23300148b0cd7' ]
		const userId = requestURLArray[3];
		const userInDB = await UserCollection.findOne({ '_id': userId })
    response.send({})
	});
};

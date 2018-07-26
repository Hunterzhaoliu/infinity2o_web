const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const UserCollection = mongoose.model("users");

module.exports = app => {
	app.post("/api/profile", requireLogin, async (request, response) => {
		const {
			newName,
			newEmail,
			newAge,
			newInterests,
			newLinkedInPublicProfileUrl,
			newGithubPublicProfileUrl,
			newTimeZone,
			newAvailability
		} = request.body;

		request.user.profile.name = newName;
		request.user.profile.email = newEmail;
		request.user.profile.age = newAge;
		request.user.profile.interests = newInterests;
		request.user.profile.linkedInPublicProfileUrl = newLinkedInPublicProfileUrl;
		request.user.profile.githubPublicProfileUrl = newGithubPublicProfileUrl;
		request.user.profile.timeZone = newTimeZone;
		request.user.profile.availability = newAvailability;

		const user = await request.user.save();
		response.send(user);
	});

	app.put(
		"/api/profile/decrease_neurons",
		requireLogin,
		async (request, response) => {
			const { decrementAmount, mongoDBUserId } = request.body;

			try {
				await UserCollection.findOneAndUpdate(
					{ _id: mongoDBUserId },
					{
						$inc: {
							"profile.payment.neuronsInBillions": -decrementAmount
						}
					}
				);
				response.send("done");
			} catch (error) {
				response.status(422).send(error);
			}
		}
	);

	app.put(
		"/api/profile/add_neurons",
		requireLogin,
		async (request, response) => {
			const { neuronsInBillions, mongoDBUserId } = request.body;

			try {
				await UserCollection.findOneAndUpdate(
					{ _id: mongoDBUserId },
					{
						$inc: {
							"profile.payment.neuronsInBillions": neuronsInBillions
						}
					}
				);
				response.send("done");
			} catch (error) {
				response.status(422).send(error);
			}
		}
	);

	app.put(
		"/api/profile/increment_unseen_messages",
		requireLogin,
		async (request, response) => {
			const { contactMongoDBUserId, conversationId } = request.body;
			try {
				// https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
				await UserCollection.findOneAndUpdate(
					{
						_id: contactMongoDBUserId,
						"conversations.userConversations.conversationId": conversationId
					},
					{
						$inc: {
							"conversations.userConversations.$.numberOfUnseenMessages": 1,
							"conversations.totalNumberOfUnseenMessages": 1
						}
					}
				);
				response.send("done");
			} catch (error) {
				response.status(422).send(error);
			}
		}
	);

	app.put(
		"/api/profile/seen_new_message",
		requireLogin,
		async (request, response) => {
			console.log("request.body = ", request.body);
			console.log(
				"request.user.auth.mongoDBUserId = ",
				request.user.auth.mongoDBUserId
			);
			try {
				// https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
				await UserCollection.findOneAndUpdate(
					{
						_id: request.user.auth.mongoDBUserId,
						"conversations.userConversations.matchId": request.body
					},
					{
						$inc: {
							"conversations.userConversations.$.numberOfUnseenMessages": -1,
							"conversations.totalNumberOfUnseenMessages": -1
						}
					}
				);
				response.send("done");
			} catch (error) {
				response.status(422).send(error);
			}
		}
	);
};

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
			console.log("contactMongoDBUserId = ", contactMongoDBUserId);
			console.log("conversationId = ", conversationId);

			try {
				await UserCollection.findOneAndUpdate(
					{ _id: contactMongoDBUserId },
					{
						$inc: {
							"conversations.userConversations.$[elem].numberOfUnseenMessages": 1
						},
						$inc: {
							"conversations.userConversations.totalNumberOfUnseenMessages": 1
						}
					},
					{ arrayFilters: [{ "elem.conversationId": conversationId }] }
				);
				response.send("done");
			} catch (error) {
				response.status(422).send(error);
			}
		}
	);
};

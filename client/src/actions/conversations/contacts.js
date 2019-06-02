import axios from "axios";
import {
  UPDATE_CONTACTS,
  UPDATE_CONTACTS_ERROR,
  UPDATE_CHAT,
  UPDATE_CHAT_ERROR,
  ON_SELECT_CONTACT,
  SAVE_USER_CONVERSATIONS_SUCCESS,
  SAVE_USER_CONVERSATIONS_ERROR,
  SEEN_MESSAGES,
  UPDATE_SELECTED_CONTACT_INFO,
  UPDATE_VOTE_COMPARISON,
  DELETE_CONVERSATION,
  TOGGLE_BELIEF_COMPARISON,
  RECOMMEND_COURSES
} from "../types";
import { allRecommendedCourses } from "../../utils/allRecommendedCourses";

const recommendCourses = (
  userInterests,
  userCompletedCourses,
  contactInterests,
  contactCompletedCourses,
  dispatch
) => {
  // find shared interests and for loop to find recommended courses
  let sharedInterests = userInterests.filter(userInterest =>
    contactInterests.includes(userInterest)
  );

  // user and contact don't share any interests, recommend computer science courses
  if (sharedInterests.length === 0) {
    sharedInterests = ["computer_science"];
  }

  // find the combined list of completed courses
  const combinedCompletedCourses = userCompletedCourses.concat(
    contactCompletedCourses
  );

  console.log("combinedCompletedCourses = ", combinedCompletedCourses);

  let recommendedCourses = [];
  sharedInterests.forEach(function(sharedInterest) {
    let courseIndex = 0;
    const recommendedCoursesForInterest = allRecommendedCourses[sharedInterest];
    while (
      recommendedCourses.length < 2 &&
      courseIndex < recommendedCoursesForInterest.length
    ) {
      // still need to recommend course
      const recommendedCourse = recommendedCoursesForInterest[courseIndex];
      const courseNameAndProvider = {
        courseProvider: recommendedCourse["provider"],
        courseName: recommendedCourse["name"]
      };
      console.log("courseNameAndProvider = ", courseNameAndProvider);
      if (combinedCompletedCourses.includes(courseNameAndProvider) === false) {
        // neither partner has taken the course, add course to recommended_courses
        recommendedCourses.push(recommendedCourse);
      }

      courseIndex += 1;
    }
  });

  dispatch({
    type: RECOMMEND_COURSES,
    recommendedCourses: recommendedCourses
  });
};

const voteComparison = (userVotes, contactVotes, dispatch) => {
  let userVoteDict = {};
  userVotes.forEach(userVote => {
    userVoteDict[userVote._askId] = {
      _answerId: userVote._answerId,
      question: userVote.question,
      selectedAnswer: userVote.selectedAnswer
    };
  });

  let agreedAsks = [];
  let disagreedAsks = [];
  contactVotes.forEach(contactVote => {
    if (userVoteDict[contactVote._askId] !== undefined) {
      // user and contact both answered this question
      if (
        userVoteDict[contactVote._askId]._answerId === contactVote._answerId
      ) {
        // user and contact answered the same answer
        agreedAsks.push({
          question: contactVote.question,
          userAndContactAnswer: contactVote.selectedAnswer
        });
      } else {
        // user and contact answered differently
        disagreedAsks.push({
          question: contactVote.question,
          contactAnswer: contactVote.selectedAnswer,
          userAnswer: userVoteDict[contactVote._askId].selectedAnswer
        });
      }
    }
  });
  dispatch({
    type: UPDATE_VOTE_COMPARISON,
    agreedAsks: agreedAsks,
    disagreedAsks: disagreedAsks
  });
};

const selectContact = async (
  userVotes,
  userCompletedCourses,
  userInterests,
  conversationId,
  contactIsOnline,
  contactSocketId,
  contactMongoDBId,
  numberOfUnseenMessages,
  dispatch
) => {
  dispatch({
    type: ON_SELECT_CONTACT,
    conversationId: conversationId,
    contactIsOnline: contactIsOnline,
    contactSocketId: contactSocketId,
    contactMongoDBId: contactMongoDBId
  });

  // get previous messages in DB
  const previousMessagesInDB = await axios.get(
    "/api/conversations?conversationId=" + conversationId
  );

  if (previousMessagesInDB.status === 200) {
    dispatch({
      type: UPDATE_CHAT,
      last50Messages: previousMessagesInDB.data.last50Messages
    });

    if (numberOfUnseenMessages >= 1) {
      dispatch({
        type: SEEN_MESSAGES,
        conversationId: conversationId,
        numberOfUnseenMessages: numberOfUnseenMessages
      });
      const seenMessagesInfo = {
        conversationId: conversationId,
        numberOfUnseenMessages: numberOfUnseenMessages
      };
      await axios.put("/api/profile/seen_messages", seenMessagesInfo);
    }
  } else {
    dispatch({ type: UPDATE_CHAT_ERROR });
  }

  const selectedContactInfo = await axios.get(
    "/api/matches/selected_contact_info?contactMongoDBId=" + contactMongoDBId
  );

  if (selectedContactInfo.status === 200) {
    // dispatch update selected contact info
    dispatch({
      type: UPDATE_SELECTED_CONTACT_INFO,
      selectedContactInfo: selectedContactInfo.data
    });

    voteComparison(userVotes, selectedContactInfo.data.asks.votes, dispatch);

    recommendCourses(
      userInterests,
      userCompletedCourses,
      selectedContactInfo.data.interests,
      selectedContactInfo.data.completedCourses,
      dispatch
    );
  }
};

export const onSelectContact = (
  userVotes,
  userCompletedCourses,
  userInterests,
  conversationId,
  contactIsOnline,
  contactSocketId,
  contactMongoDBId,
  numberOfUnseenMessages
) => async dispatch => {
  selectContact(
    userVotes,
    userCompletedCourses,
    userInterests,
    conversationId,
    contactIsOnline,
    contactSocketId,
    contactMongoDBId,
    numberOfUnseenMessages,
    dispatch
  );
};

export const fetchConversations = () => async dispatch => {
  // 1) hit /api/current_user to get allContacts
  const userResponse = await axios.get("/api/current_user");
  if (userResponse.status === 200) {
    const userConversations = userResponse.data.conversations.userConversations;
    // 2) update user conversations with newest contact clientSocket ids if in
    // production or staging
    let updatedUserConversationsResponse = userConversations;
    if (process.env.NODE_ENV === "production") {
      // in production or staging, need to search database to find which
      // clients are in redis for live chatting
      updatedUserConversationsResponse = await axios.put(
        "/api/conversations/online_contacts",
        userConversations
      );
    }
    if (
      updatedUserConversationsResponse.status === 200 ||
      updatedUserConversationsResponse.status === undefined
    ) {
      let updatedUserConversations = updatedUserConversationsResponse;
      if (process.env.NODE_ENV === "production") {
        // in production or staging, need to set the updatedUserConversations
        // equal to the new response.data
        updatedUserConversations = updatedUserConversationsResponse.data;
      }

      dispatch({
        type: UPDATE_CONTACTS,
        allContacts: updatedUserConversations
      });
      dispatch({ type: SAVE_USER_CONVERSATIONS_SUCCESS });

      const contactChatDisplayIndex = 0;
      // 3) display chat log of first conversation
      if (
        updatedUserConversations !== undefined &&
        updatedUserConversations.length >= 1
      ) {
        const conversationId =
          updatedUserConversations[contactChatDisplayIndex].conversationId;
        const contactIsOnline =
          updatedUserConversations[contactChatDisplayIndex].isOnline;
        const contactSocketId =
          updatedUserConversations[contactChatDisplayIndex].socketId;
        const contactMongoDBId =
          updatedUserConversations[contactChatDisplayIndex].matchId;
        const numberOfUnseenMessages =
          updatedUserConversations[contactChatDisplayIndex]
            .numberOfUnseenMessages;

        selectContact(
          userResponse.data.profile.asks.votes,
          userResponse.data.profile.minerva.completedCourses,
          userResponse.data.profile.interests,
          conversationId,
          contactIsOnline,
          contactSocketId,
          contactMongoDBId,
          numberOfUnseenMessages,
          dispatch
        );
      }
    } else {
      dispatch({ type: UPDATE_CONTACTS_ERROR });

      dispatch({ type: SAVE_USER_CONVERSATIONS_ERROR });
    }
  }
};

export const onCloseConversation = (
  conversationId,
  contactMongoDBId
) => async dispatch => {
  const deleteConversation = await axios.delete("/api/conversations/delete", {
    data: {
      conversationId: conversationId,
      contactMongoDBId: contactMongoDBId
    }
  });

  if (deleteConversation.status === 200) {
    dispatch({
      type: DELETE_CONVERSATION,
      conversationId: conversationId
    });
  }
};

export const toggleBeliefComparison = showContactCard => dispatch => {
  dispatch({
    type: TOGGLE_BELIEF_COMPARISON,
    showContactCard: showContactCard
  });
};

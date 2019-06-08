import axios from "axios";
import {
  ON_CHANGE_CURRENT_MESSAGE,
  DISPLAY_SENT_MESSAGE,
  MESSAGE_SENT_SUCCESS,
  MESSAGE_SENT_ERROR
} from "../types";
import { clientSocket } from "../auth";

export const onChangeCurrentMessage = newMessage => dispatch => {
  dispatch({
    type: ON_CHANGE_CURRENT_MESSAGE,
    newMessage: newMessage
  });
};

export const sendMessageToServer = (
  conversationId,
  selectedContactOnline,
  selectedContactSocketId,
  selectedContactMongoDBId,
  userId,
  currentMessage
) => async dispatch => {
  const timeCreated = new Date().toJSON();
  dispatch({
    type: DISPLAY_SENT_MESSAGE,
    senderId: userId,
    timeCreated: timeCreated
  });

  if (selectedContactOnline) {
    // use websockets for live chat
    clientSocket.emit("TELL_SERVER:MESSAGE_TO_CLIENT_B_FROM_CLIENT_A", {
      selectedContactSocketId: selectedContactSocketId,
      senderId: userId,
      message: currentMessage,
      timeCreated: timeCreated
    });
    // console.log(
    //   "TELL_SERVER:MESSAGE_TO_CLIENT_B_FROM_CLIENT_A currentMessage chat = ",
    //   currentMessage
    // );
  }
  // save sent message into database and update the numberOfUnseenMessages for
  // the contact

  const messageInfo = {
    conversationId: conversationId,
    senderId: userId,
    message: currentMessage,
    timeCreated: timeCreated
  };

  const incrementUnseenMessagesInfo = {
    contactMongoDBId: selectedContactMongoDBId,
    conversationId: conversationId
  };
  const sentChat = await axios.post("/api/conversations/chat", messageInfo);
  const incrementedNumberOfUnseenMessages = await axios.put(
    "/api/profile/increment_unseen_messages",
    incrementUnseenMessagesInfo
  );

  if (
    sentChat.status === 200 &&
    incrementedNumberOfUnseenMessages.status === 200
  ) {
    dispatch({
      type: MESSAGE_SENT_SUCCESS
    });
  } else {
    dispatch({ type: MESSAGE_SENT_ERROR });
  }
};

export const alreadyTakenCourse = (
  courseName,
  courseProvider
) => async dispatch => {
  const completedCourseInfo = {
    courseName: courseName,
    courseProvider: courseProvider
  };
  const completedCourseResponse = await axios.put(
    "/api/conversations/completed_course",
    completedCourseInfo
  );

  console.log(
    "completedCourseResponse.status = ",
    completedCourseResponse.status
  );
  // if (
  //   completedCourseResponse.status === 200
  // ) {
  //   dispatch({
  //     type: COMPLETED_COURSE,
  //     completedCourse: completedCourse
  //   });
  // }
};

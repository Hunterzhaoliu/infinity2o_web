import {
  ON_CHANGE_CURRENT_MESSAGE,
  UPDATE_CHAT,
  UPDATE_CHAT_ERROR,
  DISPLAY_SENT_MESSAGE,
  MESSAGE_SENT_SUCCESS,
  MESSAGE_SENT_ERROR,
  DISPLAY_RECEIVED_MESSAGE
} from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  last50Messages: [],
  currentMessage: null,
  hasUpdateChatError: false
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case ON_CHANGE_CURRENT_MESSAGE:
      newState.currentMessage = action.newMessage;
      return newState;
    case UPDATE_CHAT:
      newState.last50Messages = action.last50Messages;
      return newState;
    case UPDATE_CHAT_ERROR:
      newState.hasUpdateChatError = true;
      return newState;
    case DISPLAY_SENT_MESSAGE:
      newState.last50Messages.push({
        senderId: action.senderId,
        content: newState.currentMessage,
        timeCreated: action.timeCreated,
        status: "sent"
      });
      if (newState.last50Messages.length > 50) {
        newState.last50Messages.shift();
      }
      newState.currentMessage = null;
      return newState;
    case MESSAGE_SENT_SUCCESS:
      const lastMessageIndex1 = newState.last50Messages.length - 1;
      newState.last50Messages[lastMessageIndex1].status = "delivered";
      return newState;
    case MESSAGE_SENT_ERROR:
      const lastMessageIndex2 = newState.last50Messages.length - 1;
      newState.last50Messages[lastMessageIndex2].status = "failed-delivery";
      return newState;
    case DISPLAY_RECEIVED_MESSAGE:
      //console.log('action.messageInfo = ', action.messageInfo);
      const message = action.messageInfo.message;
      newState.last50Messages.push({
        senderId: action.messageInfo.senderId,
        content: message,
        timeCreated: action.messageInfo.timeCreated,
        status: "delivered"
      });
      if (newState.last50Messages.length > 50) {
        newState.last50Messages.shift();
      }
      return newState;
    default:
      return state;
  }
}

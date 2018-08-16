import axios from "axios";
import { USER_UNSUBSCRIBED } from "./types";

export const userUnsubscribed = userId => async dispatch => {
  const unsubscribeResponse = await axios.put("/api/unsubscribe", {
    userId: userId
  });
  if ((unsubscribeResponse.status = 200)) {
    dispatch({
      type: USER_UNSUBSCRIBED,
      name: unsubscribeResponse.data
    });
  }
};

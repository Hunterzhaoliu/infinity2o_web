import {
  SAVE_FETCHED_DAILY_MATCHES,
  UPDATE_INITIAL_MATCH,
  ON_NEXT_MATCH,
  DELETED_MATCH_IN_DB,
  DELETED_MATCH_IN_DB_ERROR,
  RUNNING_ATHENA_FOR_USER_START,
  RUNNING_ATHENA_FOR_USER_DONE,
  RUNNING_ATHENA_FOR_USER_ERROR,
  UPDATE_MATCHES_SEEN,
  DECREMENT_NUMBER_OF_UNSEEN_MATCHES,
  NEW_UNSEEN_MATCH
} from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  current1DisplayedMatches: [],
  nextMatches: [],
  hasDeleteMatcOverpassBError: false,
  runningAthenaForUser: false,
  hasErrorRunningAthenaForUser: false,
  numberOfUnseenMatches: 0,
  basicMatchInfo: null
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case SAVE_FETCHED_DAILY_MATCHES:
      newState.nextMatches = action.dailyMatches;
      return newState;
    case UPDATE_MATCHES_SEEN:
      newState.numberOfUnseenMatches = action.numberOfUnseenMatches;
      newState.basicMatchInfo = action.basicMatchInfo;
      return newState;
    case DECREMENT_NUMBER_OF_UNSEEN_MATCHES:
      newState.numberOfUnseenMatches -= 1;
      newState.basicMatchInfo[action.basicMatchInfoIndex]["seen"] = true;
      return newState;
    case NEW_UNSEEN_MATCH:
      newState.numberOfUnseenMatches += action.numberOfUnseenMatchesToAdd;
      return newState;
    case UPDATE_INITIAL_MATCH:
      // we move the first 4 in nextAsks -> current4DisplayedAsks
      for (let i = 0; i < 1; i++) {
        const currentMatch = newState.nextMatches.shift();
        if (currentMatch !== undefined) {
          if (currentMatch.name === undefined) {
            currentMatch.name = "Anonymous";
          }
          newState.current1DisplayedMatches.push(currentMatch);
        }
      }
      return newState;
    case ON_NEXT_MATCH:
      if (newState.nextMatches.length === 0) {
        newState.current1DisplayedMatches.shift();
      } else {
        const currentMatch = newState.nextMatches.shift();
        if (currentMatch.name === undefined) {
          currentMatch.name = "Anonymous";
        }
        newState.current1DisplayedMatches.shift();
        newState.current1DisplayedMatches.push(currentMatch);
      }
      return newState;
    case DELETED_MATCH_IN_DB:
      newState.hasDeleteMatcOverpassBError = false;
      return newState;
    case DELETED_MATCH_IN_DB_ERROR:
      newState.hasDeleteMatcOverpassBError = true;
      return newState;
    case RUNNING_ATHENA_FOR_USER_START:
      newState.runningAthenaForUser = true;
      newState.hasErrorRunningAthenaForUser = false;
      return newState;
    case RUNNING_ATHENA_FOR_USER_DONE:
      newState.runningAthenaForUser = false;
      newState.hasErrorRunningAthenaForUser = false;
      return newState;
    case RUNNING_ATHENA_FOR_USER_ERROR:
      newState.runningAthenaForUser = false;
      newState.hasErrorRunningAthenaForUser = true;
      return newState;
    default:
      return state;
  }
}

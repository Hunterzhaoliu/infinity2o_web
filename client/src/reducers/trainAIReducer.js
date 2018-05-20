import {
  SAVE_FETCHED_INITIAL_ASKS,
  SAVE_FETCHED_NEXT_ASKS,
  UPDATE_INITIAL_4_ASKS,
  ON_VOTE,
  UPDATE_VOTED_ASK,
  SAVE_VOTE_START,
  SAVE_VOTE_DONE,
  SAVE_VOTE_ERROR,
  ON_NEXT_ASK,
  ADD_NEW_ASK_TO_STATE,
  ON_NEWEST_ASKS,
  ON_POPULAR_ASKS,
  ON_CONTROVERSIAL_ASKS
} from "../actions/types";

import { store } from "../index";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  current4DisplayedAsks: [],
  nextAsks: [],
  votes: {},
  save: {},
  theme: {
    newestButtonColor: null,
    newestButtonTextColor: null,
    popularButtonColor: null,
    popularButtonTextColor: null,
    controversialButtonColor: null,
    controversialButtonTextColor: null
  },
  recentVotedAskIndex: null
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  const saveIndex = action.saveIndex;
  switch (action.type) {
    case ON_VOTE:
      let votedAsk = newState.current4DisplayedAsks[action.askIndex];
      let votedAskId = votedAsk._id;
      let votedAnswer = votedAsk.answers[action.answerIndex];
      newState.votes[votedAskId] = {
        question: votedAsk.question,
        answerId: votedAnswer._id,
        answer: votedAnswer.answer
      };

      // puts in the most recentVotedAskIndex to replace Ask on another vote
      newState.recentVotedAskIndex = action.askIndex;
      return newState;
    case UPDATE_VOTED_ASK:
      newState.current4DisplayedAsks[action.askIndex] = action.newAsk;
      return newState;
    case SAVE_VOTE_START:
      newState.save[saveIndex] = "save_start";
      return newState;
    case SAVE_VOTE_DONE:
      newState.save[saveIndex] = "save_done";
      return newState;
    case SAVE_VOTE_ERROR:
      newState.save[saveIndex] = "save_error";
      return newState;
    case ON_NEXT_ASK:
      if (newState.nextAsks.length > 0) {
        const replacementAsk = newState.nextAsks.shift();
        newState.current4DisplayedAsks[action.removeAskIndex] = replacementAsk;
      } else {
        // no new replacementAsk so just remove ask from display
        // splice removes one element from index action.removeAskIndex
        newState.current4DisplayedAsks.splice(action.removeAskIndex, 1);
      }

      return newState;
    case SAVE_FETCHED_NEXT_ASKS:
      newState.nextAsks = action.nextAsks.data;
      return newState;
    case SAVE_FETCHED_INITIAL_ASKS:
      newState.nextAsks = action.nextAsks.data;
      return newState;
    case UPDATE_INITIAL_4_ASKS:
      // we move the first 4 in nextAsks -> current4DisplayedAsks
      for (let i = 0; i < 4; i++) {
        const currentAsk = newState.nextAsks.shift();
        if (currentAsk !== undefined) {
          newState.current4DisplayedAsks.push(currentAsk);
        }
      }
      return newState;
    case ADD_NEW_ASK_TO_STATE:
      // adds the new user ask into the current4DisplayedAsks
      newState.current4DisplayedAsks.unshift(action.ask);

      // removes the fifth (old) ask and puts it into the nextAsks
      const replacedCurrent4DisplayedAsk = newState.current4DisplayedAsks.pop();
      newState.nextAsks.unshift(replacedCurrent4DisplayedAsk);
      return newState;
    case ON_NEWEST_ASKS:
      const currentTheme = store.getState().colorTheme;
      newState.theme.newestButtonColor = currentTheme.keyText6Color;
      newState.theme.newestButtonTextColor = currentTheme.text1Color;
      newState.theme.popularButtonColor = currentTheme.text8Color;
      newState.theme.popularButtonTextColor = currentTheme.text5Color;
      newState.theme.controversialButtonColor = currentTheme.text8Color;
      newState.theme.controversialButtonTextColor = currentTheme.text5Color;
      return newState;
    case ON_POPULAR_ASKS:
      const currentTheme2 = store.getState().colorTheme;
      newState.theme.newestButtonColor = currentTheme2.text8Color;
      newState.theme.newestButtonTextColor = currentTheme2.text5Color;
      newState.theme.popularButtonColor = currentTheme2.keyText6Color;
      newState.theme.popularButtonTextColor = currentTheme2.text1Color;
      newState.theme.controversialButtonColor = currentTheme2.text8Color;
      newState.theme.controversialButtonTextColor = currentTheme2.text5Color;
      return newState;
    case ON_CONTROVERSIAL_ASKS:
      const currentTheme3 = store.getState().colorTheme;
      newState.theme.newestButtonColor = currentTheme3.text8Color;
      newState.theme.newestButtonTextColor = currentTheme3.text5Color;
      newState.theme.popularButtonColor = currentTheme3.text8Color;
      newState.theme.popularButtonTextColor = currentTheme3.text5Color;
      newState.theme.controversialButtonColor = currentTheme3.keyText6Color;
      newState.theme.controversialButtonTextColor = currentTheme3.text1Color;
      return newState;
    default:
      return state;
  }
}

import { UPDATE_WINDOW_WIDTH, TOGGLE_SIDER } from "./types";

export const updateWindowWidth = newWindowWidth => dispatch => {
  dispatch({
    type: UPDATE_WINDOW_WIDTH,
    newWindowWidth: newWindowWidth
  });
};

export const toggleSider = () => dispatch => {
  dispatch({
    type: TOGGLE_SIDER
  });
};

import { createReducer } from '../utils/redux-utils';

export const initialState = {
  navExpanded: false,
  transparentNav: true,
};

export const actions = {
  SET_TRANSPARENT_NAV: 'SET_TRANSPARENT_NAV',
  TOGGLE_MENU: 'TOGGLE_MENU',
};

export const setTransparentNav = isTransparent => dispatch => {
  dispatch({
    type: actions.SET_TRANSPARENT_NAV,
    payload: isTransparent,
  });
};

export const toggleMenu = () => dispatch => {
  dispatch({
    type: actions.TOGGLE_MENU,
  });
};

export const appReducers = createReducer(initialState, {
  [actions.SET_TRANSPARENT_NAV]: (state, isTransparent) => {
    return {
      ...state,
      transparentNav: isTransparent,
    };
  },
  [actions.TOGGLE_MENU]: state => ({
    ...state,
    navExpanded: !state.navExpanded,
  }),
});

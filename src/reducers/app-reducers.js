import { createReducer } from '../utils/redux-utils';

export const initialState = {
  labelsLoading: true,
};

export const actions = {
  LABELS_LOADING: 'LABELS_LOADING',
  LABELS_LOADED: 'LABELS_LOADED',
  SET_TRANSPARENT_NAV: 'SET_TRANSPARENT_NAV',
};

export const setTransparentNav = isTransparent => {
  return dispatch => {
    dispatch({
      type: actions.SET_TRANSPARENT_NAV,
      payload: isTransparent,
    });
  };
};

export default createReducer(initialState, {
  [actions.LABELS_LOADING]: state => ({ ...state, labelsLoading: true }),
  [actions.LABELS_LOADED]: state => ({ ...state, labelsLoading: false }),
  [actions.SET_TRANSPARENT_NAV]: (state, isTransparent) => {
    console.log('hello');
    return {
      ...state,
      transparentNav: isTransparent,
    };
  },
});

import { createReducer } from '../utils/redux-utils';

export const initialState = {};

export const actions = {
  HOME_INIT: 'HOME_INIT',
};

export const homeReducers = createReducer(initialState, {
  [actions.SET_FEATURED_PROJECT]: (state, project) => ({
    ...state,
    featuredProject: project,
  }),
});

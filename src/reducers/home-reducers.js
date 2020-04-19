import { createReducer } from '../utils/redux-utils';

export const initialState = {};

export const actions = {
  HOME_INIT: 'HOME_INIT',
  SET_FEATURED_PROJECT: 'SET_FEATURED_PROJECT',
};

const projects = [
  {
    title: 'NOW TV',
    img: 'nowtv-home.png',
    description:
      'Working on a cross-platform native version of the NOW TV application, focused on Roku and AppleTV devices',
    technologies: ['React Native', 'Redux', 'Jest', 'Appium', 'Concourse'],
  },
];

export const setFeaturedProject = () => dispatch => {
  dispatch({
    type: actions.SET_FEATURED_PROJECT,
    payload: projects[0],
  });
};

export const homeReducers = createReducer(initialState, {
  [actions.SET_FEATURED_PROJECT]: (state, project) => ({
    ...state,
    featuredProject: project,
  }),
});

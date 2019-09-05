import { createReducer } from '../utils/redux-utils';

export const initialState = {
  labelsLoading: true,
  navExpanded: false,
  navLinks: {
    'app.nav.links.home': '/',
    'app.nav.links.projects': '/projects/',
    'app.nav.links.cv': '/cv/',
    'app.nav.links.blog': '/blog/',
    'app.nav.links.contact': '/contact-me/',
  },
  transparentNav: true,
};

export const actions = {
  LABELS_LOADING: 'LABELS_LOADING',
  LABELS_LOADED: 'LABELS_LOADED',
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
  [actions.LABELS_LOADING]: state => ({ ...state, labelsLoading: true }),
  [actions.LABELS_LOADED]: state => ({ ...state, labelsLoading: false }),
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

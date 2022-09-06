import { createSelector } from 'reselect';

export const appSelector = createSelector([state => state.app], app => {
  return {
    navExpanded: app.navExpanded,
    transparentNav: app.transparentNav,
  };
});

import { createSelector } from 'reselect';

export const appSelector = createSelector(
  [state => state.app],
  app => {
    return {
      labelsLoading: app.labelsLoading,
      navExpanded: app.navExpanded,
      navLinks: app.navLinks,
      transparentNav: app.transparentNav,
    };
  }
);

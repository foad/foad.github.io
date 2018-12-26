import { createSelector } from 'reselect';

export const appSelector = createSelector(
  [state => state.app],
  app => {
    return {
      labelsLoading: app.labelsLoading
    };
  }
);

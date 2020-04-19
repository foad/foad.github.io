import { createSelector } from 'reselect';

export const featuredProjectSelector = createSelector(
  [state => state.home],
  ({ featuredProject }) => ({ featuredProject })
);

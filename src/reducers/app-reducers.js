import { createReducer } from '../utils/redux-utils';

const initialState = {
  labelsLoading: true
};

export const actions = {
  LABELS_LOADING: 'LABELS_LOADING',
  LABELS_LOADED: 'LABELS_LOADED'
};

export default createReducer(initialState, {
  [actions.LABELS_LOADING]: state => ({ ...state, labelsLoading: true }),
  [actions.LABELS_LOADED]: state => ({ ...state, labelsLoading: false })
});

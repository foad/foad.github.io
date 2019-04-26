import appReducer, { actions, initialState } from './app-reducers';

describe('app-reducers', () => {
  it('should return the initial state on undefined', () => {
    const response = appReducer(undefined);
    expect(response).toEqual(initialState);
  });

  it('should handle the LABELS_LOADING action', () => {
    const response = appReducer({}, { type: actions.LABELS_LOADING });
    expect(response.labelsLoading).toBeTruthy();
  });

  it('should handle the LABELS_LOADED action', () => {
    const response = appReducer({}, { type: actions.LABELS_LOADED });
    expect(response.labelsLoading).toBeFalsy();
  });
});

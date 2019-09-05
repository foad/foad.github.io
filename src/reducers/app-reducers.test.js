import { appReducers, actions, initialState } from './app-reducers';

describe('app-reducers', () => {
  it('should return the initial state on undefined', () => {
    const response = appReducers(undefined);
    expect(response).toEqual(initialState);
  });

  it('should handle the LABELS_LOADING action', () => {
    const response = appReducers({}, { type: actions.LABELS_LOADING });
    expect(response.labelsLoading).toBe(true);
  });

  it('should handle the LABELS_LOADED action', () => {
    const response = appReducers({}, { type: actions.LABELS_LOADED });
    expect(response.labelsLoading).toBe(false);
  });

  it('should handle the SET_TRANSPARENT_NAV action', () => {
    const response = appReducers(
      { transparentNav: true },
      { type: actions.SET_TRANSPARENT_NAV, payload: false }
    );
    expect(response.transparentNav).toBe(false);
  });

  it('should handle the TOGGLE_MENU action', () => {
    const response = appReducers(
      { navExpanded: false },
      { type: actions.TOGGLE_MENU }
    );
    expect(response.navExpanded).toBe(true);
  });
});

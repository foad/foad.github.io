const initialState = {
  labelsLoading: true
};

export const appReducer = (state, action = {}) => {
  if (!state) return initialState;
  switch (action.type) {
    case 'LABELS_LOADED':
      return { ...state, labelsLoading: false };
    default:
      return state;
  }
};

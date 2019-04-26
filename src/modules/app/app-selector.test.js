import { selectorTests } from '../../utils/selector-utils';

import { appSelector } from './app-selector';

describe('app-selector', () => {
  const state = {
    app: {
      labelsLoading: false,
    },
  };

  const expected = {
    labelsLoading: false,
  };

  const newState = {
    app: {
      labelsLoading: true,
    },
  };

  selectorTests(appSelector, state, expected, newState);
});

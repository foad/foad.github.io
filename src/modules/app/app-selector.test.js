import { selectorTests } from '../../utils/selector-utils';

import { appSelector } from './app-selector';

describe('app-selector', () => {
  const state = {
    app: {
      labelsLoading: false,
      navExpanded: false,
      navLinks: {
        'app.nav.links.home': '/',
      },
      transparentNav: true,
    },
  };

  const expected = {
    labelsLoading: false,
    navExpanded: false,
    navLinks: {
      'app.nav.links.home': '/',
    },
    transparentNav: true,
  };

  const newState = {
    app: {
      labelsLoading: true,
      navExpanded: true,
      navLinks: {
        'app.nav.links.home': '/',
      },
      transparentNav: false,
    },
  };

  selectorTests(appSelector, state, expected, newState);
});

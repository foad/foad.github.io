import React from 'react';
import { shallow } from 'enzyme';

import { App as WrappedApp } from './app';

const App = WrappedApp.WrappedComponent;

jest.mock('react-router-dom');

describe('app-container', () => {
  let props;

  beforeEach(() => {
    props = {
      location: {
        pathname: '/',
        search: '',
        hash: '',
      },
      labelsLoading: false,
      navExpanded: false,
      navLinks: {
        'app.nav.links.home': '/',
      },
      initLabels: jest.fn(),
      setTransparentNav: jest.fn(),
    };
  });

  it('should initialise labels on mount', () => {
    shallow(<App {...props} />);
    expect(props.initLabels.mock.calls.length).toBe(1);
  });

  it('should set the nav back to non-transparent on page change', () => {
    const wrapper = shallow(<App {...props} transparentNav />);
    wrapper.setProps({ location: { ...props.location, pathname: '/test' } });

    expect(props.setTransparentNav).toBeCalledWith(false);
  });

  it('should render an empty div if labels still loading', () => {
    expect(shallow(<App {...props} labelsLoading />)).toMatchSnapshot();
  });

  it('should render the app once labels are ready', () => {
    expect(shallow(<App {...props} />)).toMatchSnapshot();
  });
});

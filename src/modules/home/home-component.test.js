import React from 'react';
import { shallow } from 'enzyme';

import { Home as WrappedHome } from './home-component';

const Home = WrappedHome.WrappedComponent;

describe('home-container', () => {
  let props;

  beforeEach(() => {
    props = {
      init: jest.fn(),
      setTransparentNav: jest.fn(),
    };
  });

  it('should match snapshot', () => {
    expect(shallow(<Home {...props} />)).toMatchSnapshot();
  });

  it('should call the home initialisation routine on mount', () => {
    shallow(<Home {...props} />);
    expect(props.init.mock.calls.length).toBe(1);
  });

  it('should set the nav to transparent on mount', () => {
    shallow(<Home {...props} />);
    expect(props.setTransparentNav.mock.calls.length).toBe(1);
  });
});

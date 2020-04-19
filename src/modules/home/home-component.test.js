import React from 'react';
import { shallow } from 'enzyme';

import { Home as WrappedHome } from './home-component';

const Home = WrappedHome.WrappedComponent;

describe('home-container', () => {
  let props;

  beforeEach(() => {
    props = {
      setFeaturedProject: jest.fn(),
      setTransparentNav: jest.fn(),
    };
  });

  it('should match snapshot', () => {
    expect(shallow(<Home {...props} />)).toMatchSnapshot();
  });

  it('should set the featured project on mount', () => {
    shallow(<Home {...props} />);
    expect(props.setFeaturedProject).toHaveBeenCalledTimes(1);
  });

  it('should set the nav to transparent on mount', () => {
    shallow(<Home {...props} />);
    expect(props.setTransparentNav).toHaveBeenCalledTimes(1);
  });
});

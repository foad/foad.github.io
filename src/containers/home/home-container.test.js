import React from 'react';
import { shallow } from 'enzyme';

import { HomeContainer } from './home-container';

describe('home-container', () => {
  const makeProps = extendProps => {
    return {
      init: jest.fn(),
      ...extendProps,
    };
  };

  let wrapper;
  let props;

  function renderContainer(extendProps) {
    props = makeProps(extendProps);
    wrapper = shallow(<HomeContainer {...props} />);
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    renderContainer();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the home initialisation routine on mount', () => {
    renderContainer();
    expect(props.init.mock.calls.length).toBe(1);
  });
});

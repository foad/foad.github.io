import React from 'react';
import { shallow } from 'enzyme';

import HomeHeader from './home-header';

jest.mock('../../services/label-service');

describe('home-header', () => {
  const makeProps = extendProps => {
    return {
      ...extendProps,
    };
  };

  let wrapper;
  let props;

  function renderContainer(extendProps) {
    props = makeProps(extendProps);
    wrapper = shallow(<HomeHeader {...props} />);
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    renderContainer();
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import { HomeHeader } from './home-header';

describe('home-header', () => {
  it('should match snapshot', () => {
    expect(shallow(<HomeHeader />)).toMatchSnapshot();
  });
});

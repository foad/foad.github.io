import React from 'react';
import { shallow } from 'enzyme';

import AppNav from './app-nav';

jest.mock('../../services/label-service');

describe('app-container', () => {
  const makeProps = extendProps => {
    return {
      transparentBackground: false,
      ...extendProps,
    };
  };

  let wrapper;
  let props;

  function renderContainer(extendProps) {
    props = makeProps(extendProps);
    wrapper = shallow(<AppNav {...props} />);
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    renderContainer();
    expect(wrapper).toMatchSnapshot();
  });

  describe('convertIndex', () => {
    it('should give numbers <9 a leading zero and increment', () => {
      renderContainer();
      const convertIndex = wrapper.instance().convertIndex;
      for (let i = 0; i < 9; i++) {
        expect(convertIndex(i)).toEqual(`0${i + 1}`);
      }
    });

    it("shouldn't give numbers >=9 a leading zero", () => {
      renderContainer();
      const convertIndex = wrapper.instance().convertIndex;
      for (let i = 9; i < 15; i++) {
        expect(convertIndex(i)).toEqual(i + 1);
      }
    });
  });
});

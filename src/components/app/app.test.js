import React from 'react';
import { shallow } from 'enzyme';

import { App } from './app';

jest.mock('react-router-dom');
jest.mock('../../containers/home/home-container', () => 'HomeContainer');

describe('app-container', () => {
  const makeProps = extendProps => {
    return {
      location: {
        pathname: '/',
        search: '',
        hash: '',
      },
      labelsLoading: false,
      initLabels: jest.fn(),
      setTransparentNav: jest.fn(),
      ...extendProps,
    };
  };

  let wrapper;
  let props;

  function renderContainer(extendProps) {
    props = makeProps(extendProps);
    wrapper = shallow(<App {...props} />);
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should initialise labels on mount', () => {
    renderContainer();
    expect(props.initLabels.mock.calls.length).toBe(1);
  });

  it('should set the nav back to non-transparent on page change', () => {
    renderContainer({ transparentNav: true });
    wrapper.setProps({ location: { ...props.location, pathname: '/test' } });

    expect(props.setTransparentNav).toBeCalledWith(false);
  });

  it('should render an empty div if labels still loading', () => {
    renderContainer({ labelsLoading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the app once labels are ready', () => {
    renderContainer();
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import { AppNav as WrappedAppNav } from './app-nav';

const AppNav = WrappedAppNav.WrappedComponent;

jest.mock('../../services/label-service');

describe('app-container', () => {
  let props;

  beforeEach(() => {
    props = {
      expanded: false,
      navLinks: {
        'app.nav.links.home': '/',
      },
      toggleMenu: jest.fn(),
      transparentBackground: false,
    };
  });

  it('should render correctly', () => {
    expect(shallow(<AppNav {...props} />)).toMatchSnapshot();
  });

  it('should render correctly when expanded', () => {
    expect(shallow(<AppNav {...props} expanded />)).toMatchSnapshot();
  });

  it('should render correctly with a transparent background', () => {
    expect(
      shallow(<AppNav {...props} transparentBackground />)
    ).toMatchSnapshot();
  });

  describe('convertIndex', () => {
    it('should give numbers <9 a leading zero and increment', () => {
      const wrapper = shallow(<AppNav {...props} />);
      expect(
        wrapper
          .find('.index')
          .first()
          .prop('children')
      ).toBe('01');
    });

    it("shouldn't give numbers >=9 a leading zero but still increment", () => {
      props.navLinks = {
        'app.nav.links.home1': '/',
        'app.nav.links.home2': '/',
        'app.nav.links.home3': '/',
        'app.nav.links.home4': '/',
        'app.nav.links.home5': '/',
        'app.nav.links.home6': '/',
        'app.nav.links.home7': '/',
        'app.nav.links.home8': '/',
        'app.nav.links.home9': '/',
        'app.nav.links.home10': '/',
        'app.nav.links.home11': '/',
      };
      const wrapper = shallow(<AppNav {...props} />);

      expect(
        wrapper
          .find('.index')
          .at(10)
          .prop('children')
      ).toBe(11);
    });
  });
});

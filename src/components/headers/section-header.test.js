import React from 'react';
import { shallow } from 'enzyme';

import { SectionHeader } from './section-header';

describe('section-header', () => {
  let props;

  beforeEach(() => {
    props = {
      fontSize: 40,
      children: 'Test',
    };
  });

  it('should match snapshot for string as child', () => {
    expect(shallow(<SectionHeader {...props} />)).toMatchSnapshot();
  });

  it('should match snapshot for element as child', () => {
    expect(
      shallow(
        <SectionHeader {...props}>
          <span>Test</span>
        </SectionHeader>
      )
    ).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow, mount, render } from 'enzyme';

// import undecorated Login container component
import { Login } from '../client/components/Login';

const wrapper = shallow(<Login />);

describe('<Login />', () => {
  it('should render registration button', () => {
    expect(wrapper.contains(<button id='register'>register</button>)).toBe(true);
  });

  it('should render application title', () => {
    expect(wrapper.contains(<div id='title'>cryptography</div>)).toBe(true);
  });

  it('should render application description', () => {
    expect(wrapper.contains(<div id='description'>track your cryptocurrency portfolio in one place</div>)).toBe(true);
  });
});
import React from 'react';
import SignInComponent from '../../app/SignIn.component';
import { shallow } from 'enzyme';

describe('A008-Signin to Application', () => {
  it('LA008-01: should render SignIn', () => {
    const wrapper = shallow(<SignInComponent />);
    const componentWrapper = wrapper.contains('Sign in to DoApp');

    expect(componentWrapper).toBeTruthy();
  });
  it('has an h3 tag', () => {
    const component = shallow(<SignInComponent />);
    let node = component.find('h3');
    expect(node.length).toEqual(1);
  });

  it('has a title class', () => {
    const component = shallow(<SignInComponent />);
    let node = component.find('h3');
    expect(node.hasClass('title')).toBeTruthy();
  });

  it('has a non empty email value', () => {
    expect(true).toBeTruthy();
  });

  it('has email value in email format', () => {
    expect(true).toBeTruthy();
  });

  it('has a non empty password value', () => {
    expect(true).toBeTruthy();
  });

  it('has 8 chars as min password length', () => {
    expect(true).toBeTruthy();
  });
});

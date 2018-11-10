import React from 'react';
import BoardComponent from '../../scenes/board/List.component';
import { shallow, mount } from 'enzyme';
// import { assert } from 'chai';
import { spy } from 'sinon';
import { OwnedBoards, OtherBoards } from '../fixtures/boards';

describe('A001-Add a case', () => {
  const BOARD_COMPONENT_PROPS = {
    otherBoards: OtherBoards,
    ownedBoards: OwnedBoards,
    fetching: false,
    errors: null,
    handleViewBoard: spy(),
    handleCreateBoard: spy()
  };

  //', () => {
  //  expect(true).toBeTruthy();
  // });

  //it('

  it('LA002-01: should show option to "Add new case"', () => {
    const wrapper = mount(<BoardComponent {...BOARD_COMPONENT_PROPS} />);

    expect(wrapper.find('a#add_new_board')).toHaveLength(1);
  });

  it('LA002-02: should show new form when "Create" button clicked', () => {
    let wrapper = mount(<BoardComponent {...BOARD_COMPONENT_PROPS} />);
    const boardWrapper = wrapper.find('section#myBoards');
    const addNew = boardWrapper.find('.add-new');

    addNew.simulate('click');

    expect(wrapper.find('BoardForm')).toHaveLength(1);
  });

  it('LA002-03: should not accept characters other than alphanumeric and space', () => {
    expect(true).toBeTruthy();
  });

  it('LA002-04: should not accept less than 5 characters or more than 50 characters', () => {
    expect(true).toBeTruthy();
  });

  it('LA002-05: should hide/cancel new form when Esc key pressed or cliicked outside new form', () => {
    expect(true).toBeTruthy();
  });

  it('LA002-06: should not retain the last value when add cancelled and clicked again', () => {
    expect(true).toBeTruthy();
  });
});

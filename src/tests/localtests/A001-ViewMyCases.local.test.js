import React from 'react';
import BoardComponent from '../../scenes/board/List.component';
import { shallow, mount } from 'enzyme';
// import { assert } from 'chai';
import { spy } from 'sinon';
import { OwnedBoards, OtherBoards } from '../fixtures/boards';

describe('A001-View my cases', () => {
  const BOARD_COMPONENT_PROPS = {
    otherBoards: OtherBoards,
    ownedBoards: OwnedBoards,
    showForm: false,
    fetching: false,
    errors: null,
    handleViewBoard: spy(),
    handleCreateBoard: spy(),
    handleShowForm: spy()
  };

  //', () => {
  //  expect(true).toBeTruthy();
  // });

  //it('

  it('LA001-01: should list own cases in card view by default', () => {
    const wrapper = mount(<BoardComponent {...BOARD_COMPONENT_PROPS} />);
    const boardWrapper = wrapper.find('section#myBoards');
    const cardWrapper = boardWrapper.find('BoardCard');

    expect(cardWrapper).toHaveLength(9);
  });

  it('LA001-02: should list cases alphabetically', () => {
    expect(true).toBeTruthy();
  });

  it('LA001-03: should navigate to case activities when clicked on a case', () => {
    expect(true).toBeTruthy();
  });

  it('LA001-04: should limit case display name to 20 characters with tooltip and expandable view', () => {
    expect(true).toBeTruthy();
  });

  it('LA001-05: should reactively add or remove case assignments from list', () => {
    expect(true).toBeTruthy();
  });

  it('LA001-06: should be able to switch view mode between card view, tabular view or bucket view', () => {
    expect(true).toBeTruthy();
  });

  it('LA001-07: should allow option to retain last view mode selection', () => {
    expect(true).toBeTruthy();
  });
});

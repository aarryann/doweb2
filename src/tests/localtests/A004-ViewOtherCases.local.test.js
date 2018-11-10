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

  it('LA004-01: should list followed cases', () => {
    const wrapper = mount(<BoardComponent {...BOARD_COMPONENT_PROPS} />);
    const boardWrapper = wrapper.find('section#myBoards');
    const cardWrapper = boardWrapper.find('BoardCard');

    expect(cardWrapper).toHaveLength(9);
  });

  it('LA004-02: should list cases alphabetically', () => {
    expect(true).toBeTruthy();
  });

  it('LA004-03: should redirect to "View my case details" when clicked on a case', () => {
    expect(true).toBeTruthy();
  });

  it('LA004-04: should limit case display name to 20 characters with tooltip and expandable view', () => {
    expect(true).toBeTruthy();
  });
});

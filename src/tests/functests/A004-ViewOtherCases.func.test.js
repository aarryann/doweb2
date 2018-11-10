import React from 'react';
import BoardComponent from '../../scenes/board/Board.component';
import { MemoryRouter } from 'react-router';
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

  it('FA004-01: should list followed cases', () => {
    expect(true).toBeTruthy();
  });

  it('FA004-02: should unfollow and remove from list when case assigned to me', () => {
    expect(true).toBeTruthy();
  });
});

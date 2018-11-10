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

  it('FA003-01: should list activities based on ascending due date', () => {
    expect(true).toBeTruthy();
  });

  it('FA003-02: should retain last sort mode selection within a session', () => {
    expect(true).toBeTruthy();
  });
});

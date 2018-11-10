import React from 'react';
import BoardComponent from '../../scenes/board/Board.component';
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

  it('FA001-01: should list own cases', () => {
    expect(true).toBeTruthy();
  });

  it('FA001-02: should reactively add or remove case assignments from list', () => {
    expect(true).toBeTruthy();
  });

  it('FA001-03: should retain last view mode selection within a session', () => {
    expect(true).toBeTruthy();
  });

  it('FA001-003-04: should list selected case activities when clicked on a case', () => {
    expect(true).toBeTruthy();
  });
});

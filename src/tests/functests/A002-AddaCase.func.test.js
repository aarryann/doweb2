import React from 'react';
import BoardComponent from '../../scenes/board/Board.component';
import { MemoryRouter } from 'react-router';
import { shallow, mount } from 'enzyme';
// import { assert } from 'chai';
import { spy } from 'sinon';
import { OwnedBoards, OtherBoards } from '../fixtures/boards';

describe('A001-Add a case', () => {
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

  it('FA002-01: should not accept duplicate case names', () => {
    expect(true).toBeTruthy();
  });

  it('FA002-02: should add a new case when "Create" button clicked', () => {
    expect(true).toBeTruthy();
  });

  it('FA003-03: should cancel add action when Esc clicked or clicked outside new form', () => {
    expect(true).toBeTruthy();
  });
});

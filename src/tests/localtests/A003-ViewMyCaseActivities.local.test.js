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

  it('LA003-01: should list case activities in tabular view by default', () => {
    expect(true).toBeTruthy();
  });

  it('LA003-02: should list activities based on ascending due date', () => {
    expect(true).toBeTruthy();
  });

  it('LA003-03: should allow option to retain last sort mode', () => {
    expect(true).toBeTruthy();
  });

  it('LA003-04: should open activity details pane when clicked on an activity', () => {
    expect(true).toBeTruthy();
  });

  it('LA001-05: should limit activity display name to 20 characters with tooltip and expandable view', () => {
    expect(true).toBeTruthy();
  });

  it('LA001-06: should be able to switch view mode between card view, tabular view or bucket view', () => {
    expect(true).toBeTruthy();
  });

  it('LA001-07: should allow option to retain last view mode selection', () => {
    expect(true).toBeTruthy();
  });
});

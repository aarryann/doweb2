import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import labels from '../../config/labels.en';
import { IBoard } from '../../pipes/boards/interfaces.board';
import BoardCard from './Card.component';
import BoardForm from './Form.component';

import './Board.component.css';

interface IListComponentProps {
  otherBoards: IBoard[];
  ownedBoards: IBoard[];
  fetching: boolean;
  errors: string;
  handleViewBoard(boardId: number): void;
  handleCreateBoard(data: IBoard): void;
}

export default function ListComponent(props: IListComponentProps) {
  const [showForm, setShowForm] = useState(false);
  const { fetching, ownedBoards } = props;
  useDocumentTitle(labels.boards.title);

  let content = null;

  const iconClasses = classnames({
    fa: true,
    'fa-user': !fetching,
    'fa-spinner': fetching,
    'fa-spin': fetching
  });

  if (!fetching) {
    content = (
      <div className="boards-wrapper">
        {renderBoards(ownedBoards)}
        {renderAddNewBoard()}
      </div>
    );
  }

  return (
    <div className="view-container boards index">
      <section id="myBoards">
        <header className="view-header">
          <h3>
            <i className={iconClasses} /> My lists
          </h3>
        </header>
        {content}
      </section>
    </div>
  );

  function renderBoards(boards: IBoard[]) {
    return boards.map((board: IBoard) => {
      return (
        <BoardCard
          key={board.id}
          handleViewBoard={props.handleViewBoard}
          {...board}
        />
      );
    });
  }

  function renderAddNewBoard() {
    const { errors } = props;

    if (!showForm) {
      return renderAddButton();
    }

    return (
      <BoardForm
        handleCreateBoard={props.handleCreateBoard}
        errors={errors}
        handleFormCancel={handleFormCancel}
      />
    );
  }

  function renderAddButton() {
    return (
      <div className="card board add-new" onClick={handleShowForm}>
        <div className="card-body inner">
          <a id="add_new_board">Add new board...</a>
        </div>
      </div>
    );
  }

  function handleShowForm() {
    setShowForm(true);
  }

  function handleFormCancel() {
    setShowForm(false);
  }
}

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  });
}

import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import labels from '../config/labels.en';
import BoardCard from './Card.component';
import BoardForm from './CardForm.component';

import './List.component.scss';

interface IListComponentProps {
  dataSource: any;
  fetching: boolean;
  title: string;
}

export default function ListComponent(props: IListComponentProps) {
  console.log(props);
  const [showForm, setShowForm] = useState(false);
  let { fetching, dataSource } = props;
  if (dataSource.currentUser)
    dataSource = dataSource.currentUser.user.ownedBoards;
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
        {renderBoards(dataSource)}
        {renderAddNewBoard()}
      </div>
    );
  }

  return (
    <div className="view-container boards index">
      <section id="myBoards">
        <header className="view-header">
          <h3>
            <i className={iconClasses} /> {props.title}
          </h3>
        </header>
        {content}
      </section>
    </div>
  );

  function renderBoards(boards: any[]) {
    return boards.map((board: any) => {
      return (
        <BoardCard
          key={board.id}
          handleViewBoard={handleViewBoard}
          {...board}
        />
      );
    });
  }

  function renderAddNewBoard() {
    // const { errors } = props;
    const errors = null;

    if (!showForm) {
      return renderAddButton();
    }

    return (
      <BoardForm
        handleCreateBoard={handleCreateBoard}
        errors={errors}
        handleFormCancel={handleFormCancel}
      />
    );
  }

  function handleViewBoard() {}

  function handleCreateBoard() {}

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

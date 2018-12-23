import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import labels from '../config/labels.en';
import BoardCard from './Card.component';
import BoardForm from './CardForm.component';

import './List.component.scss';

interface IListComponentProps {
  dataSource: any;
  title: string;
  addNew: boolean;
  dispatch(action: string, payload: any): void;
}

export default function ListComponent(props: IListComponentProps) {
  const [showForm, setShowForm] = useState(false);
  const { fetching, data } = props.dataSource;
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
        {renderBoards(data)}
        {renderAddNewBoard(props.addNew)}
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
      return <BoardCard key={board.id} dispatch={props.dispatch} {...board} />;
    });
  }

  function renderAddNewBoard(add: boolean) {
    if (!add) {
      return;
    }
    // const { errors } = props;
    const errors = null;

    if (!showForm) {
      return renderAddButton();
    }

    return (
      <BoardForm
        dispatch={props.dispatch}
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
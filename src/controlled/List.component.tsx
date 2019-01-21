import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import labels from '../config/labels.en';
import BoardCard from './Card.component';
import BoardForm from './CardForm.component';

import './List.component.scss';

interface IListComponentProps {
  addNew: boolean;
  boardCard: any;
  dataSource: any;
  title: string;
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
        {renderAddNewBoard(props.addNew)}
        {renderBoards(data)}
      </div>
    );
  }

  return (
    <div className="view-container boards index">
      <section id="myBoards">
        <header className="view-header text-accent">
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
          dispatch={props.dispatch}
          {...props.boardCard}
          {...board}
        />
      );
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
      <div className="card card-tile add-new" onClick={handleShowForm}>
        <div className="card-body inner">
          <button className="btn btn-circle btn-accent">
            <i className="fa fa-plus text-on-accent" />
          </button>
          <h4>
            <span className="label-caption">Add new ...</span>
          </h4>
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

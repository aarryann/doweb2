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
  detailPane: boolean;
  title: string;
  dispatch(action: string, payload: any): void;
}

export default function ListComponent(props: IListComponentProps) {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { fetching, data } = props.dataSource;
  useDocumentTitle(labels.boards.title);

  const iconClasses = classnames({
    fa: true,
    'fa-user': !fetching,
    'fa-spinner': fetching,
    'fa-spin': fetching
  });

  let content = null;
  if (!fetching) {
    content = (
      <div className="list-roll">
        {renderAddNewBoard(props.addNew)}
        {renderBoards(data)}
      </div>
    );
  }

  let details = null;
  if (props.detailPane) {
    details = (
      <section className="detail-section">
        <h4>Detail Section</h4>
      </section>
    );
  }

  return (
    <div className={`list-container ${showDetails ? 'show' : ''}`}>
      <section className="content-section">
        <header className="text-accent">
          <h3>
            <i className={iconClasses} /> {props.title}
          </h3>
        </header>
        {content}
      </section>
      {details}
    </div>
  );

  function renderBoards(boards: any[]) {
    return boards.map((board: any) => {
      return (
        <BoardCard
          key={board.id}
          dispatch={props.dispatch}
          details={handleDetailsPane}
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

  function handleDetailsPane() {
    if (props.detailPane) {
      setShowDetails(show => !show);
    }
  }
}

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  });
}

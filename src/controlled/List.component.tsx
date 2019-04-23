// tslint:disable
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import labels from '../config/labels.en';
import Card from './Card.component';
import CardForm from './CardForm.component';
import { CardConstants } from '../config/constants';

import './List.component.scss';

interface IListComponentProps {
  add: boolean;
  cardData: string;
  cardAltAction: string; // how to show detail: drilldownUrl, showPaneData, showPaneCall, showInlineData or showInlineCall
  cardAltData: string; // for drilldown: component url
  cardContent: string;
  dataSource: any;
  match: any;
  title: string;
  dispatch(action: string, payload: any): void;
}

export default function ListComponent(props: IListComponentProps) {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const { hide, fetching, data } = props.dataSource;
  useDocumentTitle(labels.boards.title);

  const iconClasses = classnames({
    fa: true,
    'fa-user': !fetching,
    'fa-spinner': fetching,
    'fa-spin': fetching
  });

  if (hide) {
    return null;
  }
  let content = null;
  if (!fetching) {
    content = (
      <div className="list-roll">
        {renderAddNewBoard(props.add)}
        {renderBoards(data)}
      </div>
    );
  }

  let details = null;
  if (
    props.cardAltAction === CardConstants.SHOW_PANE_DATA ||
    props.cardAltAction === CardConstants.SHOW_PANE_CALL
  ) {
    details = (
      <section className={`detail-section`}>
        <h4>Detail Section : {selectedCard}</h4>
      </section>
    );
  }

  return (
    <div
      className={`content-body list-container animated ${
        showDetails ? 'show' : 'hide'
      }`}
    >
      <section className="content-section">
        <header className="text-accent p-2">
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
    console.log(props);
    return boards.map((board: any) => {
      return (
        <Card
          key={board.id}
          dispatch={props.dispatch}
          details={handleDetailsPane}
          match={props.match}
          altData={props.cardAltData}
          altContent={props.cardContent}
          data={props.cardData}
          altAction={props.cardAltAction}
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
      <CardForm
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

  function handleDetailsPane(cardId: string) {
    if (
      props.cardAltAction === CardConstants.SHOW_PANE_DATA ||
      props.cardAltAction === CardConstants.SHOW_PANE_CALL
    ) {
      if (selectedCard === cardId) {
        setShowDetails(false);
        setSelectedCard('');
      } else {
        setSelectedCard(cardId);
        setShowDetails(true);
      }
    }
  }
}

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  });
}

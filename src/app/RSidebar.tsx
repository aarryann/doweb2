import React from 'react';
import { Link } from 'react-router-dom';

import labels from '../config/labels.en';
import { routePaths } from '../config/paths';

import './RSidebar.scss';

interface IRSidebarProps {
  showForm: boolean;
  showSidebar(): void;
}

export default function RSidebar(props: IRSidebarProps) {
  return (
    <div
      className={`right-sidebar animated ${props.showForm ? 'show' : ''}`}
      id="right_side_bar"
    >
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Notifications
              </button>
              <a
                href="javascript:;"
                onClick={props.showSidebar}
                className="right_side_toggle float-right pt-1 close-sidebar-icon"
              >
                <i className="fa fa-arrow-right" />
              </a>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="pl-3 pr-3">
              <div>
                <a className="nav-link border-bottom px-0 py-3" href="#">
                  <span className="text-primary">
                    <span className="weight700 f12">
                      <i className="vl_bell weight600 pr-2" />
                      Weekly Update
                    </span>
                  </span>
                  <span className="small float-right text-muted">03:14 AM</span>

                  <div className="text-dark f12">
                    This week project update report generated. All team members
                    are requested to check the updates
                  </div>
                </a>

                <a className="nav-link border-bottom px-0 py-3" href="#">
                  <span className="text-danger">
                    <span className="weight700 f12">
                      <i className="vl_Download-circle weight600 pr-2" />
                      Server Error
                    </span>
                  </span>
                  <span className="small float-right text-muted">10:34 AM</span>

                  <div className="text-dark f12">
                    Unexpectedly server response stop. Responsible members are
                    requested to fix it soon
                  </div>
                </a>

                <a className="nav-link border-bottom px-0 py-3" href="#">
                  <span className="text-success">
                    <span className="weight700 f12">
                      <i className="vl_screen weight600 pr-2" />
                      Monthly Meeting
                    </span>
                  </span>
                  <span className="small float-right text-muted">12:30 AM</span>

                  <div className="text-dark f12">
                    Our monthly meeting will be held on tomorrow sharp 12:30.
                    All members are requested to attend this meeting.
                  </div>
                </a>

                <div className="text-center mt-3">
                  <a className="nav-link px-0" href="#">
                    View all notification
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingThree">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Today's Activity
              </button>
            </h5>
          </div>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div className="p-3">
              <ul className="list-unstyled base-timeline">
                <li className="time-dot-primary">
                  <div className="base-timeline-info">
                    <a href="#">John123</a> Successfully purchased item#26
                  </div>
                  <small className="text-muted">28 mins ago</small>
                </li>
                <li className="time-dot-danger">
                  <div className="base-timeline-info">
                    <a href="#" className="text-danger">
                      Farnandez
                    </a>{' '}
                    placed the order for accessories
                  </div>
                  <small className="text-muted">2 days ago</small>
                </li>
                <li className="time-dot-purple">
                  <div className="base-timeline-info">
                    User{' '}
                    <a href="#" className="text-purple">
                      Lisa Maria
                    </a>{' '}
                    checked out from the market
                  </div>
                  <small className="text-muted">12 mins ago</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Tasks
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div className="card border-0">
              <div className="card-body pt-2">
                <div className="right-widget">
                  <ul className="list-unstyled mb-0 list-widget">
                    <li className="cursor">
                      <div className="media mb-4">
                        <div className="st-alphabet mr-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatar/avatar1.jpg"
                            alt=" "
                          />
                          <span className="status bg-success" />
                        </div>
                        <div className="media-body ">
                          <div className="float-left">
                            <h6 className="text-uppercase mb-0">shirley hoe</h6>
                            <span className="text-muted">Online</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="cursor">
                      <div className="media mb-4">
                        <div className="st-alphabet mr-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatar/avatar2.jpg"
                            alt=" "
                          />
                          <span className="status bg-warning" />
                        </div>
                        <div className="media-body ">
                          <div className="float-left">
                            <h6 className="text-uppercase mb-0">
                              james alexender
                            </h6>
                            <span className="text-muted">Screaming...</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="cursor">
                      <div className="media mb-4">
                        <div className="st-alphabet mr-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatar/avatar3.jpg"
                            alt=" "
                          />
                          <span className="status bg-info" />
                        </div>
                        <div className="media-body">
                          <div className="float-left">
                            <h6 className="text-uppercase mb-0">
                              ursula sitorus
                            </h6>
                            <span className="text-muted">Start Exploring</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="cursor">
                      <div className="media mb-3">
                        <div className="st-alphabet mr-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatar/avatar4.jpg"
                            alt=" "
                          />
                          <span className="status bg-danger" />
                        </div>
                        <div className="media-body">
                          <div className="float-left">
                            <h6 className="text-uppercase mb-0">
                              jonna pinedda
                            </h6>
                            <span className="text-muted">Busy</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingFour">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Active Users
              </button>
            </h5>
          </div>
          <div
            id="collapseFour"
            className="collapse"
            aria-labelledby="headingFour"
            data-parent="#accordionExample"
          >
            <div className="card border-0">
              <div className="card-body pt-2">
                <div className="right-widget">
                  <ul className="list-unstyled mb-0 list-widget">
                    <li className="cursor">
                      <div className="media mb-4">
                        <div className="st-alphabet mr-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatar/avatar1.jpg"
                            alt=" "
                          />
                          <span className="status bg-success" />
                        </div>
                        <div className="media-body ">
                          <div className="float-left">
                            <h6 className="text-uppercase mb-0">shirley hoe</h6>
                            <span className="text-muted">Online</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="cursor">
                      <div className="media mb-4">
                        <div className="st-alphabet mr-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatar/avatar2.jpg"
                            alt=" "
                          />
                          <span className="status bg-warning" />
                        </div>
                        <div className="media-body ">
                          <div className="float-left">
                            <h6 className="text-uppercase mb-0">
                              james alexender
                            </h6>
                            <span className="text-muted">Screaming...</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="cursor">
                      <div className="media mb-4">
                        <div className="st-alphabet mr-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatar/avatar3.jpg"
                            alt=" "
                          />
                          <span className="status bg-info" />
                        </div>
                        <div className="media-body">
                          <div className="float-left">
                            <h6 className="text-uppercase mb-0">
                              ursula sitorus
                            </h6>
                            <span className="text-muted">Start Exploring</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="cursor">
                      <div className="media mb-3">
                        <div className="st-alphabet mr-3">
                          <img
                            className="rounded-circle"
                            src="assets/img/avatar/avatar4.jpg"
                            alt=" "
                          />
                          <span className="status bg-danger" />
                        </div>
                        <div className="media-body">
                          <div className="float-left">
                            <h6 className="text-uppercase mb-0">
                              jonna pinedda
                            </h6>
                            <span className="text-muted">Busy</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

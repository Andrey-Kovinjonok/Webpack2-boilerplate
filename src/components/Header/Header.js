import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, withProps, withHandlers } from 'recompose';
import {
  Button,
  Popover,
  Position,
  Classes,
  PopoverInteractionKind,
} from '@blueprintjs/core';

import { Label } from '../Styled';

import { storageAct } from '../../store/index';

import Messages from '../Messages/Messages';
import theme from './styles.styl';

const Header = ({ isShowingPopup, content, unreadedMessagesCount, handleShowMessages }) => (
  <nav className="pt-navbar pt-dark">
    <div className={theme.header}>
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">
          TEST MESSAGES TASK
        </div>
      </div>

      <div className="pt-navbar-group pt-align-right">
        <span className="pt-navbar-divider" />

        <Popover
          content={content}
          interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
          isOpen={isShowingPopup}
          popoverClassName="pt-popover-content-sizing"
          position={Position.BOTTOM_RIGHT}
        >
          <div>
            <Button
              className={classNames(Classes.BUTTON, Classes.MINIMAL, 'pt-icon-notifications')}
              onClick={handleShowMessages}
            />

            {(unreadedMessagesCount > 0) &&
            <Label>
              {unreadedMessagesCount}
            </Label>}
          </div>
          {/* <button className="pt-button pt-intent-primary">Popover target</button> */}
        </Popover>

        <span className="pt-navbar-divider" />
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  handleShowMessages: React.PropTypes.func.isRequired,
  isShowingPopup: React.PropTypes.bool.isRequired,
  content: React.PropTypes.element.isRequired,
  unreadedMessagesCount: React.PropTypes.number.isRequired,
};

export default compose(
  connect(
    state => ({
      isShowingPopup: state.popupReducer.isShowingPopup || false,
      messages: storageAct.getData(state, ['data', 'messages']) || [],
    }),
    dispatch => ({
      ...bindActionCreators(storageAct, dispatch),
    }),
  ),

  withProps(props => ({
    ...props,
    unreadedMessagesCount: props.messages.filter(message => message.unread).length,
    content: (
      <div>
        <Messages />

        <a
          tabIndex={0}
          onClick={async (event) => {
            event.preventDefault();
            event.stopPropagation();

            await props.readMessagesAndOrChangePopupStatus({
              isShowingPopup: false,
              ...props.isShowingPopup && { numberReaded: 5 },
            });
          }}
        >
          show all...
        </a>
      </div>
    ),
  })),

  withHandlers({
    handleShowMessages: props => async () => {
      await props.readMessagesAndOrChangePopupStatus({
        isShowingPopup: true,
      });
    },
  }),
)(Header);

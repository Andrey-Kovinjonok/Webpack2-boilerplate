import take from 'lodash/take';
import React from 'react';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';

import Message from './Message';
import { storageAct } from '../../store/index';

const Messages = ({ items }) => (
  <div>
    {items}
  </div>
);

Messages.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default compose(
  connect(
    state => ({
      messages: storageAct.getData(state, ['data', 'messages']) || [],
    }),
  ),

  withProps(({ messages }) => {
    const unreadedMessages = messages
      .filter(message => message.unread);

    const items = take(unreadedMessages, 5).map(({ title, datetime, id }) => (
      <Message key={id} datetime={new Date(datetime)} title={title} />
    ));

    return { items };
  }),

)(Messages);

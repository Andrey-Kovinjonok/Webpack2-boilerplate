import React from 'react';
import { compose, withProps } from 'recompose';
import moment from 'moment';

moment.locale('en');

const Message = ({ title, datetime }) => (
  <div>
    <h4> {title} </h4>
    <p> {datetime} </p>
    <br />
  </div>
);

Message.propTypes = {
  title: React.PropTypes.string.isRequired,
  datetime: React.PropTypes.string.isRequired,
};

export default compose(
  withProps(({ title, datetime }) => {
    const today = moment();
    const eventDateM = moment(datetime, 'DD.MM.YYYY');
    const todayOffset = eventDateM.from(today);

    return {
      title,
      datetime: todayOffset,
    };
  }),
)(Message);


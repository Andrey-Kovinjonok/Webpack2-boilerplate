import React from 'react';
// import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { Observable } from 'rxjs';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { Button } from '@blueprintjs/core';


import { Pane } from '../Styled';
import { storageAct } from '../../store/index';
import theme from './styles.styl';

function randomString(length, chars) {
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

const getRandomString = () => (randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));

class Home extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    subscribeToMessages: React.PropTypes.func.isRequired,
    handleChangeTitle: React.PropTypes.func.isRequired,
    handleAddTitle: React.PropTypes.func.isRequired,
    handleReadAll: React.PropTypes.func.isRequired,
    handleRemoveAll: React.PropTypes.func.isRequired,
    handleSwichPopupVisibility: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.title = '';
  }

  componentDidMount() {
    this.disposeMessages = this.props.subscribeToMessages();
  }

  componentWillUnmount() {
    this.disposeMessages.unsubscribe();
  }

  disposeMessages = undefined;

  render() {
    const {
      handleChangeTitle,
      handleAddTitle,
      handleReadAll,
      handleRemoveAll,
      handleSwichPopupVisibility,
      title,
    } = this.props;

    return (
      <div className={theme.home}>
        <Pane>
          <div className="pt-input-group .modifier">
            <input
              className="pt-input"
              type="text"
              placeholder="Title"
              onChange={handleChangeTitle}
              value={title}
            />
            <Button onClick={handleAddTitle} >
              Add Message
            </Button>
          </div>
        </Pane>

        <Pane>
          <Button className="pt-fill" onClick={handleReadAll} >
            Read All Messages
          </Button>
        </Pane>

        <Pane>
          <Button className="pt-fill" onClick={handleRemoveAll} >
            Remove All Messages
          </Button>
        </Pane>

        <Pane>
          <Button className="pt-fill" onClick={handleSwichPopupVisibility} >
            Show/Hide popup
          </Button>
        </Pane>

      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      messages: storageAct.getData(state, ['data', 'messages']) || [],
      isShowingPopup: state.popupReducer.isShowingPopup || false,
    }),
    dispatch => ({
      ...bindActionCreators(storageAct, dispatch),
    }),
    (stateProps, dispatchProps, parentProps) => ({
      ...parentProps,
      ...dispatchProps,
      ...stateProps,
    }),
  ),

  withState('title', 'setTitle', ''),

  withHandlers({
    subscribeToMessages: props => () => (
      Observable.interval(20 * 1000)
      .map(() => getRandomString())
      .subscribe(
        async (data) => {
          await props.addMessage(data);
        },
        error => console.log(error),
        () => console.log('messages stream completed'),
      )
    ),

    handleChangeTitle: props => (event) => {
      props.setTitle(event.target.value);
      // console.log('SET TITLE', event.target.value);
    },

    handleAddTitle: props => async () => {
      await props.addMessage(props.title);
      props.setTitle('');
    },

    handleReadAll: props => async () => {
      await props.readMessagesAndOrChangePopupStatus({
        numberReaded: -1,
      });
    },

    handleRemoveAll: props => async () => {
      await props.storeData({
        treePath: ['data', 'messages'],
        value: [],
      });
    },

    handleSwichPopupVisibility: props => async () => {
      await props.readMessagesAndOrChangePopupStatus({
        isShowingPopup: !props.isShowingPopup,
        ...props.isShowingPopup && { numberReaded: 5 },
      });
    },
  }),
)(Home);

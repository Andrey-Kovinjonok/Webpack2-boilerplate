import { getField } from '../utils/otm';

export function initData(data) {
  return {
    data,
    type: 'INIT_DATA',
  };
}

export function storeData(data) {
  return {
    ...data,
    type: 'CHANGE_DATA',
  };
}

export function getData(state, path) {
  return getField(state.storageReducer, [...path]);
}

export function addMessage(messageText) {
  return {
    value: messageText,
    type: 'ADD_MESSAGE',
  };
}

export function readMessagesAndOrChangePopupStatus(params) {
  return {
    value: params,
    type: 'READ_MESSAGES_AND_OR_CHANGE_POPUP_STATE',
  };
}

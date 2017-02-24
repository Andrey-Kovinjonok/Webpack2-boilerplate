import { storageAct } from './../store';
import storageReducers from './../store/storageReducers';
import popupReducers from './../store/popupReducers';

test('INIT storage', () => {
  const testInitActionStorage =
    storageAct.initData({
      treePath: ['data', 'someFlag'],
      value: true,
    });
  expect(testInitActionStorage).toMatchSnapshot();

  const testInitReducer1 = storageReducers({}, {
    type: 'INIT_DATA',
    data: undefined,
  });
  expect(testInitReducer1).toMatchSnapshot();
  expect(testInitReducer1)
  .toEqual({
    data: {
      messages: [],
    },
  });

  const testInitReducer2 = storageReducers({}, {
    type: 'INIT_DATA',
    data: {},
  });
  expect(testInitReducer2).toMatchSnapshot();
  expect(testInitReducer2)
  .toEqual({
    data: {
      messages: [],
    },
  });

  const testInitReducer3 = storageReducers({}, {
    type: 'INIT_DATA',
    data: { messages: [{ id: 0, text: 'test' }] },
  });
  expect(testInitReducer3)
  .toEqual({
    data: {
      messages: [{ id: 0, text: 'test' }],
    },
  });
  expect(testInitReducer3).toMatchSnapshot();
});

test('CHANGE_DATA storage', () => {
  /*
  const initedStore = storageReducers({}, {
    type: 'INIT_DATA',
    data: undefined,
  });*/
  const changeDataResult = storageReducers({}, {
    type: 'CHANGE_DATA',
    treePath: ['data', 'messages'],
    value: [],
  });

  expect(changeDataResult.data).not.toBeNull();
  expect(changeDataResult.data).not.toBeUndefined();
  expect(changeDataResult.data.messages).not.toBeUndefined();
  expect(changeDataResult.data.messages.length).toBe(0);
});

test('ADD_MESSAGE', () => {
  const addMessageActionTest = storageAct.addMessage('SOME TEXT MESSAGE');
  expect(addMessageActionTest).toMatchSnapshot();

  const initedStore = storageReducers({}, {
    type: 'INIT_DATA',
    data: undefined,
  });
  const addFirstMessageResult = storageReducers(initedStore, {
    type: 'ADD_MESSAGE',
    value: 'SOME TEXT MESSAGE',
  });

  expect(addFirstMessageResult.data).not.toBeNull();
  expect(addFirstMessageResult.data).not.toBeUndefined();
  expect(addFirstMessageResult.data.messages).not.toBeUndefined();
  expect(addFirstMessageResult.data.messages.length).toBe(1);
  expect(addFirstMessageResult.data.messages[0]).not.toBeUndefined();
  expect(addFirstMessageResult.data.messages[0].id).toBe(0);
});

test('READ_MESSAGES_AND_OR_CHANGE_POPUP_STATE storage', () => {
  const initedStore = storageReducers({}, {
    type: 'INIT_DATA',
    data: undefined,
  });
  const addFirstMessageResult = storageReducers(initedStore, {
    type: 'ADD_MESSAGE',
    value: 'SOME TEXT MESSAGE',
  });

  const undefinedParams = storageAct.readMessagesAndOrChangePopupStatus(undefined);
  expect(undefinedParams).toMatchSnapshot();

  const definedParams = storageAct.readMessagesAndOrChangePopupStatus({ numberReaded: 5 });
  expect(definedParams).toMatchSnapshot();


  const readOrPopupResult1 = storageReducers(addFirstMessageResult, {
    type: 'READ_MESSAGES_AND_OR_CHANGE_POPUP_STATE',
    value: undefined,
  });
  expect(readOrPopupResult1.data.messages[0].unread).toEqual(true);

  const readOrPopupResult2 = storageReducers(addFirstMessageResult, {
    type: 'READ_MESSAGES_AND_OR_CHANGE_POPUP_STATE',
    value: { numberReaded: 5 },
  });
  expect(readOrPopupResult2.data.messages[0].unread).toEqual(false);
});

test('INIT popup', () => {
  const testInitActionPopup =
    storageAct.initData({
      data: { isShowingPopup: true },
    });
  expect(testInitActionPopup).toMatchSnapshot();

  const testInitReducer1 = popupReducers({}, {
    type: 'INIT_DATA',
    data: undefined,
  });
  expect(testInitReducer1)
  .toEqual({
    isShowingPopup: false,
  });
  expect(testInitReducer1).toMatchSnapshot();

  const testInitReducer2 = popupReducers({}, {
    type: 'INIT_DATA',
    data: { isShowingPopup: true },
  });
  expect(testInitReducer2)
  .toEqual({
    isShowingPopup: true,
  });
  expect(testInitReducer2).toMatchSnapshot();
});

test('CHANGE_DATA popup', () => {
  const changeDataResult1 = storageReducers({}, {
    type: 'CHANGE_DATA',
    treePath: ['isShowingPopup'],
    value: true,
  });

  expect(changeDataResult1).not.toBeNull();
  expect(changeDataResult1).not.toBeUndefined();
  expect(changeDataResult1.isShowingPopup).not.toBeUndefined();
  expect(changeDataResult1.isShowingPopup).toBe(true);
});

test('READ_MESSAGES_AND_OR_CHANGE_POPUP_STATE popup', () => {
  const initedStore = storageReducers({}, {
    type: 'INIT_DATA',
    data: undefined,
  });

  const undefinedParams = storageAct.readMessagesAndOrChangePopupStatus(undefined);
  expect(undefinedParams).toMatchSnapshot();

  const definedParams = storageAct.readMessagesAndOrChangePopupStatus({ isShowingPopup: true });
  expect(definedParams).toMatchSnapshot();


  const readOrPopupResult1 = popupReducers(initedStore, {
    type: 'READ_MESSAGES_AND_OR_CHANGE_POPUP_STATE',
    value: undefined,
  });
  expect(readOrPopupResult1.isShowingPopup).toEqual(undefined);

  const readOrPopupResult2 = popupReducers(initedStore, {
    type: 'READ_MESSAGES_AND_OR_CHANGE_POPUP_STATE',
    value: { isShowingPopup: false },
  });
  expect(readOrPopupResult2).toMatchSnapshot();
  expect(readOrPopupResult2.isShowingPopup).toEqual(false);
});

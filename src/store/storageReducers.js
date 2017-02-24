
import { setField } from '../utils/otm';

const initialState = { };

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATA': {
      const d = setField(state, action.treePath, action.value);
      // console.log(d);
      return d;
    }

    case 'INIT_DATA': {
      const initData = action.data || initialState;
      return { data: { messages: initData.messages || [] } };
    }

    case 'ADD_MESSAGE': {
      const newId =
        (state.data.messages && state.data.messages.length > 0)
        ? state.data.messages[0].id + 1
        : 0;

      const messagesSnapshot = [
        {
          id: newId,
          title: action.value,
          datetime: new Date(),
          unread: true,
        },
        ...state.data.messages,
      ];
      const d = setField(state, ['data', 'messages'], messagesSnapshot);
      // console.log(d);
      return d;
    }

    case 'READ_MESSAGES_AND_OR_CHANGE_POPUP_STATE': {
      const { numberReaded } = action.value || {};
      if (numberReaded === undefined) {
        console.log('state', state);
        return state;
      }
      console.log('action.value', action.value);

      const messages = (state.data && state.data.messages) ? state.data.messages : [];
      const messagesSnapshot = messages.reduce((accParams, message) => {
        const { acc, processedIndex } = accParams;
        if (processedIndex >= 0) {
          return {
            acc: [
              ...acc,
              {
                ...message,
                unread: false,
              },
            ],
            processedIndex: processedIndex - 1,
          };
        }

        return {
          acc: [
            ...acc,
            message,
          ],
          processedIndex,
        };
      }, {
        acc: [],
        // -1 mean we need mark if for all items need to set readed flag
        processedIndex: (numberReaded === -1) ? messages.length : numberReaded,
      });

      const d = setField(state, ['data', 'messages'], messagesSnapshot.acc);
      // console.log(d);
      return d;
    }

    default:
      return state || initialState;
  }
}

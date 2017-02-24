
import { setField } from '../utils/otm';

const initialState = { };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_DATA': {
      const d = setField(state, action.treePath, action.value);
      // console.log(d);
      return d;
    }

    case 'INIT_DATA': {
      const initData = action.data || initialState;
      return { isShowingPopup: initData.isShowingPopup || false };
    }

    case 'READ_MESSAGES_AND_OR_CHANGE_POPUP_STATE': {
      const { isShowingPopup } = action.value || {};
      if (isShowingPopup === undefined) {
        return state;
      }

      return {
        ...state.popupReducer,
        isShowingPopup,
      };
    }

    default:
      return state || initialState;
  }
}

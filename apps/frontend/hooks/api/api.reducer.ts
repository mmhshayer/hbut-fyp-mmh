import { ApiActionType } from './api-action.enum';
import { IRequestState } from './api.interface';

function ApiReducer<ResponseType, ErrorType>(
  state: IRequestState<ResponseType, ErrorType>,
  action: {
    action: ApiActionType;
    payload?: Partial<IRequestState<ResponseType, ErrorType>>;
  }
): IRequestState<ResponseType, ErrorType> {
  switch (action.action) {
    case ApiActionType.SET_LOADING: {
      return { ...state, loading: action.payload?.loading || false };
    }
    case ApiActionType.SET_DATA_LOADED: {
      return {
        ...state,
        data: action.payload?.data || null,
        error: null,
        loaded: true,
      };
    }
    case ApiActionType.SET_ERROR: {
      return {
        ...state,
        data: null,
        error: action.payload?.error || null,
        loaded: true,
      };
    }
    case ApiActionType.RESET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}

export default ApiReducer;

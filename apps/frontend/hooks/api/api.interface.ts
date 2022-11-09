export interface IRequestState<ResponseType, ErrorType> {
  data: ResponseType | null;
  error: ErrorType | null;
  loading: boolean;
  loaded: boolean;
}

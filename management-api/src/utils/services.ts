export enum DefErrorMessages {
  InternalServerError = 'general/INTERNAL_SERVER_ERROR',
  MinLengthExceeded = 'general/MIN_LENGTH_EXCEEDED',
  MaxLengthExceeded = 'general/MAX_LENGTH_EXCEEDED',
  InvalidIdLength = 'general/INVALID_ID_LENGTH',
  UserNotFound = 'general/USER_NOT_FOUND',
}

export const COLLECTION_ID_LENGTH = 24;

export interface SResponse<Data, IsError extends boolean> {
  isError: IsError;
  data: IsError extends true ? undefined : Data;
  error: IsError extends true ? string : undefined;
}

export interface SSuccessResponse<Data> extends SResponse<Data, false> {}

export interface SErrorResponse extends SResponse<undefined, true> {}

export type SFuncResponse<Data> = SSuccessResponse<Data> | SErrorResponse;

export const returnSuccess = <Data>(data: Data): SSuccessResponse<Data> => ({
  isError: false,
  data,
  error: undefined,
});

export const returnError = (
  error: string = DefErrorMessages.InternalServerError
): SErrorResponse => ({
  isError: true,
  data: undefined,
  error,
});

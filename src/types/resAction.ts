export enum ResActionStatusEnum {
  SUCCESS = 200,
  ERR_SERVER = 500,
  ERR_VALIDATION = 400,
  ERR_AUTH = 401,
}
export type ResAction<T> = { status: ResActionStatusEnum; result: T };

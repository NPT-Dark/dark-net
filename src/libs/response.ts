import { ResAction, ResActionStatusEnum } from "~/types/resAction";

export const responseSuccess = <T>(result: T): ResAction<T> => {
  return {
    status: ResActionStatusEnum.SUCCESS,
    result,
  };
};

export const responseValidation = (): ResAction<string> => {
  return {
    status: ResActionStatusEnum.ERR_VALIDATION,
    result: "Validation failed",
  };
};

export const responseError = (): ResAction<string> => {
  return {
    status: ResActionStatusEnum.ERR_SERVER,
    result: "Internal server error",
  };
};

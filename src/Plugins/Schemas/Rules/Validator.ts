import { InputSchema } from "../type";

type ValidateOptions = {
  abortWhenFail: boolean;
  customError: any;
  onInValid: any;
};

type ResultValidate = {
  valid: boolean;
  error?: any;
};

function validate(value: any, inputSchema: InputSchema, options: ValidateOptions) {}

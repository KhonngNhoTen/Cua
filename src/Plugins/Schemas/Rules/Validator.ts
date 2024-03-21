import { rules } from ".";
import { getType } from "../../../Helpers/getType";
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
export type ResultValidateAttribute = {
  valid: boolean;
  message?: any;
  forceSkip?: boolean;
};


function validateAttribute(value: any, inputSchema: InputSchema) {
  
  // Sort rule
  const sortedRule = {required: inputSchema.required, checkType: inputSchema.type,...inputSchema};
  const keys = Object.keys(sortedRule);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    (rules as any)[key](value);
  }
}

function validate(value: any, inputSchema: InputSchema, options: ValidateOptions) {
  const keys = Object.keys(value);
  const type = getType(value);
  if(type === "object") {

  }
  if(type === "array") {

  }

  return validateAttribute(value, inputSchema);
}

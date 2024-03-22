import validator from "validator";
import { IsEmailRuleOptions } from "../type";
import { ResultValidateAttribute } from "../Validator/Validator";

export function isEmail(str: string, options?: IsEmailRuleOptions): ResultValidateAttribute {
  const DEFAULT_MESSAGE = "should be email";
  if (validator.isEmail(str, options?.emailOption)) return { valid: true };
  return { valid: false, message: DEFAULT_MESSAGE };
}

// function getOptions(options)

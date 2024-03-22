import validator from "validator";
import { IsUrlRuleOptions } from "../type";
import { ResultValidateAttribute } from "../Validator/Validator";

export function isURL(str: string, options: IsUrlRuleOptions): ResultValidateAttribute {
  const DEFAULT_MESSAGE = "should be URL";
  if (validator.isURL(str, options.urlOptions)) return { valid: true };
  return { valid: false, message: DEFAULT_MESSAGE };
}

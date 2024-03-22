import { RequiredRuleOptions } from "../type";
import { ResultValidateAttribute } from "../Validator/Validator";

export function required(value: any, options: RequiredRuleOptions): ResultValidateAttribute {
  const DEFAULT_MESSAGE = "is required";
  if (!value && options) return { message: DEFAULT_MESSAGE, valid: false };
  if (!value && !options) return { forceSkip: true, valid: true };
  return {
    valid: true,
  };
}

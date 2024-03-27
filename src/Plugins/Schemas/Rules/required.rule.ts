import { RequiredRuleOptions } from "../type";
import { ResultCheckRule } from "../Validator/type";

export function required(value: any, options: RequiredRuleOptions): ResultCheckRule {
  const DEFAULT_MESSAGE = "is required";
  if (value === undefined && options !== undefined) return { message: DEFAULT_MESSAGE, valid: false };
  if (value === undefined && options === undefined) return { forceSkip: true, valid: true };
  return {
    valid: true,
  };
}

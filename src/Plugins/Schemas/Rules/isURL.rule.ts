import validator from "validator";
import { IsUrlRuleOptions } from "../type";
import { ResultCheckRule } from "../Validator/type";

export function isURL(str: string, options: IsUrlRuleOptions): ResultCheckRule {
  const DEFAULT_MESSAGE = "should be URL";
  if (validator.isURL(str, options.urlOptions)) return { valid: true };
  return { valid: false, message: DEFAULT_MESSAGE };
}

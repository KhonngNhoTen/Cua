import { getType } from "../../../Helpers/getType";
import { TypeRuleOptions } from "../type";
import { ResultCheckRule } from "../Validator/type";

export function checkType(value: any, options: TypeRuleOptions): ResultCheckRule {
  const DEFAULT_MESSAGE = "should be " + options.type;
  const type = getType(value);
  if (type !== options.type) return { valid: false, message: DEFAULT_MESSAGE };
  return { valid: true };
}

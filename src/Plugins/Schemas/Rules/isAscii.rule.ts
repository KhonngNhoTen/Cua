import validator from "validator";
import { ResultValidateAttribute } from "../Validator/Validator";

export function isAscii(str: string): ResultValidateAttribute {
  const DEFAULT_MESSAGE = "should be ascii";
  if (validator.isAscii(str)) return { valid: true };
  return { valid: false, message: DEFAULT_MESSAGE };
}

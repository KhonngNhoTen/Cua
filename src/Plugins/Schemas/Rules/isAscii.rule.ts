import validator from "validator";
import { ResultCheckRule } from "../Validator/type";

export function isAscii(str: string): ResultCheckRule {
  const DEFAULT_MESSAGE = "should be ascii";
  if (validator.isAscii(str)) return { valid: true };
  return { valid: false, message: DEFAULT_MESSAGE };
}

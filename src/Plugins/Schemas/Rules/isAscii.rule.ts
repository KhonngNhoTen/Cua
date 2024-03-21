import validator from "validator";
import {  ResultValidateAttribute } from "./Validator";

export function isAscii (str: string, ruleOptions: boolean|undefined): ResultValidateAttribute {
    const DEFAULT_MESSAGE = 'should be ascii';
  if(validator.isAscii(str) && ruleOptions) return {valid: true}
  return {valid: false, message: DEFAULT_MESSAGE}
}
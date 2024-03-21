import validator from "validator";
import {  ResultValidateAttribute } from "./Validator";

export function isEmail (str: string, options?: validator.IsEmailOptions | undefined): ResultValidateAttribute {
    const DEFAULT_MESSAGE = 'should be email';
  if(validator.isEmail(str,options)) return {valid: true}
  return {valid: false, message: DEFAULT_MESSAGE}
}
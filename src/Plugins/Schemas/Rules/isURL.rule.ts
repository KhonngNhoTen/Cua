import validator from "validator";
import {  ResultValidateAttribute } from "./Validator";

export function isURL (str: string, options?: validator.IsURLOptions | undefined): ResultValidateAttribute {
    const DEFAULT_MESSAGE = 'should be URL';
  if(validator.isURL(str,options)) return {valid: true}
  return {valid: false, message: DEFAULT_MESSAGE}
}
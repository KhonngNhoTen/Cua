import validator from "validator";
import { ValidatorError } from "./ValidatorError";

const isEmail = (str: string, keyName: string, check: boolean, messages?: string | string[]) => {
  if (validator.isEmail(str)) return true;
  throw new ValidatorError({ value: str, messages: messages, keyName });
};
const isAscii = () => {};
const isAlpha = () => {};
const isAlphanumeric = () => {};
const isEmpty = () => {};
const isUrl = () => {};
const isRgbColor = () => {};
const isMD5 = () => {};
const stringDate = () => {};
const length = () => {};
const InEnum = () => {};

export const listRuleHandlers = {
  isEmail: validator.isEmail,
  isAscii: validator.isAscii,
  isAlpha: validator.isAlpha,
  isAlphanumeric: validator.isAlphanumeric,
  isEmpty: validator.isEmpty,
  isUrl: validator.isURL,
  isRgbColor: validator.isRgbColor,
  isMD5: validator.isMD5,
  stringDate: validator.isDate,
  length: validator.isLength,
  enum: validator.isIn,
};

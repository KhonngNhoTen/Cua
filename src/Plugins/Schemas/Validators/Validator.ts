import validator from "validator";

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

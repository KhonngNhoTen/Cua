import { isAscii } from "./isAscii.rule";
import { isEmail } from "./isEmail.rule";
import { isURL } from "./isURL.rule";
import { required } from "./required.rule";
import { checkType } from "./checkType.rule";

export const rules = {
  isEmail: isEmail,
  isAscii: isAscii,
  isURL: isURL,
  required: required,
  checkType: checkType,
};

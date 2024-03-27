import { isAscii } from "./isAscii.rule";
import { isEmail } from "./isEmail.rule";
import { isURL } from "./isURL.rule";
import { required } from "./required.rule";
import { checkType } from "./checkType.rule";

export const rules = {
  required: required,
  type: checkType,
  isEmail: isEmail,
  isAscii: isAscii,
  isURL: isURL,
};

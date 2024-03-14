export function getRuleValue(data: any) {
  return Array.isArray(data) ? data[0] : data;
}

export function setRuleValue(rule: any, value: any) {
  if (Array.isArray(rule)) rule[0] = value;
  else rule = value;
  return rule;
}

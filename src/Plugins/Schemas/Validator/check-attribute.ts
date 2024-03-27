import { BaseRuleOptions, SchemaOptions } from "../type";
import { DescriptionAttribute, ResultCheckRule, ResultValidate } from "./type";
import { rules } from "../Rules";

/**
 * Check attribute by list rules.
 */
export function checkAttribute(
  attribute: any,
  schema: SchemaOptions,
  description: DescriptionAttribute
): ResultValidate {
  const listRules = rules as any;
  const ruleNames = Object.keys(listRules);
  const schemOpts = schema as any;

  for (let i = 0; i < ruleNames.length; i++) {
    const ruleName = ruleNames[i];
    if (schemOpts[ruleName]) {
      const result = listRules[ruleName](attribute, schemOpts[ruleName]) as ResultCheckRule;
      const baseRuleOpts = schemOpts[ruleName] as BaseRuleOptions;

      const message = (description.attributeName ?? "value") + " " + result.message;

      if (result.forceSkip) return { valid: true, errors: [] };
      if (!result.valid)
        return {
          valid: false,
          errors: [
            {
              ...description,
              message: baseRuleOpts.message
                ? baseRuleOpts.message({
                    message,
                    propertyValue: attribute,
                    ruleName,
                    propertyName: description.attributeName,
                  })
                : message,
            },
          ],
        };
    }
  }

  return { valid: true, errors: [] };
}

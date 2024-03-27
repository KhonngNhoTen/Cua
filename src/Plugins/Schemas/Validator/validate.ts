import { Schema } from "../Schema";
import { SchemaOptions } from "../type";
import { checkAttribute } from "./check-attribute";
import { DescriptionAttribute, ResultValidate, ValidateOption } from "./type";

/**
 * Check value.
 * If value is object, the function check properties.
 * If value is array, the function check item (value[0])
 */
function check(
  value: any,
  schema: SchemaOptions,
  options: ValidateOption,
  descriptionAttribute?: DescriptionAttribute
): ResultValidate {
  const description = descriptionAttribute ?? { attributeValue: value, path: '"value"', attributeName: '"value"' };
  const result = checkAttribute(value, schema, description);

  if (result.valid && schema.properties) {
    const fieldNames = Object.keys(schema.properties);
    for (let i = 0; i < fieldNames.length; i++) {
      const fieldName = fieldNames[i];
      const attribute = value !== undefined && value[fieldName] !== undefined ? value[fieldName] : undefined;

      const checAttribute = check(attribute, schema.properties[fieldName], options, {
        attributeValue: attribute,
        attributeName: fieldName,
        path: description.path + "." + fieldName,
      });

      if (!checAttribute.valid) {
        result.valid = false;
        result.errors.push(...checAttribute.errors);
        if (options.abortEarly) return result;
      }
    }
  } else if (result.valid && schema.item) {
    const attribute = value !== undefined && value[0] !== undefined ? value[0] : undefined;
    const checkItem = checkAttribute(attribute, schema.item, {
      attributeValue: attribute,
      attributeName: "*",
      path: description.path + ".*",
    });

    if (!checkItem.valid) {
      result.valid = false;
      result.errors.push(...checkItem.errors);
      if (options.abortEarly) return result;
    }
  }

  return result;
}

/**
 * Function validate value
 */
export function validate(value: any, schema: Schema, options?: ValidateOption) {
  const result = check(value, schema.validations, options ?? { abortEarly: true });

  return result;
}

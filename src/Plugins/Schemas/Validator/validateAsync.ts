import { Schema } from "../Schema";
import { SchemaOptions } from "../type";
import { checkAttribute } from "./check-attribute";
import { DescriptionAttribute, ResultValidate, ValidateOption } from "./type";

/**
 * Check value.
 * If value is object, the function check properties.
 * If value is array, the function check item (value[0])
 */
async function checkAsync(
  value: any,
  schema: SchemaOptions,
  options: ValidateOption,
  descriptionAttribute?: DescriptionAttribute
): Promise<ResultValidate> {
  const description = descriptionAttribute ?? { attributeValue: value, path: '"value"', attributeName: '"value"' };
  const result = checkAttribute(value, schema, description);

  if (result.valid && schema.properties) {
    const fieldNames = Object.keys(schema.properties);
    const promises = [];
    for (let i = 0; i < fieldNames.length; i++) {
      const fieldName = fieldNames[i];
      const attribute = value !== undefined && value[fieldName] !== undefined ? value[fieldName] : undefined;
      const schemaOpts = schema.properties[fieldName] as any;

      promises.push(
        (async () =>
          checkAsync(attribute, schemaOpts, options, {
            attributeValue: attribute,
            attributeName: fieldName,
            path: description.path + "." + fieldName,
          }))()
      );
    }
    const checks = await Promise.all(promises);
    for (let i = 0; i < checks.length; i++) {
      const check = checks[i];
      if (!check.valid) {
        result.valid = false;
        result.errors.push(...check.errors);
        if (options.abortEarly) return result;
      }
    }
  } else if (result.valid && schema.item) {
    const attribute = value !== undefined && value[0] !== undefined ? value[0] : undefined;
    const check = await checkAsync(attribute, schema.item, options, {
      attributeValue: attribute,
      attributeName: "*",
      path: description.path + ".*",
    });

    if (!check.valid) {
      result.valid = false;
      result.errors.push(...check.errors);
      if (options.abortEarly) return result;
    }
  }

  return result;
}

/**
 * Function validate value
 */
export async function validateAsync(value: any, schema: Schema, options?: ValidateOption) {
  const result = await checkAsync(value, schema.validations, options ?? { abortEarly: true });

  return result;
}

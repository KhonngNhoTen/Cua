import { rules } from "../Rules";
import { getType } from "../../../Helpers/getType";
import { InputSchema, SchemaOptions } from "../type";

type ValidateOptions = {
  abortWhenFail: boolean;
  customError: any;
  onInValid: any;
};

type ResultValidate = {
  valid: boolean;
  errors: any[];
};

type ResultValidateAttribute = {
  valid: boolean;
  message?: any;
  forceSkip?: boolean;
};

function combineResultValidate(source: ResultValidate, target: ResultValidate) {
  source.valid = source.valid && target.valid;
  source.errors = [...source.errors, ...target.errors];
  return source;
}

function validateAttribute(value: any, schemaOptions: SchemaOptions): ResultValidate {
  // Sort rule
  const sortedRule = { required: schemaOptions.required, checkType: schemaOptions.type, ...schemaOptions };
  const keys = Object.keys(sortedRule);
  const resultValidate: ResultValidate = { valid: true, errors: [] };
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const check = (rules as any)[key](value, (schemaOptions as any)[key]) as ResultValidateAttribute;
    if (check.forceSkip) return { valid: true, errors: [] };
    if (!check.valid) {
      resultValidate.valid = false;
      resultValidate.errors?.push(check?.message ?? "");
    }
  }

  return resultValidate;
}

function validate(value: any, schemaOptions: SchemaOptions, options: ValidateOptions): ResultValidate {
  const keys = Object.keys(value);
  const type = getType(value);
  let resultValidate: ResultValidate = validateAttribute(value, schemaOptions);
  if (type === "object") {
    keys.forEach((fieldName) => {
      const checkResult = validateAttribute(value[fieldName], (schemaOptions.properties as any)[fieldName]);
      resultValidate = combineResultValidate(resultValidate, checkResult);
    });
  }
  if (type === "array") {
    resultValidate = combineResultValidate(resultValidate, validateAttribute(value[0], schemaOptions.item as any));
  }

  return resultValidate;
}

async function validateAttributeAsync(value: any, schemaOptions: SchemaOptions): Promise<ResultValidate> {
  // Sort rule
  const sortedRule = { required: schemaOptions.required, checkType: schemaOptions.type, ...schemaOptions };
  const keys = Object.keys(sortedRule);
  const resultValidate: ResultValidate = { valid: true, errors: [] };
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const check = (rules as any)[key](value, (schemaOptions as any)[key]) as ResultValidateAttribute;
    if (check.forceSkip) return { valid: true, errors: [] };
    if (!check.valid) {
      resultValidate.valid = false;
      resultValidate.errors?.push(check?.message ?? "");
    }
  }

  return resultValidate;
}

function validateAsyn() {}

export { validate, ResultValidateAttribute };

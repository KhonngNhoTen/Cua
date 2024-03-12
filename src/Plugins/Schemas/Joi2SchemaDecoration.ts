import Joi from "joi";
import { SchemaDecorations, TypeSchemaDecoration } from "./Schema";

const getTypeSchema: Record<string, { type: TypeSchemaDecoration; format?: string[] }> = {
  number: { type: "number" },
  string: { type: "string" },
  boolean: { type: "boolean" },
  array: { type: "array" },
  object: { type: "object" },
  date: { type: "string", format: ["date-time"] },
  binary: { type: "string", format: ["binary"] },
};

export function parseDecorations(description?: any): SchemaDecorations | undefined {
  if (!description.type) return undefined;

  const decoration: SchemaDecorations = { ...getTypeSchema[description.type] };

  if (description.type === "object") {
    Object.keys(description.keys).forEach((e) => {
      const deco = parseDecorations(description.keys[e]);
      if (!decoration.decorators) decoration.decorators = {};
      if (deco) decoration.decorators[e] = deco;
    });
  } else if (description.type === "array") {
    const deco = parseDecorations(description.items[0]);
    if (!decoration.decorators) decoration.decorators = {};
    if (deco) decoration.decorators.item = deco;
  }

  decoration.enum = getEnum(description);
  decoration.required = required(description);

  return decoration;
}

function required(description: any) {
  return !!(description.flags && description.flags?.presence === "required");
}

function getEnum(description: any) {
  return description.allow;
}

function getMinMax(description: any) {
  if (!description.rules) return;
  const res: any = {};

  const min: any = [].find((e: any) => e.name === "min") as any;
  res[min.name] = min.args[0].limit;

  const max: any = [].find((e: any) => e.name === "max");
  res[max.name] = max.args[0].limit;

  return res;
}

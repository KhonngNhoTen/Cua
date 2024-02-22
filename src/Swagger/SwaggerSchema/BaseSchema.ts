import ISwaggerComponent from "../Components/SwaggerComponent";
export enum TYPES {
  STRING,
  NUMBER,
  OBJECT,
  ARRAY,
}
export abstract class BaseSchema implements ISwaggerComponent {
  abstract genSwagger(): Object;

  getType(value: any): TYPES {
    const type = {}.toString.call(value).split(" ")[1].slice(0, -1).toLowerCase();
    if (type === "number") return TYPES.NUMBER;
    if (type === "string") return TYPES.STRING;
    if (type === "object") return TYPES.OBJECT;
    if (type === "array") return TYPES.ARRAY;

    if (typeof value === "object") return TYPES.OBJECT;

    throw new Error("Type not support");
  }
}
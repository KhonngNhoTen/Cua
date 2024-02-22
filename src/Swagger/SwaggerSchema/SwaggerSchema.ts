import { TYPES } from "../../Helpers/check-type";
import ISwaggerComponent from "../Components/SwaggerComponent";
import { SwaggerSchema } from "../type";

abstract class Schema implements ISwaggerComponent {
  protected type: TYPES;
  protected name: string | undefined;

  abstract genSwagger(): SwaggerSchema;

  constructor(type: TYPES, name?: string) {
    this.name = name;
    this.type = type;
  }
}

export default Schema;

import { BaseSchema } from "../SwaggerSchema/BaseSchema";
import { SwaggerParameter } from "../type";
import ISwaggerComponent from "./SwaggerComponent";

type ParameterOptions = {
  required: boolean;
  name: string;
  description: string;
};

// class Parameter implements ISwaggerComponent {
//   protected required: boolean = false;
//   protected name: string = "";
//   protected description: string = "";
//   protected location: "query" | "path" = "path";
//   protected schema?: BaseSchema;

//   constructor(location: "query" | "path", options: ParameterOptions) {
//     this.required = options.required;
//     this.name = options.name;
//     this.description = options.description;
//     this.location = location;
//   }

//   genSwagger(): Object {
//     throw new Error("Method not implemented.");
//   }

//   static from(location: "query" | "path", schema: RouteParameter | undefined): SwaggerParameter[] {
//     if (!schema) return [];
//     const exportData: SwaggerParameter[] = [];
//     Object.keys(schema).forEach((e) => {
//       exportData.push({
//         in: location,
//         name: e ?? "",
//         description: schema[e].description ?? "",
//         required: schema[e].required ?? false,
//         schema: SchemaFactory.create({
//           [e]: schema[e].example,
//         }).genSwagger(),
//       });
//     });
//     return exportData;
//   }
// }

class Parameter implements ISwaggerComponent {
  genSwagger(): SwaggerParameter {
    return this.options;
  }

  private options: SwaggerParameter;
  constructor(schema: BaseSchema, location: "query" | "path", extraData?: ParameterOptions) {
    this.options = {
      in: location,
      description: extraData?.description ?? "",
      name: extraData?.name ?? "",
      required: extraData?.required ?? false,
      schema: schema.genSwagger(),
    };
  }
}

export default Parameter;

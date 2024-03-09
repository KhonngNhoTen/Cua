import { ISwaggerComponent } from "../../Core/ISwaggerComponent";
import { SwaggerParameter } from "../../type";
import { Example } from "../Example/Example";
import { MediaData } from "../MediaData/MediaData";
import { BaseSchema } from "../Schema/BaseSchema";
import { ContentTypeString } from "../MediaData/MediaType";

export type BaseParameterOptions = {
  in: "query" | "header" | "path" | "cookie";
  name: string;
  description?: string;
  required?: boolean;
  schema?: BaseSchema;
  examples?: Record<string, Example>;
  content?: MediaData;
};
export abstract class BaseParameter implements ISwaggerComponent {
  in: "query" | "header" | "path" | "cookie";
  name: string;
  description: string;
  required?: boolean;
  schema?: BaseSchema;
  examples?: Record<string, Example>;
  content?: MediaData;

  constructor(options?: BaseParameterOptions) {
    this.in = options?.in ?? "query";
    this.name = options?.name ?? "";
    this.description = options?.description ?? "";
    this.required = options?.required ?? false;
    this.schema = options?.schema;
    this.examples = options?.examples;
    this.content = options?.content;
  }
  genSwagger(): SwaggerParameter {
    const schemaOpts: SwaggerParameter = {
      name: this.name,
      in: this.in,
      description: this.description,
      required: this.required,
    };
    if (this.schema) schemaOpts.schema = this.schema.genSwagger();
    if (this.content) schemaOpts.content = { [this.content.contentType]: this.content.genSwagger() };
    return schemaOpts;
  }
}

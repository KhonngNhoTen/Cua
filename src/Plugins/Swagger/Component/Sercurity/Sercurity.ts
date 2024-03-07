import { ISwaggerComponent } from "../../Core/ISwaggerComponent";
import { SwaggerSecurity } from "../../type";

type SercurityOptions = {
  name?: string;
  isDefault: boolean;
  description?: string;
  in?: "query" | "header" | "cookie";
  scheme?: string;
  bearerFormat?: string;
  type?: "http" | "apiKey" | "oauth2";
};
export class Sercurity implements ISwaggerComponent {
  private isDefault: boolean;
  private name?: string;
  private description?: string;
  private in?: "query" | "header" | "cookie";
  private scheme?: string;
  private bearerFormat?: string;
  private type?: "http" | "apiKey" | "oauth2";

  constructor(options?: SercurityOptions) {
    this.isDefault = false;
    this.name = options?.name;
    this.description = options?.description;
    this.in = options?.in;
    this.scheme = options?.description;
    this.bearerFormat = options?.bearerFormat;
    this.type = options?.type;
  }

  genSwagger(): SwaggerSecurity {
    const exportSchema: SwaggerSecurity = {
      type: this.type ?? "http",
    };
    if (this.description) exportSchema.description = this.description;

    return exportSchema;
  }
}

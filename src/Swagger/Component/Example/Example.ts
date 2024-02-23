import { IRouteHandler } from "../../Core/IRouteHandler";
import { ISwaggerComponent } from "../../Core/ISwaggerComponent";
import { SwaggerExample } from "../../type";

export type ExampleOption = {
  summary?: string;
  description?: string;
  value?: any;
};

export class Example implements ISwaggerComponent, IRouteHandler {
  protected summary: string;
  protected description: string;
  protected value: any;

  constructor(options: ExampleOption) {
    this.value = options.value;
    this.summary = options.summary ?? "";
    this.description = options.description ?? "";
  }

  genSwagger(): SwaggerExample {
    return {
      value: this.value,
      description: this.description,
      summary: this.summary,
    };
  }

  fromRoute(routeExample: Object, description?: string, summary?: string): Example {
    return new Example({ value: routeExample, description, summary });
  }
}

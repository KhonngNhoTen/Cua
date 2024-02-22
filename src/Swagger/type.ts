export type SwaggerExportSchema = {
  openapi?: string;
  info: ApiInfo;
  servers: {
    url: string;
  }[];
  externalDocs: ExternalDocs;
  tags: Tags[];
  paths: { [path: string]: { [httpMethod: string]: Path } };
};

export type ApiInfo = {
  title?: string;
  description?: string;
  version?: string;
};

export type Tags = {
  name: string;
  description: string;
  externalDocs?: ExternalDocs;
};

export type ExternalDocs = {
  description?: string;
  url?: string;
};

export type SwaggerParameter = {
  in: "query" | "path";
  name: string;
  description: string;
  required: boolean;
  schema: SwaggerSchema;
};

export type Path = {
  tags?: string[];
  summary: string;
  description: string;
  operationId: string;
  requestBody?: Record<string, any>;
  responses?: any;
  parameters?: SwaggerParameter[];
  security?: any;
};

export type SwaggerSchema = {
  type?: string;
  format?: string;
  example?: any;
  properties?: Record<string, SwaggerSchema> | Record<string, Record<string, SwaggerSchema>>;
  items?: SwaggerSchema;
};

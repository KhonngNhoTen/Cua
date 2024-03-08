export type SwaggerExportSchema = {
  openapi?: string;
  info?: ApiInfo;
  servers: {
    url: string;
  }[];
  externalDocs?: ExternalDocs;
  tags?: Tags[];
  paths: { [path: string]: { [httpMethod: string]: Path } };
  components?: {
    securitySchemes?: Record<string, SwaggerSecurity>;
  };
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

export function isTag(object: any): object is Tags {
  return (object as Tags).description !== undefined && (object as Tags).name !== undefined;
}

export type ExternalDocs = {
  description?: string;
  url?: string;
};

export type SwaggerParameter = {
  in?: "query" | "header" | "path" | "cookie";
  name?: string;
  description?: string;
  required?: boolean;
  schema?: SwaggerSchema;
  content?: SwaggerMediaData;
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
  description?: string;
  enum?: string[];
};

// type valueof<T> = T[keyof T];

export type SwaggerResponse = {
  [httpStatus: string]: {
    description?: string;
    content?: Record<
      string,
      {
        schema: SwaggerSchema;
        examples?: Object;
      }
    >;
  };
};

export type SwaggerExample = {
  summary?: string;
  description?: string;
  value: any;
};
export type SwaggerMediaDataItem = {
  schema: SwaggerSchema;
  examples?: Record<string, SwaggerExample>;
};
export type SwaggerMediaData = Record<string, SwaggerMediaDataItem>;
export type SwaggerDataTransform = {
  description: string;
  content: SwaggerMediaData;
};

export type SwaggerResponses = {
  [httpStatus: string]: SwaggerDataTransform;
};

export type SwaggerSecurity = {
  type: "apiKey" | "http" | "oauth2";
  name?: string;
  description?: string;
  in?: "query" | "header" | "cookie";
  scheme?: string;
  bearerFormat?: string;
  isDefault?: boolean;
};

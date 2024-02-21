export type SwaggerSchema = {
    openapi?: string;
    info: ApiInfo,
    servers: {
        url: string
    }[];
    externalDocs: ExternalDocs; 
    tags: Tags[];
    paths: {[path: string]: {[httpMethod: string]: Path}};
}


export type ApiInfo = {
    title?: string;
    description?: string;
    version?: string;
}

export type Tags = {
    name: string;
    description: string;
    externalDocs?: ExternalDocs
}

export type ExternalDocs = {
    description?: string;
    url?: string;
}


export type Path = {
    tags?: string[];
    summary: string;
    description: string;
    operationId: string;
    requestBody: Record<string, any>;
    responses: any;
    parameters: any;
    security: any;
}



type DescriptionAttribute = {
    description: string;
    example: any;
    nullable: boolean;
}

export type AttributeSchemaOptions = Record <string, number|string|DescriptionAttribute>;

export type SchemaOptions = AttributeSchemaOptions | Record <string, AttributeSchemaOptions>

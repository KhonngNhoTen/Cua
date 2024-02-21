import { ExternalDocs, SwaggerSchema, Tags,Path } from "../type";

class SwaggerBuilder {
    private schema: SwaggerSchema = {info: {}, servers: [], externalDocs: {}, tags: [], paths: {}};
    get Schema() {return this.schema }


    static instance: SwaggerBuilder;
    static initInstance () {
        SwaggerBuilder.instance = new SwaggerBuilder();
    }

    constructor() {
        this.schema.openapi = "3.0.3";
    }

    addApiInfo(title: string, description: string, version: string) {
        if (!this.schema.info)
            this.schema.info = {}

        this.schema.info.description = description;
        this.schema.info.title = title;
        this.schema.info.version = version;

    }

    addServers(urls: string[]) {
        this.schema.servers = urls.map(e => {url: e}) as Array<any>;
    }

    addTag(tags: []) {
        this.schema.tags = tags;
    }

    addExternalDocs (externalDocs: ExternalDocs) {
        this.schema.externalDocs = externalDocs; 
    }

    insertPath(path: string): { [httpMethod: string]: Path; } {
        this.schema.paths[path] = {

        };

        return this.schema.paths[path];
    }

    insertApi(url: string, method: string, data: Path) {
        const path = this.insertPath(url);
        path[method] = data;
    }

}

export default SwaggerBuilder;
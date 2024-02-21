import { ExternalDocs, SwaggerExportSchema, Tags, Path } from "../type";

class SwaggerBuilder {
  private options: SwaggerExportSchema = { info: {}, servers: [], externalDocs: {}, tags: [], paths: {} };
  get Options() {
    return this.options;
  }

  private static instance: SwaggerBuilder;
  static Instance() {
    if (!SwaggerBuilder.instance) SwaggerBuilder.instance = new SwaggerBuilder();
    return SwaggerBuilder.instance;
  }

  constructor() {
    this.options.openapi = "3.0.3";
  }

  public addApiInfo(title: string, description: string, version: string) {
    if (!this.options.info) this.options.info = {};

    this.options.info.description = description;
    this.options.info.title = title;
    this.options.info.version = version;
  }

  public addServers(urls: string[]) {
    this.options.servers = urls.map((e) => {
      url: e;
    }) as Array<any>;
  }

  public addTag(tags: []) {
    this.options.tags = tags;
  }

  public addExternalDocs(externalDocs: ExternalDocs) {
    this.options.externalDocs = externalDocs;
  }

  insertPath(path: string): { [httpMethod: string]: Path } {
    this.options.paths[path] = {};

    return this.options.paths[path];
  }

  public insertApi(url: string, method: string, data: Path) {
    const path = this.insertPath(url);
    path[method] = data;
  }
}

export default SwaggerBuilder;

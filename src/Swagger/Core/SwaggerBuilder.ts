import { SwaggerExportSchema, Path, ExternalDocs } from "../type";
export class SwaggerBuilder {
  private options: SwaggerExportSchema = { openapi: "", info: {}, servers: [], paths: {} };
  pathFile: string = "";
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

  addPathFile(path: string) {
    this.pathFile = path;
    return this;
  }

  public addApiInfo(title: string, description: string, version: string) {
    if (!this.options.info) this.options.info = {};

    this.options.info.description = description;
    this.options.info.title = title;
    this.options.info.version = version;
    return this;
  }

  public addServers(urls: string[]) {
    this.options.servers = urls.map((e) => ({
      url: e,
    })) as Array<any>;
    return this;
  }

  public addTag(tags: []) {
    this.options.tags = tags;
    return this;
  }

  public addExternalDocs(externalDocs: ExternalDocs) {
    this.options.externalDocs = externalDocs;
    return this;
  }

  private insertPath(path: string): { [httpMethod: string]: Path } {
    if (!this.options.paths[path]) this.options.paths[path] = {};

    return this.options.paths[path];
  }

  insertApi(url: string, method: string, data: Path) {
    const path = this.insertPath(url);
    path[method] = data;
  }
}

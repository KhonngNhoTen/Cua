import { SwaggerHelper } from "../SwaggerHelper";
import { SwaggerExportSchema, Path, ExternalDocs, SwaggerSecurity } from "../type";
export class SwaggerBuilder {
  private options: SwaggerExportSchema = { openapi: "", info: {}, servers: [], paths: {} };
  private pathFile: string = "";
  private securities?: Record<string, SwaggerSecurity>;
  get Options() {
    return this.options;
  }
  get PathFile() {
    return this.pathFile;
  }
  get Securities() {
    return this.securities;
  }

  private static instance: SwaggerBuilder;
  static get Instance() {
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

  public addTitle(title: string) {
    if (!this.options.info) this.options.info = {};

    this.options.info.title = title;
    return this;
  }

  public addDescription(description: string) {
    if (!this.options.info) this.options.info = {};
    this.options.info.description = description;
    return this;
  }

  public addVersion(version: string) {
    if (!this.options.info) this.options.info = {};
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

  public addSecurity(securityOpts: Record<string, SwaggerSecurity>) {
    const key = Object.keys(securityOpts)[0];
    const security = securityOpts[key];

    const isDefault = Object.keys(this?.securities ?? {}).length === 0;
    this.securities = { ...this.securities, [isDefault ? "default" : key]: security };
    delete security.isDefault;

    if (!this.options.components) {
      this.options.components = { securitySchemes: { [isDefault ? "default" : key]: security } };
    } else {
      this.options.components.securitySchemes = {
        ...this.options.components.securitySchemes,
        [isDefault ? "default" : key]: security,
      };
    }

    return this;
  }

  public addExternalDocs(externalDocs: ExternalDocs) {
    this.options.externalDocs = externalDocs;
    return this;
  }

  private insertPath(url: string): { [httpMethod: string]: Path } {
    const path = SwaggerHelper.formatUrl2SwaggerPath(url);
    if (!this.options.paths[path]) this.options.paths[path] = {};

    return this.options.paths[path];
  }

  insertApi(url: string, method: string, data: Path) {
    const path = this.insertPath(url);
    path[method] = data;
  }
}

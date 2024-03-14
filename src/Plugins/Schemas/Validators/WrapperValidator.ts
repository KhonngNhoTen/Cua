import { getRuleValue } from "../SchemaHelper";

export function wrapper(name: string, value: any) {
  getRuleValue(value);
}

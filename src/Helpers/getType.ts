
export function getType(value: any):"string" | "number" | "boolean" | "object" | "array" {
    return {}.toString.call(value).split(" ")[1].slice(0, -1).toLowerCase() as "string" | "number" | "boolean" | "object" | "array" ;
}
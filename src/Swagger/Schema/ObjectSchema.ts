import Schema from "./Schema";

export class ObjectSchema extends Schema {
    protected properties: {[fieldName: string]: Schema} = {};

    genSwagger(): Object {
        throw new Error("Method not implemented.");
    }


    
}
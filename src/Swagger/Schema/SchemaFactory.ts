import { TYPES, getType } from "../../Helpers/check-type";
import { AttributeSchemaOptions, SchemaOptions } from "../type";
import ArraySchema from "./ArraySchema";
import { ObjectSchema } from "./ObjectSchema";
import PrimitiveSchema from "./PrimitiveSchema";

class SchemaFactory {
    create(schema: SchemaOptions) {

    }


    private convert(key: string, value: AttributeSchemaOptions) {
        const type = getType(value);
        if (type === TYPES.STRING)
            return new PrimitiveSchema(key,value);

        if (type === TYPES.NUMBER) return new PrimitiveSchema(value);
        if (type === TYPES.ARRAY) return new ArraySchema(value);
        if (type === TYPES.OBJECT) return new ObjectSchema(value);
        if (type === TYPES.ANY)
            throw new Error("Type of value not support");

    }
}
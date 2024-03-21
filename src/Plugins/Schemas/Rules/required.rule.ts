import { ResultValidateAttribute } from "./Validator";

export function isEmail(value: any, ruleOptions: boolean | undefined): ResultValidateAttribute {
    const DEFAULT_MESSAGE = "is required"
    if (!value && ruleOptions) return { message: DEFAULT_MESSAGE, valid: false };
    if (!value && !ruleOptions) return { forceSkip: true, valid: true };

    return {
        valid: true
    }
}
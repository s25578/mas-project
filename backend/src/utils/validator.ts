export class Validator {

    private static parse(value: {[key: string]: any}) : [string, any] {
        return Object.entries(value)[0];
    }

    public static isNonEmptyString(value: {[key: string]: any}): void {

        const [fieldName, fieldValue] = Validator.parse(value);

        if (typeof fieldValue !== 'string' || fieldValue.trim().length === 0) {
            throw new Error(`${fieldName} must be a non-empty string.`);
        }
    }

    public static hasValidLength(value: {[key: string]: any}, minLength: number, maxLength?: number): void {
        const [fieldName, fieldValue] = Validator.parse(value);

        if (maxLength === undefined) {
            if (fieldValue.length < minLength) {
                throw new Error(`${fieldName} must be at least ${minLength} characters long.`);
            }
        } else {
            if (fieldValue.length < minLength || fieldValue.length > maxLength) {
                throw new Error(`${fieldName} must be between ${minLength} and ${maxLength} characters long.`);
            }
        }
    }

    public static isNonNegativeNumber(value: {[key: string]: any}): void {

        const [fieldName, fieldValue] = Validator.parse(value);

        if (typeof fieldValue !== 'number' || fieldValue < 0 || isNaN(fieldValue)) {
            throw new Error(`${fieldName} must be a non-negative number.`);
        }
    }

    public static isValidArray(value: {[key: string]: any}, validateItem: (item: any, index: number) => void): void {

        const [fieldName, fieldValue] = Validator.parse(value);

        if (!Array.isArray(fieldValue) || fieldValue.length === 0) {
            throw new Error(`${fieldName} must be a non-empty array.`);
        }

        fieldValue.forEach((item, index) => validateItem(item, index));
    }
}
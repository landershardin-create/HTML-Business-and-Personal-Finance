// data/schema/validateEntity.js

export function validateEntity(entity, schema = EntitySchema) {
    const errors = [];

    for (const key in schema) {
        const type = schema[key];
        const value = entity[key];

        // Optional fields end with ?
        const optional = type.endsWith("?");

        if (optional && value === undefined) continue;

        const baseType = optional ? type.slice(0, -1) : type;

        if (baseType === "object") {
            if (typeof value !== "object") {
                errors.push(`${key} must be an object`);
            }
        } else if (baseType === "array") {
            if (!Array.isArray(value)) {
                errors.push(`${key} must be an array`);
            }
        } else if (typeof value !== baseType) {
            errors.push(`${key} must be a ${baseType}`);
        }
    }

    return errors;
}
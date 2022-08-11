/**
 * Will try to convert any value to number,
 * using the rules found here https://ajv.js.org/coercion.html
 */
const toNumberPreprocessor = (value: unknown) => {
    switch (typeof value) {
        case 'string':
            return Number(value)

        case 'bigint':
        case 'number':
            return value

        default:
            return value // could not coerce, return the original and face the consequences during validation
    }
}

export default toNumberPreprocessor

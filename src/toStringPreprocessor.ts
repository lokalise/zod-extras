const toStringPreprocessor = (value) => {
    switch (typeof value) {
        case 'bigint':
        case 'boolean':
        case 'number':
            return value.toString()

        case 'object':
            if (value == null) {
                return value
            }
            if (value instanceof Date) {
                return value.toISOString()
            }
            return value // could not coerce, return the original and face the consequences during validation

        case 'string':
        case 'undefined':
            return value

        default:
            return value // could not coerce, return the original and face the consequences during validation
    }
}

export default toStringPreprocessor

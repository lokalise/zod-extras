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

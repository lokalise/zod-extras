const toBooleanPreprocessor = (value: unknown) => {
    if (typeof value === 'string') {
        const lowered = value.toLowerCase()

        if (lowered === 'true' || lowered === '1') {
            return true
        }

        if (lowered === 'false' || lowered === '0') {
            return false
        }
    }

    switch (typeof value) {
        case 'number':
        case 'string':
            return Boolean(value)

        case 'boolean':
            return value

        default:
            return value // could not coerce, return the original and face the consequences during validation
    }
}

export default toBooleanPreprocessor

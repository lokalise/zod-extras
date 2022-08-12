const stringSplitFactory = ({
    delimiter = ',',
    castToNumber = false
} = {}) => {
    return (input: unknown): unknown => {
        if (typeof input !== 'string') {
            return input // could not coerce, return the original and face the consequences during validation
        }

        const values = input
            .split(delimiter)
            .map((val) => val.trim())

        if (!castToNumber) {
            return values
        }

        return values.map(Number)
    }
}

export default stringSplitFactory

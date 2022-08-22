type StringSplitFactoryOpts = Partial<{
    delimiter: string | RegExp
}>

const stringSplitFactory = (opts: StringSplitFactoryOpts = {}) => {
    const { delimiter = ',' } = opts

    return (input: unknown): unknown => {
        if (typeof input !== 'string') {
            return input // could not coerce, return the original and face the consequences during validation
        }

        return input.split(delimiter).map((val) => val.trim())
    }
}

export default stringSplitFactory

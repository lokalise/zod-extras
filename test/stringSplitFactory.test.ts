import z, { string } from 'zod'

import stringSplitFactory from '../src/stringSplitFactory'

describe('stringSplitFactory', () => {
    it('splits data into substrings', () => {
        const splitter = stringSplitFactory()
        const schema = z.preprocess(splitter, z.array(z.string()))
        const result = schema.parse('1,2,3')

        expect(result).toEqual(['1', '2', '3'])
    })

    it('can use custom delimiter', () => {
        const splitter = stringSplitFactory({ delimiter: '|' })
        const schema = z.preprocess(splitter, z.array(z.string()))
        const result = schema.parse('1|2|3')

        expect(result).toEqual(['1', '2', '3'])
    })

    it('can convert into numbers', () => {
        const splitter = stringSplitFactory({ castToNumber: true })
        const schema = z.preprocess(splitter, z.array(z.number()))
        const result = schema.parse('1,2,3')

        expect(result).toEqual([1, 2, 3])
    })

    it('trims substrings', () => {
        const splitter = stringSplitFactory()
        const schema = z.preprocess(splitter, z.array(z.string()))
        const result = schema.parse('1, 2 ,3 ')

        expect(result).toEqual(['1', '2', '3'])
    })

    it('leaves non-strings untouched', () => {
        const splitter = stringSplitFactory()
        const schema = z.preprocess(splitter, z.array(z.number()))

        expect(() => schema.parse(123)).toThrow(/Expected array, received number/)
    })
})
import toStringPreprocessor from '../src/toStringPreprocessor'
import z from 'zod'

describe('Coverting to string', () => {
    it('converts numbers to string', () => {
        const CREATE_USER_SCHEMA = z.object({
            age: z.preprocess(toStringPreprocessor, z.string().max(15)),
            salary: z.preprocess(toStringPreprocessor, z.string()),
            atomsCount: z.preprocess(toStringPreprocessor, z.string()),
        })

        const result = CREATE_USER_SCHEMA.parse({
            age: 44,
            salary: 12.34,
            atomsCount: 35n,
        })

        expect(result).toEqual({
            age: '44',
            salary: '12.34',
            atomsCount: '35',
        })
    })

    it('converts booleans to string', () => {
        const CREATE_USER_SCHEMA = z.object({
            isAdmin: z.preprocess(toStringPreprocessor, z.string()),
            isActive: z.preprocess(toStringPreprocessor, z.string()),
        })

        const result = CREATE_USER_SCHEMA.parse({
            isAdmin: false,
            isActive: true,
        })

        expect(result).toEqual({
            isAdmin: 'false',
            isActive: 'true',
        })
    })

    it('converts dates to string', () => {
        const CREATE_USER_SCHEMA = z.object({
            createdAt: z.preprocess(toStringPreprocessor, z.string()),
        })

        const result = CREATE_USER_SCHEMA.parse({
            createdAt: new Date('2022-01-01'),
        })

        expect(result).toEqual({
            createdAt: '2022-01-01T00:00:00.000Z',
        })
    })

    it('accepts string input', () => {
        const CREATE_USER_SCHEMA = z.object({
            name: z.preprocess(toStringPreprocessor, z.string()),
        })

        const result = CREATE_USER_SCHEMA.parse({
            name: 'Batman',
        })

        expect(result).toEqual({
            name: 'Batman',
        })
    })

    it('accepts undefined input', () => {
        const CREATE_USER_SCHEMA = z.object({
            name: z.preprocess(toStringPreprocessor, z.optional(z.string())),
        })

        const result = CREATE_USER_SCHEMA.parse({
            name: undefined,
        })

        expect(result).toEqual({
            name: undefined,
        })
    })

    it('failswhen parsing unsupported types', () => {
        const CREATE_USER_SCHEMA = z.object({
            name: z.preprocess(toStringPreprocessor, z.optional(z.string())),
        })

        expect(() =>
            CREATE_USER_SCHEMA.parse({
                name: /test/,
            }),
        ).toThrowError(/Expected string, received object/)
    })

    it('fails when parsing objects', () => {
        const CREATE_USER_SCHEMA = z.object({
            payload: z.preprocess(toStringPreprocessor, z.string()),
        })

        expect(() =>
            CREATE_USER_SCHEMA.parse({
                payload: { foo: 'bar' },
            }),
        ).toThrowError(/Expected string, received object/)
    })

    it('fails when parsing null', () => {
        const CREATE_USER_SCHEMA = z.object({
            payload: z.preprocess(toStringPreprocessor, z.string()),
        })

        expect(() =>
            CREATE_USER_SCHEMA.parse({
                payload: null,
            }),
        ).toThrowError(/Expected string, received null/)
    })
})

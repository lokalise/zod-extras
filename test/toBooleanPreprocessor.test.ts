import z from 'zod'

import toBooleanPreprocessor from '../src/toBooleanPreprocessor'

describe('toBooleanPreprocessor', () => {
    it('converts strings to boolean', () => {
        const SCHEMA = z.object({
            isActive: z.preprocess(toBooleanPreprocessor, z.boolean()),
            isConfirmed: z.preprocess(toBooleanPreprocessor, z.boolean()),
            isDeleted: z.preprocess(toBooleanPreprocessor, z.boolean()),
            hasRelations: z.preprocess(toBooleanPreprocessor, z.boolean()),
            somethingElse: z.preprocess(toBooleanPreprocessor, z.boolean()),
        })

        const result = SCHEMA.parse({
            isActive: 'true',
            isConfirmed: '1',
            isDeleted: 'false',
            hasRelations: '0',
            somethingElse: 'foo',
        })

        expect(result).toEqual({
            isActive: true,
            isConfirmed: true,
            isDeleted: false,
            hasRelations: false,
            somethingElse: true,
        })
    })

    it('converts numbers to boolean', () => {
        const SCHEMA = z.object({
            isActive: z.preprocess(toBooleanPreprocessor, z.boolean()),
            isConfirmed: z.preprocess(toBooleanPreprocessor, z.boolean()),
            isDeleted: z.preprocess(toBooleanPreprocessor, z.boolean()),
        })

        const result = SCHEMA.parse({
            isActive: 1,
            isConfirmed: 0,
            isDeleted: -1,
        })

        expect(result).toEqual({
            isActive: true,
            isConfirmed: false,
            isDeleted: true,
        })
    })

    it('does not convert boolean input', () => {
        const SCHEMA = z.object({
            isActive: z.preprocess(toBooleanPreprocessor, z.boolean()),
            isConfirmed: z.preprocess(toBooleanPreprocessor, z.boolean()),
        })

        const result = SCHEMA.parse({
            isActive: false,
            isConfirmed: true,
        })

        expect(result).toEqual({
            isActive: false,
            isConfirmed: true,
        })
    })

    it('does not convert object input', () => {
        const SCHEMA = z.object({
            payload: z.preprocess(toBooleanPreprocessor, z.boolean()),
        })

        expect(() =>
            SCHEMA.parse({
                payload: { foo: 'bar' },
            }),
        ).toThrow(/Expected boolean, received object/)
    })

    it('does not convert date input', () => {
        const SCHEMA = z.object({
            createdAt: z.preprocess(toBooleanPreprocessor, z.boolean()),
        })

        expect(() =>
            SCHEMA.parse({
                createdAt: new Date(),
            }),
        ).toThrow(/Expected boolean, received date/)
    })

    it('does not convert undefined input', () => {
        const SCHEMA = z.object({
            createdAt: z.preprocess(toBooleanPreprocessor, z.optional(z.boolean())),
        })

        const result = SCHEMA.parse({
            createdAt: undefined,
        })

        expect(result).toEqual({
            createdAt: undefined,
        })
    })

    it('does not convert null input', () => {
        const SCHEMA = z.object({
            createdAt: z.preprocess(toBooleanPreprocessor, z.boolean()),
        })

        expect(() =>
            SCHEMA.parse({
                createdAt: null,
            }),
        ).toThrow(/Expected boolean, received null/)
    })

    it('does not convert function input', () => {
        const SCHEMA = z.object({
            name: z.preprocess(toBooleanPreprocessor, z.boolean()),
        })

        expect(() =>
            SCHEMA.parse({
                name: (x: string) => x,
            }),
        ).toThrow(/Expected boolean, received function/)
    })
})

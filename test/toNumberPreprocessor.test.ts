import z from 'zod'

import toNumberPreprocessor from '../src/toNumberPreprocessor'

describe('toNumberPreprocessor', () => {
    it('converts strings to number', () => {
        const SCHEMA = z.object({
            age: z.preprocess(toNumberPreprocessor, z.number()),
        })

        const result = SCHEMA.parse({
            age: '44',
        })

        expect(result).toEqual({
            age: 44,
        })
    })

    it('accepts numbers input', () => {
        const SCHEMA = z.object({
            age: z.preprocess(toNumberPreprocessor, z.number()),
        })

        const result = SCHEMA.parse({
            age: 44,
        })

        expect(result).toEqual({
            age: 44,
        })
    })

    it('does not convert bigint input', () => {
        const SCHEMA = z.object({
            age: z.preprocess(toNumberPreprocessor, z.number()),
        })

        expect(() =>
            SCHEMA.parse({
                age: 44n,
            }),
        ).toThrow(/Expected number, received bigint/)
    })

    it('does not convert object input', () => {
        const SCHEMA = z.object({
            payload: z.preprocess(toNumberPreprocessor, z.number()),
        })

        expect(() =>
            SCHEMA.parse({
                payload: { foo: 'bar' },
            }),
        ).toThrow(/Expected number, received object/)
    })

    it('does not convert boolean input', () => {
        const SCHEMA = z.object({
            isActive: z.preprocess(toNumberPreprocessor, z.number()),
        })

        expect(() =>
            SCHEMA.parse({
                isActive: true,
            }),
        ).toThrow(/Expected number, received boolean/)
    })

    it('does not convert date input', () => {
        const SCHEMA = z.object({
            createdAt: z.preprocess(toNumberPreprocessor, z.number()),
        })

        expect(() =>
            SCHEMA.parse({
                createdAt: new Date(),
            }),
        ).toThrow(/Expected number, received date/)
    })

    it('does not convert undefined input', () => {
        const SCHEMA = z.object({
            createdAt: z.preprocess(toNumberPreprocessor, z.optional(z.number())),
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
            createdAt: z.preprocess(toNumberPreprocessor, z.number()),
        })

        expect(() =>
            SCHEMA.parse({
                createdAt: null,
            }),
        ).toThrow(/Expected number, received null/)
    })

    it('does not convert function input', () => {
        const SCHEMA = z.object({
            name: z.preprocess(toNumberPreprocessor, z.number()),
        })

        expect(() =>
            SCHEMA.parse({
                name: (x: string) => x,
            }),
        ).toThrow(/Expected number, received function/)
    })
})

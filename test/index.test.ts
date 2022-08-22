import {
    numberSplitFactory,
    stringSplitFactory,
    toArrayPreprocessor,
    toBooleanPreprocessor,
    toNumberPreprocessor,
    toStringPreprocessor,
} from '../index'

describe('index', () => {
    it('exposes numberSplitFactory', () => {
        expect(typeof numberSplitFactory).toBe('function')
    })

    it('exposes stringSplitFactory', () => {
        expect(typeof stringSplitFactory).toBe('function')
    })

    it('exposes toArrayPreprocessor', () => {
        expect(typeof toArrayPreprocessor).toBe('function')
    })

    it('exposes toBooleanPreprocessor', () => {
        expect(typeof toBooleanPreprocessor).toBe('function')
    })

    it('exposes toNumberPreprocessor', () => {
        expect(typeof toNumberPreprocessor).toBe('function')
    })

    it('exposes toStringPreprocessor', () => {
        expect(typeof toStringPreprocessor).toBe('function')
    })
})

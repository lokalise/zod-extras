# docs

Information of how to use `zod-extras` package.

## Preprocessors

The zod framework supports [preprocessors](https://github.com/colinhacks/zod#preprocess) which are functions that can modify input data before it's send to validation.

### Type coercion
A common usecase for preprocessors is type coercion - this package includes a few helpers for that, you can find documentation for those [here](/docs/type-coercion.md).

### String split
Another common usecase is turning a string like `"1,2,3"` into `[1, 2, 3]`, this can be done using the `stringSplitFactory` function which returns a function that can be used as a preprocessor.

```typescript
import z, { string } from 'zod'
import stringSplitFactory from 'src/stringSplitFactory'

const preprocessor = stringSplitFactory({ castToNumber: true })
const schema = z.preprocess(preprocessor, z.array(z.string()))
const result = schema.parse('1,2,3')

expect(result).toEqual([1, 2, 3])
```

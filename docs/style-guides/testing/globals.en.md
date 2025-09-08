# Globals

## Using the global namespace of the test framework is prohibited

Global namespace allows describing `describe`, `it` and others without import.

**✨ Motivation**

- Unambiguous identification of functions belonging to the package
- Possibility of gradual migration to other test frameworks

**✅ Valid**

```ts
import { describe, expect, it } from 'vitest'

describe('formatPhoneToView', () => {
  it('Mask contains +7 by default', () => {
    expect(formatPhoneToView('79309992222')).toBe('+7 930 999 22 22')
  })
})
```

**❌ Invalid**

In the example below, global namespace is used:
```ts
describe('formatPhoneToView', () => {
  it('Mask contains +7 by default', () => {
    expect(formatPhoneToView('79309992222')).toBe('+7 930 999 22 22')
  })
})
```

# Utils

## Each utility must have its own directory

**✨ Motivation**

A separate directory for each utility allows:

- Establishing an unambiguous relationship between a utility and its tests
- Decomposing and extending utilities without refactoring (adding tests, constants...)
- Moving utilities with related entities (constants, tests) to other application layers without refactoring

**✅ Valid**

```
├── utils/
|    |── format-price-to-view/
|    |    |── format-price-to-view.ts
|    |    |── constants.ts
|    |    |── enums.ts
|    |    |── format-price-to-view.test.ts
|    |    └── index.ts
|    |── format-date/
|    └── index.ts
```

**❌ Invalid**

```
├── utils/
|    |── format-price-to-view.ts
|    |── format-date.ts
|    └── index.ts
```

#### Exceptions

Private functions that are part of the implementation of an exported function can be in the same file.

```
const parseVersion = () => {}
...
export const compareVersion = () => {
    const v = parseVersion()
    ...
}
```

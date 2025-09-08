# Constants

## Constants outside block scope must be in UPPER_CASE

**✨ Motivation**

Identification of global constants.

**✅ Valid**

```tsx
// Constant outside block scope
const DEFAULT_NAME = 'Vasya'

function Info({ list }: Props) {
  // Constant inside block scope
  const isShowList = Boolean(list.length)

  return (
    <section>
      {isShowList && <List list={list} />}
      <span>{DEFAULT_NAME}</span>
    </section>
  )
}
```

```ts
// Constant outside block scope
const DEFAULT_FACTOR = 2

function calc(a: number, b: number, factor: number = DEFAULT_FACTOR) {
  // Constant inside block scope
  const summ = a + b

  return summ * factor
}
```

Constant in a separate file:

```constants.ts```

```ts
export const API_URL = 'https://domain.com'
```

**❌ Invalid**

```ts
// Constant outside block scope
const defaultFactor = 2

function calc(a: number, b: number, factor: number = defaultFactor) {
  // Constant inside block scope
  const summ = a + b

  return summ * factor
}
```

Constant in a separate file:

```constants.ts```

```ts
export const apiUrl = 'https://domain.com'
```

## Exporting constants is only allowed from the `constants` file

If a constant needs to be exported, a `constants` file must be created.

**✨ Motivation**

Allows avoiding circular dependencies.

**✅ Valid**

React-component:

```
├── info/
|    ├── header/
|    |    └── header.tsx
|    |    └── index.ts
|    ├── info.tsx
|    ├── constants.ts
|    └── index.ts
```

```info/info.tsx```

```tsx
import { DEFAULT_NAME } from './constants'
import { Header } from './header'

export function Info() {
  return (
    <section>
      <Header />
      <span>{DEFAULT_NAME}</span>
    </section>
  )
}
```

```info/header/header.tsx```

```tsx
import { DEFAULT_NAME } from '../constants'

export function Header() {
  return (
    <header>
      <span>{DEFAULT_NAME}</span>
    </header>
  )
}
```

---

Utils:

```
├── utils/
|    ├── summ/
|    ├── pow/
|    ├── constants.ts
|    └── index.ts
```

```utils/summ/summ.ts```

```ts
import { DEFAULT_FACTOR } from '../constants'

export function summ(a: number, b: number, factor: number = DEFAULT_FACTOR) {
  const summ = a + b

  return summ * factor
}
```

```utils/pow/pow.ts```

```ts
import { DEFAULT_FACTOR } from '../constants'

export function pow(value: number, exponent: number = DEFAULT_FACTOR) {
  return value ** exponent
}
```

**❌ Invalid**

```
├── info/
|    ├── header/
|    |    └── header.tsx
|    |    └── index.ts
|    ├── info.tsx
|    └── index.ts
```

```info/info.tsx```

```tsx
import { Header } from './header'

export const DEFAULT_NAME = 'Vasya'

export function Info() {
  return (
    <section>
      <Header />
      <span>{DEFAULT_NAME}</span>
    </section>
  )
}
```

```info/header/header.tsx```

```tsx
// Circular dependency with Info.tsx
import { DEFAULT_NAME } from '../info'

function Header() {
  return (
    <header>
      <span>{DEFAULT_NAME}</span>
    </header>
  )
}
```

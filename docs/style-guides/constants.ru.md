# Constants

## Константы вне блочной области видимости должны быть в UPPER_CASE

**✨ Мотивация**

Идентификация глобальной константы.

**✅ Valid**

```tsx
// Константа вне блочной области видимости
const DEFAULT_NAME = 'Вася'

function Info({ list }: Props) {
  // Константа внутри блочной области видимости
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
// Константа вне блочной области видимости
const DEFAULT_FACTOR = 2

function calc(a: number, b: number, factor: number = DEFAULT_FACTOR) {
  // Константа внутри блочной области видимости
  const summ = a + b

  return summ * factor
}
```

Константа в отдельном файле:

```constants.ts```

```ts
export const API_URL = 'https://domain.ru'
```

**❌ Invalid**

```ts
// Константа вне блочной области видимости
const defaultFactor = 2

function calc(a: number, b: number, factor: number = defaultFactor) {
  // Константа внутри блочной области видимости
  const summ = a + b

  return summ * factor
}
```

Константа в отдельном файле:

```constants.ts```

```ts
export const apiUrl = 'https://domain.ru'
```

## Экспорт констант разрешен только из файла `constants`

Если константа необходимо экспортировать, то должен быть создан файл `constants`.

**✨ Мотивация**

Позволяет избежать циклических зависимостей.

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
import { Header } from './Header'

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
import { Header } from './Header'

export const DEFAULT_NAME = 'Вася'

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
// Циклическая зависимость с Info.tsx
import { DEFAULT_NAME } from '../Info'

function Header() {
  return (
    <header>
      <span>{DEFAULT_NAME}</span>
    </header>
  )
}
```

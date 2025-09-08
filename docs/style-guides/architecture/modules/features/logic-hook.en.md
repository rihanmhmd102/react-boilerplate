# Component Logic Hook

## The component logic hook must be named `useLogic` and be located in a separate directory

**✨ Motivation**

- Allows establishing a visual connection between a react component and its logic
- Allows controlling a single entry point for component logic
- When moving a component to another directory, its logic will be moved with it

**✅ Valid**

```
├── cart/
|    ├── use-logic/
|    |    |── utils/
|    |    |── hooks/
|    |    |── use-logic.ts
|    |    |── use-logic.test.ts
|    |    |── constants.ts
|    |    |── enums.ts
|    |    |── types.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```cart/use-logic/use-logic.ts```

```ts
export function useLogic() {}
```

**❌ Invalid**

```
├── cart/
|    ├── hooks/
|    |    |── use-logic/
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```
├── cart/
|    ├── hooks/
|    |    |── use-cart/
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

## There must be only one hook in the component - `useLogic`

All other hooks must be part of the `useLogic` implementation and be located in the `useLogic/hooks` directory.

**✨ Motivation**

Allows controlling a single entry point for component logic.

**✅ Valid**

```
├── cart/
|    ├── use-logic/
|    |    |── hooks/
|    |    |    |── use-scroll-to-top/
|    |    |    |    |── use-scroll-to-top.ts
|    |    |    |    └── index.ts
|    |    |    └── index.ts
|    |    |── use-logic.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```cart/use-logic/use-logic.ts```

```ts
import { useScrollToTop } from './hooks'

export function useLogic() {
  const { scrollToTop } = useScrollToTop()

  return { scrollToTop }
}
```

**❌ Invalid**

```
├── cart/
|    |── hooks/
|    |    |── use-scroll-to-top/
|    |    |    |── use-scroll-to-top.ts
|    |    |    └── index.ts
|    |    └── index.ts
|    ├── use-logic/
|    |    |── use-logic.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

### Form hooks must be named `useLogic`

**✨ Motivation**

Form hooks are component logic.

**✅ Valid**

```
├── book-form/
|    ├── use-logic/
|    |    |── use-logic.ts
|    |    |── types.ts
|    |    |── validation.ts
|    |    └── index.ts
|    ├── book-form.tsx
|    └── index.ts
```

**❌ Invalid**

```
├── book-form/
|    ├── use-form/
|    |    |── use-form.ts
|    |    |── types.ts
|    |    |── validation.ts
|    |    └── index.ts
|    ├── book-form.tsx
|    └── index.ts
```

# Hook с логикой компонента

## Хук с логикой компонента должен иметь название `useLogic` и находится в отдельной директории

**✨ Мотивация**

- Позволяет устанавливать визуальную связь react-компонента и его логики
- Позволяет контролировать единую точку входа для логики компонента
- При переносе компонента в другую директорию вместе с ним будет перенесена и его логика

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

## В компоненте должен быть только один хук - `useLogic`

Все остальные хуки должны являться частью имплементации `useLogic` и находиться в директории `useLogic/hooks`.

**✨ Мотивация**

Позволяет контролировать единую точку входа для логики компонента.

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

### Хук для форм должен иметь название `useLogic`

**✨ Мотивация**

Хук для форм - это логика компонента.

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

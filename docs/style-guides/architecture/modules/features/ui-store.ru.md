# UIStore

Правила для stores, содержащих логику компонента.

## UIStore должен находится внутри директории компонента в отдельной директории

**✨ Мотивация**

- Позволяет устанавливать визуальную связь react-компонента и store для него
- При переносе компонента в другую директорию вместе с ним будет перенесен и store
- Позволяет переносить store со связанными сущностями в другие слои приложения без необходимости рефакторинга

**✅ Valid**

```
├── cart/
|    ├── ui-store/
|    |    |── ui-store.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

**❌ Invalid**

```
├── cart-store/
|    ├── cart-store.ts
|    └── index.ts
├── cart/
|    ├── cart.tsx
|    └── index.ts
```

```
├── cart/
|    ├── stores
|    |    ├── ui-store/
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```
├── cart/
|    ├── store.ts
|    ├── cart.tsx
|    └── index.ts
```

## UIStore и его директория должны называться `UIStore`

**✨ Мотивация**

Позволяет избежать длинных имен для stores, содержащих UI логику.

**✅ Valid**

```
├── cart/
|    ├── ui-store/
|    |    |── ui-store.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```cart/ui-store/ui-store.ts```

```ts
```ts
export class UIStore {};

export const createUIStore = () => new UIStore();
```

**❌ Invalid**

```
├── cart/
|    ├── store/
|    |    └── store.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```cart/store/store.ts```

```ts
export class Store {};
```

---

```
├── cart/
|    ├── cart-store/
|    |    └── cart-store.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```cart/cart-store/cart-store.ts```

```ts
export class CartStore {};
```

## Stores, являющиеся частью имплементации UIStore должны находится в директории UIStore

**✨ Мотивация**

Установка однозначной связи UIStore и stores, являющихся частью имплементации UIStore.

**✅ Valid**

```
├── cart/
|    ├── ui-store/
|    |    |── stores/
|    |    |    |── switch-store/
|    |    |    └── index.ts
|    |    |── ui-store.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```cart/ui-store/ui-store.ts```

```ts
import { SwitchStore } from './stores'

export class UIStore {
  constructor(private readonly switchStore: SwitchStore) {}
};
```

**❌ Invalid**

Stores являются частью имплементации `UIStore`, но при этом находятся в корне компонента:

```
├── cart/
|    |── stores/
|    |    |── switch-store/
|    |    └── index.ts
|    ├── ui-store/
|    |    |── ui-store.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```cart/ui-store/ui-store.ts```

```ts
import { SwitchStore } from '../stores'

export class Store {
  constructor(private readonly switchStore: SwitchStore) {}
};
```

## Имена методов UIStore не должны подражать неймингу обработчиков компонентов

В react-компонентах для обработчиков [используются префиксы on и handle](../../../react/logic#обработчики-с-префиксом-handle).
В UIStore эти префиксы должны использоваться только при семантической необходимости.

**✨ Мотивация**

UIStore не зависит от react-компонента.
Методы UIStore не являются обработчиками для react-компонентов.

**✅ Valid**

```
├── cart/
|    ├── ui-store/
|    |    |── ui-store.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```cart/ui-store/ui-store.ts```

```ts
import { SwitchStore } from './stores'

class UIStore {
  constructor() {}

  public deleteItem = () => {}
};

export const createUIStore = () => new UIStore()
```

```cart/cart.tsx```

```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

function DeleteItem() {
  const { deleteItem } = useLocalObservable(createUIStore)

  return (
    <Button onClick={deleteItem}>Удалить</Button>
  )
}
```

**❌ Invalid**

```
├── cart/
|    ├── ui-store/
|    |    |── ui-store.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

```cart/ui-store/ui-store.ts```

```ts
import { SwitchStore } from './stores'

class UIStore {
  constructor() {}

  // "handle" префикс в данном случае указывает на то, что это обработчик для react-компонента
  // UIStore ничего не знает о UI, поэтому префикса в данном случае быть не должно
  public handleDeleteItem = () => {}
};

export const createUIStore = () => new UIStore()
```

```cart/cart.tsx```

```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

function DeleteItem() {
  const { handleDeleteItem } = useLocalObservable(createUIStore)

  return (
    <Button onClick={handleDeleteItem}>Удалить</Button>
  )
}
```

# UIStore

Rules for stores containing component logic.

## UIStore must be located inside the component directory in a separate directory

**✨ Motivation**

- Allows establishing a visual connection between a react component and its store
- When moving a component to another directory, its store will be moved with it
- Allows moving a store with related entities to other application layers without refactoring

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

## UIStore and its directory must be named `UIStore`

**✨ Motivation**

Allows avoiding long names for stores containing UI logic.

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
export class UIStore {};

export const createUIStore = () => new UIStore()
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

## Stores that are part of the UIStore implementation must be located in the UIStore directory

**✨ Motivation**

Establishing an unambiguous relationship between UIStore and stores that are part of the UIStore implementation.

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

Stores are part of the `UIStore` implementation but are located in the component root:

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

## UIStore method names should not mimic component handler naming

In react components, [prefixes on and handle are used for handlers](../../../react/logic#handlers-with-handle-prefix).
In UIStore, these prefixes should only be used when semantically necessary.

**✨ Motivation**

UIStore does not depend on react components.
UIStore methods are not handlers for react components.

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
    <Button onClick={deleteItem}>Delete</Button>
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

  // The "handle" prefix in this case indicates that this is a handler for a react component
  // UIStore knows nothing about UI, so the prefix should not be here
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
    <Button onClick={handleDeleteItem}>Delete</Button>
  )
}
```

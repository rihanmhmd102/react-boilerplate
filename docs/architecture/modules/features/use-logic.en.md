# useLogic

`useLogic` is intended for implementing feature logic that is strongly coupled to the used react library and react features.
If logic can be implemented without using a hook, preference should be given to [UIStore](./ui-store.en.md).

```
├── payment-form/
|    ├── ui-store/
|    ├── use-logic/
|    |    |── utils/
|    |    |── hooks/
|    |    |── use-logic.ts
|    |    |── use-logic.test.ts
|    |    |── constants.ts
|    |    |── enums.ts
|    |    |── types.ts
|    |    └── index.ts
|    ├── payment-form.tsx
|    └── index.ts
```

## useLogic - single data entry point for component

If a feature has `useLogic`, only from it should data be consumed for the component.
Even if UIStore or other stores are used in the feature:

```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

function Card(props: Props) {
  const uiStore = useLocalObservable(() => createUIStore(props))

  const { fullName, isShowDescription, description } = useLogic(uiStore)

  return (
    <Wrapper>
      <Typography>{fullName}</Typography>
      {isShowDescription && <Typography>{description}</Typography>}
    </Wrapper>
  )
}
```

```ts
export function useLogic(store: UIStore) {
  const isShowDescription = useEndScroll()

  return {
    isShowDescription,
    fullName: store.fullName,
    description: store.fullName,
  }
}
```

The hook should return an abstract interface that the component works with.

Thanks to this abstraction, it becomes possible to change the logic implementation tool while keeping the output interface and UI unchanged.

## Interaction with UIStore

`useLogic` should accept `UIStore` and other stores as a parameter by reference for easier testing:

```ts
export function useLogic(store: UIStore) {
  const isShowDescription = useEndScroll()

  return {
    isShowDescription,
    fullName: store.fullName,
    description: store.fullName,
  }
}
```

### UIStore initialization

`UIStore` when using `useLogic` is initialized in the component and passed to `useLogic`:

```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

function Card(props: Props) {
  const uiStore = useLocalObservable(createUIStore)

  const { fullName, isShowDescription, description } = useLogic(uiStore)

  return (
    <Wrapper>
      <Typography>{fullName}</Typography>
      {isShowDescription && <Typography>{description}</Typography>}
    </Wrapper>
  )
}
```

### Dependencies

`UIStore` should not depend on `useLogic`:

![LogicDeps](../../../images/logic-deps.png)

Types should be imported from `UIStore` and `useLogic`.
And in turn, the component can use types from both `useLogic` and `UIStore` to form its props.

## Responsibility zone separation between UIStore and useLogic

### Store responsibility zone

- Working with data. Interaction with `data` layer
- Data formatting for display, if this data is not tied to form state changes

## When using useLogic, no logic should remain in the component except initialization

The following are moved from the component to `useLogic`:

- Binding to `mount`, `unmount`
- Creating `ref`
- Event handling

## Style guide

[Style Guide | useLogic](../../../style-guides/architecture/modules/features/logic-hook.md)

## Testing

Store and hook should be tested separately.

# Component Creation

## Each component must be located in a separate directory

**✨ Motivation**

A separate directory for each component allows:

- Seeing an unambiguous relationship between a component and related entities:
  - Utils
  - Stores
  - Hooks
  - Constants
  - Styles
  - Types
  - Nested components
  - ...
- Seeing an unambiguous relationship between a component and its tests
- Decomposing and expanding entities that are part of a component without refactoring (creating a separate directory for the component)
- Moving components with related entities to other application layers without refactoring the component

**✅ Valid**

```
├── user-info/
|    ├── header/
|    |    |── hooks/
|    |    |── utils/
|    |    |── header.tsx
|    |    └── index.ts
|    ├── user-info.tsx
|    ├── user-info.test.tsx
|    ├── constants.ts
|    ├── types.ts
|    └── index.ts
├── button/
|    ├── button.tsx
|    └── index.ts
```

## Component names and their directories must follow kebab-case

**✨ Motivation**

Standardization of component names.

**✅ Valid**

```
├── user-info/
|    ├── user-info.tsx
|    └── index.ts
├── button-group/
|    ├── button-group.tsx
|    └── index.ts
```

**❌ Invalid**

```
├── userInfo/
|    ├── userInfo.tsx
|    └── index.ts
├── buttonGroup/
|    ├── buttonGroup.tsx
|    └── index.ts
```

## Short notation is preferred for `React.Fragment`

Exception, when extended notation must be used - when a `key` prop is needed.

**✨ Motivation**

Reducing the amount of code in a component.

**✅ Valid**

```tsx
function Info() {
  return (
    <>
      <Typography>Name</Typography>
      <Typography>Surname</Typography>
    </>
  )
}
```

```tsx
export function List({ list }: Props) {
  return list.map(({ name, surname }) => {
    <Fragment key={name}>
      <Typography>Name</Typography>
      <Typography>Surname</Typography>
    </Fragment>
  })
}
```

**❌ Invalid**

```tsx
export function Info() {
  return (
    <Fragment>
      <Typography>Name</Typography>
      <Typography>Surname</Typography>
    </Fragment>
  )
}
```

## Working with constants

Unified rules are described in the [Constants](../constants) section.

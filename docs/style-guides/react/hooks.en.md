# Hooks

## All component hooks are moved to the `hooks` directory

All component hooks are moved to the `hooks` directory, with **each hook located in its own directory**.

**✨ Motivation**

A separate directory for each hook allows:

- Seeing an unambiguous relationship between a hook and related entities:
  - Utils
  - Constants
  - Types
  - ...
- Seeing an unambiguous relationship between a hook and its tests
- Decomposing and expanding entities that are part of a component without refactoring (creating a separate directory for the hook)
- Moving a hook with related entities to other application layers without refactoring

**✅ Valid**

```
├── user-info/
|    ├── hooks/
|    |    |── use-user-data/
|    |    |    |── utils/
|    |    |    |── use-user-data.ts
|    |    |    |── use-user-data.test.ts
|    |    |    |── constants.ts
|    |    |    |── types.ts
|    |    |    └── index.ts
|    |    └── index.ts
|    ├── user-info.tsx
|    └── index.ts
```

**❌ Invalid**

```
├── user-info/
|    ├── use-userdata.ts
|    ├── use-rinfo.tsx
|    └── index.ts
```

```
├── user-info/
|    ├── hooks.ts
|    ├── user-info.tsx
|    └── index.ts
```

```
├── user-info/
|    ├── hooks/
|    |    |── hooks.ts
|    |    └── index.ts
|    ├── user-info.tsx
|    └── index.ts
```

## The type of hook input parameters must have the postfix `Params`

**✨ Motivation**

Unambiguous identification of hook input parameters.

**✅ Valid**

```ts
interface UseLogicParams {
  data: unknown[]
}

function useLogic(params: UseLogicParams) {}
```

```ts
// It's acceptable to simply use "Params" if the type is not exported or there are no name collisions within the es module
interface Params {
  data: unknown[]
}

function useLogic(params: Params) {}
```

## The type of hook return value must have the postfix `Result`

**✨ Motivation**

Unambiguous identification of hook return value.

**✅ Valid**

```ts
type UseLogicResult = {
  isShow: boolean;
};

const useLogic = (params: UseLogicParams): UseLogicResult => { ... };
```

```ts
// It's acceptable to simply use "Result" if the type is not exported or there are no name collisions within the es module
type Result = {
    isShow: boolean;
};

const useLogic = (params: Params): Result => { ... };
```

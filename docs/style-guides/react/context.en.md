# React Context

## Context must be located in a separate directory

**✨ Motivation**

Grouping entities related to context

**✅ Valid**

```
├── user-context/
|    ├── user-context.ts
|    └── index.ts
```

## Context type must have the postfix `ContextProps`

**✨ Motivation**

Solving the problem of name collisions between type and context.

**✅ Valid**

```ts
import { createContext } from 'react'

export interface UserContextProps {
  isAuth: boolean
}

export const UserContext = createContext<UserContextProps>({
  isAuth: false,
})
```

**❌ Invalid**

```ts
import { createContext } from 'react'

export interface UserContextType {
  isAuth: boolean
}

export const UserContext = createContext<UserContextType>({
  isAuth: false,
})
```

## Context.Provider must be located inside the context directory in a separate directory

**✨ Motivation**

- Allows establishing an unambiguous relationship between Context and Provider
- A separate directory allows expanding Provider (adding tests, logic...)

**✅ Valid**

```
├── user-context/
|    ├── user-context-provider/
|    |    └── user-context-provider.tsx
|    |    └── user-context-provider.test.tsx
|    |    └── index.ts
|    ├── user-context.ts
|    └── index.ts
```

## Context.Provider name must contain a prefix - the context name

**✨ Motivation**

Establishing an unambiguous relationship between context and provider.

**✅ Valid**

```
├── user-context/
|    ├── user-context-provider/
|    ├── user-context.ts
|    └── index.ts
```

**❌ Invalid**

```
├── user-context/
|    ├── user-provider/
|    ├── user-context.ts
|    └── index.ts
```

## Context and Provider are exported from a single `index`

**✨ Motivation**

Single point of access to context entities.

**✅ Valid**

```
├── user-context/
|    ├── user-context-provider/
|    ├── user-context.ts
|    └── index.ts
```

```user-context/index.ts```

```ts
export * from './user-context'
export * from './user-context-provider'
```

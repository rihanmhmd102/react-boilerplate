# React Context

## Context должен находиться в отдельной директории

**✨ Мотивация**

Группировка сущностей, связанных с контекстом

**✅ Valid**

```
├── user-context/
|    ├── user-context.ts
|    └── index.ts
```

## Type контекста должен иметь постфикс `ContextProps`

**✨ Мотивация**

Решение проблемы коллизий имен типа и контекста.

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

## Context.Provider должен находиться внутри директории контекста в отдельной директории

**✨ Мотивация**

- Позволяет устанавливать однозначную связь между Context и Provider
- Отдельная директория позволяет расширять Provider (добавление тестов, логики...)

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

## Имя Context.Provider должно содержать префикс - имя контекста

**✨ Мотивация**

Установка однозначной связи контекста и провайдера.

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

## Context и Provider экспортируются из единого `index`

**✨ Мотивация**

Единая точка доступа к сущностям контекста.

**✅ Valid**

```
├── user-context/
|    ├── user-context-provider/
|    ├── user-context.ts
|    └── index.ts
```

```user-context/index.ts```

```ts
export * from './user-context-provider'
export * from './usercontext'
```

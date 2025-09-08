# Typescript

## Preference should be given to `type` over `interface`

`interface` should only be used when its use is necessary: for classes, extending `interface` of third-party libraries.

**✨ Motivation**

Homogeneity of ts-code.

**✅ Valid**

```tsx
type Props = {
  title: string;
  userName: string;
  onClick: () => void;
};

export const UserInfo = ({ title, userName, onClick }: Props) => { ... };
```

```ts
interface UseLogicParams {
  data: unknown[]
}

interface UseLogicResult {
  isShow: boolean
}

function useLogic(params: UseLogicParams): UseLogicResult {}
```

```ts
export interface UserDTO {
  data: unknown[]
}
```

```ts
interface IUserService {
  name: string;
  logout: () => void;
}

class UserService implements IUserService {
  ...
}
```

**❌ Invalid**

```tsx
interface Props {
  title: string;
  userName: string;
  onClick: () => void;
};

export const UserInfo = ({ title, userName, onClick }: Props) => { ... };
```

```ts
interface UseLogicParams {
  data: unknown[]
}

interface UseLogicResult {
  isShow: boolean
}

function useLogic(params: UseLogicParams): UseLogicResult {}
```

```ts
export interface UserDTO {
  data: unknown[]
}
```

## Generic parameter names must have the prefix `T` and a clarifying word

**✨ Motivation**

- Ability to visually distinguish generic parameters from standalone types
- Allows avoiding name conflicts
- A clarifying word helps understand the parameter's purpose

**✅ Valid**

```ts
const formatErrorToGlobal = <TError, TResultError>(error: TError): TResultError => {
  ...
}
```

**❌ Invalid**

```ts
// It's impossible to understand what the generic parameters represent from their names
const formatErrorToGlobal = <T, D>(error: T): D => {
  ...
}
```

## Enum names and their properties must be in PascalCase

**✨ Motivation**

Homogeneous naming for enums.

**✅ Valid**

```ts
enum UserType {
  NoAuth,
  Auth
}
```

**❌ Invalid**

```ts
enum userType {
  noAuth,
  auth
}
```

## Enums must be located in a separate `enums.ts` file

If there is a need to move enums to a separate file, they must be placed in the `enums.ts` file.

**✨ Motivation**

Unambiguous location of enums.

**✅ Valid**

```
├── my-service/
|    ├── constants.ts
|    ├── enums.ts
|    ├── my-service.ts
|    └── index.ts
```

**❌ Invalid**

```
├── my-service/
|    ├── constants.ts
|    ├── my-service.ts
|    └── index.ts
```

`constants.ts`

```ts
export const API_URL = 'domain.com'

export enum UserType {
  NoAuth,
  Auth
}
```

## Preference should be given to `Record` over object notation

```ts
type DataRecord = Record<string, unknown>

interface DataObject {
  [key: string]: unknown
}
```

Object notation should only be used when necessary. For example, for **Mapped Types**.

**✨ Motivation**

Using a more concise description of objects.

**✅ Valid**

```ts
type Data = Record<string, unknown>
```

Mapped Types:

```ts
type OptionsFlags<TFields> = {
  [Property in keyof TFields]: boolean;
}
```

**❌ Invalid**

```ts
interface Data {
  [key: string]: unknown
}
```

## Using `any` is prohibited

**✨ Motivation**

`any` disables typing. If `any` is used in the code, it means the code contains an error.

### When using `any`, a comment must be left: the reason for usage

**✨ Motivation**

Justifying the disabling of typing will allow understanding the problem and fixing the error in the future.

**✅ Valid**

```ts
// Theme types are incompatible but are actually identical
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTheme = (): Theme => useEmotionTheme() as any
```

**❌ Invalid**

Comment is missing:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTheme = (): Theme => useEmotionTheme() as any
```

## Using `@ts-ignore` is prohibited

`@ts-ignore` should only be used when absolutely necessary.

**✨ Motivation**

`@ts-ignore` completely disables typing.

### It is recommended to use `any` instead of `@ts-ignore`

**✨ Motivation**

`any` disables checking only for a specific type, while `@ts-ignore` disables checking for the entire code block.

**✅ Valid**

```tsx
// LegacyComponent is written in js, can't do without any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
<LegacyComponent data={data as any} onClick={handleClick} />
```

**❌ Invalid**

`@ts-ignore` will disable checking not only for `data` but also for `onClick`:

```tsx
// @ts-ignore
<LegacyComponent data={data as any} onClick={handleClick} />
```

### When using `@ts-ignore`, a comment must be left: the reason for usage

**✨ Motivation**

Justifying the disabling of typing will allow understanding the problem and fixing the error in the future.

**✅ Valid**

```tsx
// LegacyComponent is written in js and throws an error when rendering
// @ts-ignore
<LegacyComponent data={data as any} onClick={handleClick} />
```

**❌ Invalid**

```tsx
// @ts-ignore
<LegacyComponent data={data as any} onClick={handleClick} />
```

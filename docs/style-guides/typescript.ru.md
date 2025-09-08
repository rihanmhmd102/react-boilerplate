# Typescript

## Необходимо отдавать предпочтение `type` перед `interface`

`interface` необходимо использовать только в случаях, когда его использование необходимо: для классов, расширение `interface` сторонних библиотек.

**✨ Мотивация**

Однородность ts-кода.

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

## Названия параметров generic должны иметь префикс `T` и уточняющее слово

**✨ Мотивация**

- Возможность визуально отличий параметра generic от самостоятельного типа
- Позволяет избежать пересечений имен
- Уточняющее слово позволяет понять назначение параметра

**✅ Valid**

```ts
const formatErrorToGlobal = <TError, TResultError>(error: TError): TResultError => {
  ...
}
```

**❌ Invalid**

```ts
// Из названий параметров generic невозможно понять за что отвечают параметры
const formatErrorToGlobal = <T, D>(error: T): D => {
  ...
}
```

## Названия enum и его свойств должно быть в PascalCase

**✨ Мотивация**

Однородность имен для enums.

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

## Enums должны находиться в отдельном файле `enums.ts`

Если появляется необходимость выноса enums в отдельный файл, то они должны быть помещены в файл `enums.ts`.

**✨ Мотивация**

Однозначность расположения enums.

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
export const API_URL = 'domain.ru'

export enum UserType {
  NoAuth,
  Auth
}
```

## Необходимо отдавать предпочтение `Record` перед объектной нотацией

```ts
type DataRecord = Record<string, unknown>

interface DataObject {
  [key: string]: unknown
}
```

Объектную нотацию необходимо использовать только по необходимости. Например, для **Mapped Types**.

**✨ Мотивация**

Использование более краткого описания объектов.

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

## Использование `any` запрещено

**✨ Мотивация**

`any` отключает типизацию. Если в коде используется `any`, значит код содержит ошибку.

### При использовании `any` необходимо оставлять комментарий: причину использования

**✨ Мотивация**

Обоснование отключения типизации позволит понять проблему и исправить ошибку в будущем.

**✅ Valid**

```ts
// Типы тем несовместимы, но по факту идентичны
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTheme = (): Theme => useEmotionTheme() as any
```

**❌ Invalid**

Комментарий отсутствует:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTheme = (): Theme => useEmotionTheme() as any
```

## Запрещено использование `@ts-ignore`

`@ts-ignore` необходимо использовать только при крайней необходимости.

**✨ Мотивация**

`@ts-ignore` полностью отключает типизацию.

### Рекомендуется использовать `any` вместо `@ts-ignore`

**✨ Мотивация**

`any` отключает проверку только для конкретного типа, а `@ts-ignore` выключает проверку для всего блока кода.

**✅ Valid**

```tsx
// LegacyComponent написан на js, без any не обойтись
// eslint-disable-next-line @typescript-eslint/no-explicit-any
<LegacyComponent data={data as any} onClick={handleClick} />
```

**❌ Invalid**

`@ts-ignore` выключит проверку не только для `data`, но и для `onClick`:

```tsx
// @ts-ignore
<LegacyComponent data={data as any} onClick={handleClick} />
```

### При использовании `@ts-ignore` необходимо оставлять комментарий: причину использования

**✨ Мотивация**

Обоснование отключения типизации позволит понять проблему и исправить ошибку в будущем.

**✅ Valid**

```tsx
// LegacyComponent написан на js и при рендере выдает ошибку
// @ts-ignore
<LegacyComponent data={data as any} onClick={handleClick} />
```

**❌ Invalid**

```tsx
// @ts-ignore
<LegacyComponent data={data as any} onClick={handleClick} />
```

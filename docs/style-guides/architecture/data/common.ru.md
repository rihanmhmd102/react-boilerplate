# Переиспользуемые типы, enums

## Общие для всего Data слоя типы и enums выносятся в корень data слоя

**✨ Мотивация**

Возможность переиспользования общих сущностей между sources и repositories.

**✅ Valid**

```
├── data/
|    ├── repositories/
|    ├── sources/
|    ├── types.ts
|    ├── enums.ts
|    └── index.ts
```

```data/types.ts```
```ts
// Тип для пагинации, единый для всего Data и потребляемый другими слоями
export interface PaginationInputDTO {
  offset: number
  count: number
  page: number
}
```

```data/enums.ts```
```ts
// Единый enum сортировки
export enum Sort {
  Asc,
  Desc
}
```

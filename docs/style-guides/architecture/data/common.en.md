# Reusable types, enums

## Common types and enums for the entire Data layer are moved to the root of the data layer

**✨ Motivation**

Ability to reuse common entities between sources and repositories.

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
// Pagination type, unified for the entire Data layer and consumed by other layers
export interface PaginationInputDTO {
  offset: number
  count: number
  page: number
}
```

```data/enums.ts```
```ts
// Unified sorting enum
export enum Sort {
  Asc,
  Desc
}
```

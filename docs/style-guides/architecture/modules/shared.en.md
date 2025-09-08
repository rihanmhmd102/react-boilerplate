# Shared

## All software entities related to UI are placed in the `ui` directory

- `hooks`
- `icons`
- `components`

**✨ Motivation**

Explicit separation of UI from other software entities.

**✅ Valid**

```
├── shared/
|    ├── ui/
|    |    |── components/
|    |    |── hooks/
|    |    |── icons/
|    |    └── index.ts
|    └── index.ts
```

**❌ Invalid**

```
├── shared/
|    ├── components/
|    ├── hooks/
|    ├── icons/
|    └── index.ts
```

## Constants, enums, types are stored in separate directories

**✨ Motivation**

Allows expanding constants, enums, types without additional effort.

**✅ Valid**

```
├── shared/
|    ├── enums/
|    |    |── http-errors.ts
|    |    └── index.ts
|    ├── constants/
|    |    |── langs.ts
|    |    └── index.ts
|    ├── types/
|    |    |── langs.ts
|    |    └── index.ts
|    └── index.ts
```

**❌ Invalid**

```
├── shared/
|    ├── enums.ts
|    ├── constants.ts
|    ├── types.ts
|    └── index.ts
```

## Reusable code for tests is located in the `_tests` directory

**✨ Motivation**

The "_" in the directory name indicates that this code should not be used outside the test environment.

**✅ Valid**

```
├── shared/
|    ├── _tests/

|    ├── constants/
|    ├── types/
|    └── index.ts
```

**❌ Invalid**

```
├── shared/
|    ├── enums.ts
|    ├── constants.ts
|    ├── types.ts
|    └── index.ts
```

## Software entities with logic are grouped by implementation details

- Stores - `stores` directory
- JS Classes - `services` directory
- Utils - `utils` directory

**✨ Motivation**

Allows expanding stores, services, utils without additional effort.

**✅ Valid**

```
├── shared/
|    ├── utils/
|    |    |── format-date-to-iso/
|    |    └── index.ts
|    ├── stores/
|    |    |── flag-store/
|    |    └── index.ts
|    ├── services/
|    |    |── http-service/
|    |    └── index.ts
|    └── index.ts
```

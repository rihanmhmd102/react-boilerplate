# Domain

## Grouping software entities in domain

- Utils are wrapped in the `utils` directory
- Stores in the `stores` directory
- Validations in the `validations` directory
- Types are wrapped in the `types` directory when necessary
- Constants are wrapped in the `constants` directory when necessary
- Enums are wrapped in the `enums` directory when necessary

**✨ Motivation**

Grouping software entities to simplify maintenance.

**✅ Valid**

```
├── domain/
|    ├── utils/
|    ├── stores/
|    ├── validations/
|    ├── enums/
|    ├── types/
|    ├── constants/
|    └── index.ts
```

```
├── domain/
|    ├── utils/
|    ├── stores/
|    ├── validations/
|    ├── enums.ts
|    ├── types.ts
|    ├── constants.ts
|    └── index.ts
```

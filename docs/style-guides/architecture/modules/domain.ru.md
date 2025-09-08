# Domain

## Группировка программных сущностей в domain

- Utils оборачиваются в директорию `utils`
- Stores в директорию `stores`
- Validations в директорию `validations`
- Types по необходимости оборачиваются в директорию `types`
- Constants по необходимости оборачиваются в директорию `constants`
- Enums по необходимости оборачиваются в директорию `enums`

**✨ Мотивация**

Группировка программных сущностей для упрощения поддержки.

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

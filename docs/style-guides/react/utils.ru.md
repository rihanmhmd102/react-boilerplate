# Utils

## Все utils компонента выносятся в директорию `utils`

Полные правила для utils смотрите [здесь](../utils).

**✨ Мотивация**

Позволяет разграничить программные сущности компонента.

**✅ Valid**

```
├── user-info/
|    ├── utils/
|    |    |── format-price-to-view/
|    |    |    |── format-price-to-view.ts
|    |    |    └── index.ts
|    |    └── index.ts
|    ├── user-info.tsx
|    └── index.ts
```

**❌ Invalid**

```
├── user-info/
|    ├── format-price-to-view.ts
|    ├── user-info.tsx
|    └── index.ts
```

```
├── user-info/
|    ├── utils.ts
|    ├── user-info.tsx
|    └── index.ts
```

```
├── user-info/
|    ├── utils/
|    |    |── utils.ts
|    |    └── index.ts
|    ├── user-info.tsx
|    └── index.ts
```

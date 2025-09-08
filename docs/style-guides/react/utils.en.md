# Utils

## All component utils are moved to the `utils` directory

Full rules for utils can be found [here](../utils).

**✨ Motivation**

Allows separating component software entities.

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

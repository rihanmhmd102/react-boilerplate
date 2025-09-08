# Validations

## Validation must be in a separate `validation` file

- If validation is used in `useLogic`, the `validation` file must be in the `use-logic` directory
- If validation is used in `UIStore`, the `validation` file must be in the `ui-store` directory
- If validation is reused, it must be in `domain/validations/`

**✨ Motivation**

- Visual separation of responsibility zones
- Ability to quickly move validation schemas

**✅ Valid**

For `UIStore`:

```
├── cart/
|    ├── ui-store/
|    |    |── ui-store.ts
|    |    |── validation.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

For `useLogic`:

```
├── book-form/
|    ├── use-logic/
|    |    |── use-logic.ts
|    |    |── validation.ts
|    |    └── index.ts
|    ├── book-form.tsx
|    └── index.ts
|    └── types.ts
```

### A separate `types` file is created for form validation data

**✨ Motivation**

If validated data types are not moved to a separate `types` file, circular dependencies will arise between
`useLogic`, `validation`, and `UIStore`.

**✅ Valid**

```
├── book-form/
|    ├── ui-store
|    |    |── ui-store.ts
|    |    |── index.ts
|    ├── use-logic/
|    |    |── use-logic.ts
|    |    |── validation.ts
|    |    └── index.ts
|    ├── book-form.tsx
|    └── index.ts
|    └── types.ts
```

```book-form/types.ts```

```ts
export interface BookFormValues {
  name: string
}
```

## Validations in `domain/validations` should not have `validation` prefixes or postfixes

**✨ Motivation**

By the `validations` directory, the context can be understood.

**✅ Valid**

```
├── domain/
|    ├── validations/
|    |    |── user-schema/
|    |    |── validate-text-field/
|    |    └── index.ts
|    └── index.ts
```

**❌ Invalid**

```
├── domain/
|    ├── validations/
|    |    |── user-validation-schema/
|    |    |── text-field-validation-rule/
|    |    └── index.ts
|    └── index.ts
```

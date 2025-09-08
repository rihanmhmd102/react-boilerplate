# Validations

## Валидация должна находится в отдельном файле `validation`

- Если валидация используется в `useLogic`, то `validation` файл должен находится в директории `use-logic`
- Если валидация используется в `UIStore`, то `validation` файл должен находится в директории `ui-store`
- Если валидация переиспользуется, то она должна находится в `domain/validations/`

**✨ Мотивация**

- Визуальное разделение зон ответственности
- Возможность быстрого переноса схемы валидации

**✅ Valid**

Для `UIStore`:

```
├── cart/
|    ├── ui-store/
|    |    |── ui-store.ts
|    |    |── validation.ts
|    |    └── index.ts
|    ├── cart.tsx
|    └── index.ts
```

Для `useLogic`:

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

### Для формы создается отдельный файл `types` для валидируемых данных

**✨ Мотивация**

Если не вынести валидируемые типы данных в отдельный файл `types`, то возникнут циклические зависимости между
`useLogic` , `validation`, `UIStore`.

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

## Валидации в `domain/validations` не должны иметь префиксы или постфиксы `validation`

**✨ Мотивация**

По директории `validations` можно понять контекст.

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

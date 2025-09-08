# Nested Structures

This section describes the rules and recommendations for implementing nested structures: React components, hooks, classes, utils...

## Naming of nested structures should not contain parent prefixes

**✨ Motivation**

Adding prefixes to the names of nested structures leads to difficult perception of the project structure.

**✅ Valid**

```
├── user-card/
|    ├── header/
|    |    └── header.tsx
|    |    └── types.ts
|    |    └── index.ts
|    ├── user-card.tsx
|    ├── types.ts
|    └── index.ts
```

```user-card/header.tsx```

```tsx
export const Header = () => {...};
```

**❌ Invalid**

```
├── user-card/
|    ├── user-card-header/
|    |    └── user-card-header.tsx
|    |    └── types.ts
|    |    └── index.ts
|    ├── user-card.tsx
|    ├── types.ts
|    └── index.ts
```

```user-card/user-card-header/user-card-header.tsx```

```tsx
export const UserCardHeader = () => {...};
```

## Grouping is allowed

**✨ Motivation**

Grouping of nested structures may be required.
There are no restrictions on grouping.

**Examples**

```
├── doc-form/
|    ├── steps/
|    |    |── user-step/
|    |    |── doc-step/
|    ├── doc-form.tsx
|    └── index.ts
```

```
├── cart-store/
|   ├── utils/
|   |    ├── formatters/
|   |    |    |── format-price-to-view/
|   |    |    |── format-country-to-view/
|   |    |    └── index.ts
|   |    |── get-address/
|   |    └── index.ts
|   |── cart-store.ts
|   └── index.ts
```

## Recommendations

### Nesting level should not exceed 4

ℹ️ Recommendation

**✨ Motivation**

Deep nesting:

- Indicates design problems. Possibly a violation of the Single Responsibility Principle (SOLID)
- Leads to difficulties in maintaining the structure
- Leads to difficulties in perceiving the project structure

If the nesting level of the root entity's directories exceeds 4, it's worth considering refactoring.

**Example**

When analyzing the example below, one might conclude that the deep nesting is due to a violation of the Single Responsibility Principle:
```ProfileForm``` is a standalone unit that should be extracted from the ```UserForm``` component.

```
├── user-form/
|    ├── header/
|    |    ├── profile-form/
|    |    |    ├── base-fields/
|    |    |    |    |── header/
|    |    |    |    |    |── name-input/
|    |    |    |    |    |    |── name-icon/
|    |    |    |    |    |    |    |── name-icon.tsx
|    |    |    |    |    |    |    └── index.ts
|    |    |    |    |    |    |── name-input.tsx
|    |    |    |    |    |    └── index.ts
|    |    |    |    |    |── header.tsx
|    |    |    |    |    └── index.ts
|    |    |    |    |── base-fields.tsx
|    |    |    |    └── index.ts
|    |    |    ├── profile-form.tsx
|    |    |    └── index.ts
|    |    ├── header.tsx
|    |    └── index.ts
|    ├── user-form.tsx
|    └── index.ts
```

Refactored version:

```
├── user-form/
|    ├── header/
|    |    ├── header.tsx
|    |    └── index.ts
|    ├── user-form.tsx
|    └── index.ts
├── profile-form/
|    ├── base-fields/
|    |    |── header/
|    |    |    |── name-input/
|    |    |    |    |── name-icon/
|    |    |    |    |    |── name-icon.tsx
|    |    |    |    |    └── index.ts
|    |    |    |    |── name-input.tsx
|    |    |    |    └── index.ts
|    |    |    |── header.tsx
|    |    |    └── index.ts
|    |    |── base-fields.tsx
|    |    └── index.ts
|    ├── profile-form.tsx
|    └── index.ts
```

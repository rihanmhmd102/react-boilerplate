# Stores

## Each store must be located in a separate directory and have the postfix `Store`

**✨ Motivation**

A separate directory for each store allows seamless expansion of the store and establishes unambiguous relationships with its internal dependencies.

**✅ Valid**

```
├── domain/
|    ├── stores/
|    |    |── payment-store/
|    |    |    |── utils/
|    |    |    |── payment-store.ts
|    |    |    |── use-user-data.test.ts
|    |    |    |── constants.ts
|    |    |    |── types.ts
|    |    |    └── index.ts
|    |    └── index.ts
|    └── index.ts
```

```domain/stores/payment-store/payment-store.ts```

```ts
export class PaymentStore {}
```

**❌ Invalid**

```
├── domain/
|    ├── stores/
|    |    |── payment-store.ts
|    |    └── index.ts
|    └── index.ts
```

## Mobx Stores

Mobx Stores follow [unified rules for js classes](./classes).

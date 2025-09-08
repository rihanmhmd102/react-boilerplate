# Stores

## Каждый store должен находиться отдельной директории и иметь постфикс `Store`

**✨ Мотивация**

Отдельная директория для каждого store позволяет беспрепятственно расширять store и устанавливать однозначные связи с его внутренними зависимостями.

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

Mobx Stores подчиняются [единым правилам js classes](./classes).

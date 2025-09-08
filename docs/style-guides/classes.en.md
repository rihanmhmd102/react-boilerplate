# JS Classes

## Each class must have its own directory

**✨ Motivation**

A separate directory for each class allows:

- Establishing an unambiguous relationship between a class and its tests, constants, enums, utils...
- Decomposing and extending a class without refactoring (adding tests, constants, child classes...)
- Moving classes with related entities to other application layers without refactoring

**✅ Valid**

```
├── services/
|    |── file-service/
|    |    |── async-file-service/
|    |    |── utils/
|    |    |── file-service.ts
|    |    |── file-service.test.ts
|    |    |── constants.ts
|    |    |── enums.ts
|    |    └── index.ts
|    |── error-service/
|    └── index.ts
```

**❌ Invalid**

```
├── services/
|    |── file-service.ts
|    |── error-service.ts
|    └── index.ts
```

## A directory containing a class must start with a capital letter

**✨ Motivation**

Allows identifying a js class.

**✅ Valid**

```
├── services/
|    |── FileService/
|    |    |── file-service.ts
|    |    └── index.ts
|    |── ErrorService/
|    |    |── error-service.ts
|    |    └── index.ts
|    └── index.ts
```

**❌ Invalid**

```
├── services/
|    |── file-service/
|    |    |── file-service.ts
|    |    └── index.ts
|    |── error-service/
|    |    |── error-service.ts
|    |    └── index.ts
|    └── index.ts
```

```
├── services/
|    |── FileService/
|    |    |── file-service.ts
|    |    └── index.ts
|    |── ErrorService/
|    |    |── error-service.ts
|    |    └── index.ts
|    └── index.ts
```

## Initialization of constructor parameters is done using `private readonly`

**✨ Motivation**

The shortened notation allows reducing the amount of code.

**✅ Valid**

```ts
class CartService {
  constructor(private readonly paymentService: PaymentService) {}

  public pay = () => {
    this.paymentService.pay()
  }
}
```

**❌ Invalid**

```ts
class CartService {
  private readonly paymentService: PaymentService

  constructor(paymentService: PaymentService) {
    // Extra action for assignment
    this.paymentService = paymentService
  }

  public pay = () => {
    this.paymentService.pay()
  }
}
```

## Naming methods and properties

Method naming rules correspond to [unified rules for naming functions and variables](./naming/functions).

## Public methods and properties must be explicitly marked as `public`

**✨ Motivation**

Unambiguous identification of public methods and properties.

**✅ Valid**

```ts
class CartService {
  public id: string

  public pay = () => {}
}
```

**❌ Invalid**

```ts
class CartService {
  id: string

  pay = () => {}
}
```

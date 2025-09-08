# JS Classes

## Каждый класс должен иметь свою директорию

**✨ Мотивация**

Отдельная директория для каждого class позволяет:

- Установить однозначную связь class с его тестами, constants, enums, utils...
- Декомпозировать и расширять class, без необходимости рефакторинга (добавление тестов, констант, дочерних классов...)
- Переносить классы со связанными сущностями в другие слои приложения без необходимости рефакторинга

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

## Директория, содержащая class должна начинаться с заглавной буквы

**✨ Мотивация**

Позволяет идентифицировать js class.

**✅ Valid**

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
|    |── file-service/
|    |    |── file-service.ts
|    |    └── index.ts
|    |── error-service/
|    |    |── error-service.ts
|    |    └── index.ts
|    └── index.ts
```

## Инициализация параметров конструктора осуществляется с помощью `private readonly`

**✨ Мотивация**

Сокращенная нотация позволяет уменьшить количество кода.

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
    // Лишнее действие для записи
    this.paymentService = paymentService
  }

  public pay = () => {
    this.paymentService.pay()
  }
}
```

## Именование методов и свойств

Правила именование методов соответствуют [единым правилам именования функций и переменных](./naming/functions).

## Публичные методы и свойства должны быть помечены явным образом как `public`

**✨ Мотивация**

Однозначная идентификация public методов и свойств.

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

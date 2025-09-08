# Domain

## Основная концепция

`Domain` содержит:

- Чистую логику, реализующую бизнес-требования
- Логику, переиспользуемую между фичами или в других модулях
- Работу с данными, взаимодействие с `Data`
- Типы, описывающие особенности предметной области
- Константы, относящиеся к предметной области

**Если логика не связана с предметной областью проекта, то она должна быть вынесена в `shared`.**

## Структура

Пример структуры:

```
├── app/
├── screens/
├── modules/
|    └── cart/
|    |    ├── features/
|    |    └── domain/
|    |    |    ├── services/
|    |    |    ├── stores/
|    |    |    |    ├── cart-store/
|    |    |    |    └── index.ts
|    |    |    ├── utils/
|    |    |    ├── types/
|    |    |    ├── constants/
|    |    |    └── index.ts
|    |    └── index.ts
├── data/
└── shared/
```

## Мотивация

Domain слой изолирует чистую бизнес-логику от реализации фичей. Это позволяет:

- Повторно использовать бизнес-логику в разных фичах
- Упростить тестирование бизнес-логики
- Обеспечить низкую связанность между фичами
- Упростить рефакторинг бизнес-логики

## Содержание Domain слоя

### Services

Services содержат бизнес-логику, которая может быть использована в разных частях модуля. Services не зависят от UI и могут быть легко протестированы.

Пример service:

```ts
// domain/services/cart-calculator.ts
export class CartCalculator {
  public calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  public calculateDiscount(total: number, discountPercent: number): number {
    return total * (discountPercent / 100)
  }
}
```

### Stores

Stores содержат состояние и логику управления состоянием, связанную с предметной областью. Stores могут использовать services для выполнения бизнес-операций.

Пример store:

```ts
import { CartRepository } from '@data/repositories/cart-repository'
// domain/stores/cart-store/cart-store.ts
import { makeAutoObservable } from 'mobx'

import { CartCalculator } from '../services/cart-calculator'

export class CartStore {
  private items: CartItem[] = []
  private calculator: CartCalculator

  constructor(
    private readonly cartRepository: CartRepository
  ) {
    this.calculator = new CartCalculator()
    makeAutoObservable(this)
  }

  public get total(): number {
    return this.calculator.calculateTotal(this.items)
  }

  public addItem(item: CartItem) {
    this.items.push(item)
  }

  public removeItem(itemId: string) {
    this.items = this.items.filter(item => item.id !== itemId)
  }
}
```

### Utils

Utils содержат вспомогательные функции, связанные с предметной областью. Эти функции не содержат состояния и могут быть легко протестированы.

Пример util:

```ts
// domain/utils/cart-utils.ts
export function formatCartItem(item: CartItem): FormattedCartItem {
  return {
    ...item,
    formattedPrice: `${item.price} руб.`,
    totalPrice: item.price * item.quantity
  }
}
```

### Types

Types содержат интерфейсы и типы, описывающие сущности предметной области.

Пример type:

```ts
// domain/types/cart-types.ts
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export type FormattedCartItem = {
  formattedPrice: string
  totalPrice: number
} & CartItem
```

### Constants

Constants содержат константы, относящиеся к предметной области.

Пример constant:

```ts
// domain/constants/cart-constants.ts
export const CART_STORAGE_KEY = 'cart_items'
export const MAX_CART_ITEMS = 100
```

## Взаимодействие с Data слоем

Domain слой взаимодействует с Data слоем через Repositories. Это позволяет изолировать бизнес-логику от деталей реализации работы с данными.

Пример взаимодействия:

```ts
// domain/stores/cart-store/cart-store.ts
import { CartRepository } from '@data/repositories/cart-repository'

export class CartStore {
  constructor(
    private readonly cartRepository: CartRepository
  ) {}

  public async loadCart() {
    const cartData = await this.cartRepository.getCart()
    this.items = cartData.items
  }

  public async saveCart() {
    await this.cartRepository.updateCart({ items: this.items })
  }
}
```

## DI в Domain слое

Все зависимости Domain слоя должны быть инвертированы через DI. Это позволяет:

- Контролировать зависимости
- Упростить тестирование
- Снизить зацепление

Пример DI:

```ts
// domain/stores/cart-store/cart-store.ts
export class CartStore {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly cartCalculator: CartCalculator
  ) {}

  // ... реализация
}
```

## Тестирование

Domain слой должен быть покрыт unit-тестами. При тестировании следует:

- Мокать зависимости (repositories, services)
- Проверять бизнес-логику
- Проверять обработку ошибок
- Проверять граничные условия

Пример теста:

```ts
// domain/stores/cart-store/cart-store.test.ts
describe('CartStore', () => {
  it('should calculate total correctly', () => {
    const cartRepositoryMock = mock<CartRepository>()
    const cartCalculatorMock = mock<CartCalculator>({
      calculateTotal: () => 100
    })

    const store = new CartStore(cartRepositoryMock, cartCalculatorMock)

    const total = store.total

    expect(total).toBe(100)
  })
})
```

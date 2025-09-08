# Domain

## Main Concept

`Domain` contains:

- Pure logic implementing business requirements
- Logic reused between features or in other modules
- Data work, interaction with `Data`
- Types describing domain specifics
- Constants related to the domain

**If logic is not related to the project domain, it should be moved to `shared`.**

## Structure

Example structure:

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

## Motivation

The Domain layer isolates pure business logic from feature implementation. This allows:

- Reusing business logic in different features
- Simplifying business logic testing
- Ensuring low coupling between features
- Simplifying business logic refactoring

## Domain Layer Contents

### Services

Services contain business logic that can be used in different parts of the module. Services don't depend on UI and can be easily tested.

Example service:

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

Stores contain state and state management logic related to the domain. Stores can use services to perform business operations.

Example store:

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

Utils contain helper functions related to the domain. These functions don't contain state and can be easily tested.

Example util:

```ts
// domain/utils/cart-utils.ts
export function formatCartItem(item: CartItem): FormattedCartItem {
  return {
    ...item,
    formattedPrice: `${item.price} rub.`,
    totalPrice: item.price * item.quantity
  }
}
```

### Types

Types contain interfaces and types describing domain entities.

Example type:

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

Constants contain constants related to the domain.

Example constant:

```ts
// domain/constants/cart-constants.ts
export const CART_STORAGE_KEY = 'cart_items'
export const MAX_CART_ITEMS = 100
```

## Interaction with Data Layer

The Domain layer interacts with the Data layer through Repositories. This allows isolating business logic from data implementation details.

Example interaction:

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

## DI in Domain Layer

All Domain layer dependencies should be inverted through DI. This allows:

- Controlling dependencies
- Simplifying testing
- Reducing coupling

Example DI:

```ts
// domain/stores/cart-store/cart-store.ts
export class CartStore {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly cartCalculator: CartCalculator
  ) {}

  // ... implementation
}
```

## Testing

The Domain layer should be covered by unit tests. When testing, you should:

- Mock dependencies (repositories, services)
- Check business logic
- Check error handling
- Check boundary conditions

Example test:

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

# Feature Dependencies

If one feature needs to use another, their integration should be done not at the `features` level, but at the `screens` level.

This helps reduce feature coupling and increase their reusability.

## Main Concept

Features can depend on:

- Shared layer
- Data layer
- Domain of other modules
- Features of other modules

It's important to control dependencies between features and ensure that the coupling level is minimal.

## Dependency Control

### Using index files

To control dependencies between features, index files are used that provide the module's public API.

Example structure:

```
├── app/
├── screens/
├── modules/
|    ├── payment/
|    |    ├── features/
|    |    |    ├── payment-switch/
|    |    |    |    ├── payment-switch.tsx
|    |    |    |    └── index.ts
|    |    |    ├── card-payment/
|    |    |    |    ├── card-payment.tsx
|    |    |    |    └── index.ts
|    |    |    └── index.ts
|    |    └── index.ts
|    ├── cart/
|    |    ├── features/
|    |    |    ├── add-to-cart-button/
|    |    |    |    ├── add-to-cart-button.tsx
|    |    |    |    └── index.ts
|    |    |    └── index.ts
|    |    └── index.ts
├── data/
└── shared/
```

### Module Public API

Each module should provide a public API through index files.

Example index.ts for features:

```ts
export { CardPayment } from './card-payment'
// modules/payment/features/index.ts
export { PaymentSwitch } from './payment-switch'
```

Imports from a module should only go through index files:

Valid:

```ts
import { CardPayment } from '@modules/payment/features'
```

Invalid:

```ts
import { CardPayment } from '@modules/payment/features/card-payment'
```

### External files

External files are used to control incoming dependencies.

Example structure:

```
├── modules/
|    ├── payment/
|    |    ├── features/
|    |    |    ├── card-payment/
|    |    |    |    ├── card-payment.tsx
|    |    |    |    ├── external.ts
|    |    |    |    └── index.ts
|    |    |    └── index.ts
|    |    ├── external.ts
|    |    └── index.ts
```

Example external.ts:

```ts
export { UserStore } from '@modules/auth/domain'
// modules/payment/features/card-payment/external.ts
export { AddToCartButton } from '@modules/cart/features'
```

Imports from other modules should only go through external files:

Valid:

```ts
// modules/payment/features/card-payment/card-payment.tsx
import { AddToCartButton } from './external'
```

Invalid:

```ts
// modules/payment/features/card-payment/card-payment.tsx
import { AddToCartButton } from '@modules/cart/features/add-to-cart-button'
```

## Dependency Levels

### Shared layer

Features can freely use the shared layer without restrictions.

Example:

```ts
import { Button } from '@shared/ui/components/button'
import { formatDate } from '@shared/utils/format-date'
```

### Data layer

Features can use repositories from the data layer through dependency injection.

Example:

```ts
// domain/stores/cart-store.ts
import { CartRepository } from '@data/repositories/cart-repository'

export class CartStore {
  constructor(private readonly cartRepository: CartRepository) {}
}
```

### Domain of other modules

Features can use domain of other modules through external files.

Example:

```ts
// modules/payment/features/card-payment/external.ts
// modules/payment/features/card-payment/card-payment.tsx
import { UserStore } from './external'

export { UserStore } from '@modules/auth/domain'
```

### Features of other modules

Features can use features of other modules through external files.

Example:

```ts
// modules/catalog/features/catalog-card/external.ts
// modules/catalog/features/catalog-card/catalog-card.tsx
import { AddToCartButton } from './external'

export { AddToCartButton } from '@modules/cart/features'
```

## Circular Dependencies

Circular dependencies between features are not allowed. They lead to:

- Architecture complication
- Increased coupling
- Testing difficulties
- Build problems

To avoid circular dependencies:

1. Use external dependencies through external files
2. Move common logic to domain layer
3. Break large features into smaller components
4. Monitor module architecture

## Testing Dependencies

When testing features, dependencies must be mocked:

```ts
// card-payment.test.tsx
import { mock } from 'jest-mock-extended'

import { AddToCartButton } from './external'

jest.mock('./external', () => ({
  AddToCartButton: mock(),
}))
```

## Best Practices

1. Minimize the number of dependencies
2. Use "Dependency Inversion" principle
3. Control public API through index files
4. Use external files for external dependencies
5. Avoid circular dependencies
6. Test dependencies through mocks

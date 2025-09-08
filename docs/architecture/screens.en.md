# Screens

## Main Concept

`Screens` are application screens.

Screens are assembled from `features` of different modules. This is also where `features` integration happens.

Screens are used in `Application` routing to bind to application routes and interact with routing environment (for example, query params).

Example structure:

```
├── app/
├── screens/
|    ├── feedback/
|    ├── no-access/
|    ├── not-found/
|    ├── popular-goods/
|    ├── new-goods/
|    |    ├── new-goods.tsx
|    |    ├── store/
|    |    └── index.ts
|    └── index.ts
├── modules/
├── data/
└── shared/
```

## Motivation

Screens allow dividing application logic into independent parts, each responsible for a separate screen or page. This simplifies development, testing, and code maintenance.

## Features Integration

Screens are assembled from `features` of different modules. This is also where `features` integration happens.

For example, a checkout screen might use features from modules:

- `cart` - to display goods in the cart
- `payment` - to select payment method
- `delivery` - to select delivery method
- `user` - to display user information

## Working with Routing

Screens are used in `Application` routing to bind to application routes and interact with routing environment (for example, query params).

Example usage in routing:

```tsx
import type { RouteObject } from 'react-router'

import { routes } from '@/shared/constants/routes'

export const cartPageRoute: RouteObject = {
  path: routes.cart.path,
  lazy: async () => {
    const Component = await import('./cart-page.tsx').then(module => module.default)
    return { Component }
  },
}
```

## Testing

Screens are tested as an integration layer that combines multiple features. When testing screens, it's necessary to check:

- Correct features integration
- Parameter passing between features
- Error handling when interacting between features

When testing screens, it's recommended to use mocks for features to isolate the component being tested.

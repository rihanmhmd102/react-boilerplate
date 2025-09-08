# Import/Export ES Modules

## Named exports should be preferred

Default export is only used when technically necessary (for example, **react lazy**).

**✨ Motivation**

Default exports force additional naming costs on every import.

**✅ Valid**

```ts
export const Header = () => {...};

export class CartStore {
  ...
};

export const API_URLS = { ... }
```

```ts
import { API_URLS } from './constants'
import { Header } from './header'
import { CartStore } from './store'
```

**❌ Invalid**

```ts
export default = () => {...};
```

```ts
class CartStore {
  ...
};

export default CartStore;
```

```ts
export default {
  main: '/main'
}
```

```ts
import API_URLS from './constants'
import Header from './header'
import CartStore from './store'
```

## `Export` is specified directly for the exported entity

**✨ Motivation**

Reduces the amount of additional code that doesn't carry semantic value.

**✅ Valid**

```ts
export const API_URL = {}

export class CartStore {};

export function UserCard() {}
```

**❌ Invalid**

```ts
const API_URL = {}

class CartStore {};

function UserCard() {}

export {
  API_URL,
  CartStore,
  UserCard
}
```

## Import from directories is done through the `index` file

**✨ Motivation**

Import through `index` files allows achieving a good level of module encapsulation and controlling the public interface.
Everything exported from the `index` file is a public entity that can be interacted with from outside.
Everything not exported from the `index` file is a private entity that cannot be interacted with from outside.

**✅ Valid**

```
├── features/
|    ├── user-card/
|    ├── profile/
|    └── index.ts
```

```features/index.ts```

```ts
export { Profile } from './profile'
export { UserCard, type UserCardProps } from './user-card'
```

```ts
import { UserCard } from './features';

...
```

---

```
├── user-service/
|    ├── utils/
|    ├── constants.ts
|    ├── enums.ts
|    ├── types.ts
|    ├── user-service.ts
|    ├── user-service.test.ts
|    └── index.ts
```

```user-service/index.ts```

```ts
export { type UserInfo } from './types'
export { UserService } from './user-service'
```

```ts
import { type UserInfo } from './user-service';

...
```

**❌ Invalid**

Missing `index.ts`

```
├── user-service/
|    ├── utils/
|    ├── constants.ts
|    ├── enums.ts
|    ├── types.ts
|    ├── user-service.ts
|    └── user-service.test.ts
```

---

Import "digs into" the internal structure of the module

```ts
import { UserCard } from './features/user-card/user-card';
import { type UserInfo } from './user-service/types';

...
```

## Imports without specifying a target es module are prohibited

Example:

```ts
import { UserService } from '../'
```

**✨ Motivation**

Imports without a target module create circular dependencies.

**✅ Valid**

```
├── cart-service/
├── user-service/
└── index.ts
```

```index.ts```

```ts
export * from './cart-service'
export * from './user-service'
```

```cart-service/cart-service.ts```

```ts
import { UserService } from '../user-service'

class CartService {
  constructor(private readonly userService: UserService) {}
}
```

**❌ Invalid**

```
├── cart-service/
├── user-service/
└── index.ts
```

```index.ts```

```ts
export * from './cart-service'
export * from './user-service'
```

```cart-service/cart-service.ts```

```ts
// Because the import goes through the index.ts file, a circular dependency may occur
import { UserService } from '../'

class CartService {
  constructor(private readonly userService: UserService) {}
}
```

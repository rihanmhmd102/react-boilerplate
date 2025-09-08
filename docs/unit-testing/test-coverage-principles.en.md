# Test Coverage Principles

# Private methods and properties are not covered by tests

Only public methods and properties should be tested and checked in tests.

**Example of private "methods" in the context of es module:**

```tsx
// private function. Not tested
const addMask = (phone: string): string => {
    ...
};

// private function. Not tested
const removeFirstNumber = (phone: string): string => {
    ...
};

export const formatPhoneToView = (phone?: string) =>
  addMask(removeFirstNumber(phone));
```

---

# Software entities that are part of the SUT implementation are not covered by tests

In the question "what exactly to test", the Unit Testing Guide leans towards the "classical school" of testing.

In the example below, tests should only be written for the public top-level service `CartStore`. Software entities that are part of the implementation (`formatItemToView`, `CartManager`) should not be tested.

Testing the top-level service will be the most stable and will best protect against bugs.

```jsx
├── cart-store/
|    ├── cart-store.ts
|    ├── cart-store.test.ts
|    ├── utils
|    |    ├── format-item-to-view
|    |    |    ├── format-item-to-view.ts
|    |    |    └── index.ts
|    |    └── index.ts
|    ├── services
|    |    ├── cart-manager
|    |    |    ├── cart-manager.ts
|    |    |    └── index.ts
|    |    └── index.ts
|    └── index.ts
```

---

# Avoid useless tests

A test shouldn't be written if the tested method | entity | property doesn't participate in implementing business requirements or performs too simple an action without containing logic.

For example, in `CartStore` there's no need to write tests for getters `count` and `goods`.

```tsx
export class CartStore {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly notifyService: typeof notify,
  ) {
    makeAutoObservable(this)
  }

  private get goodsQuery() {
    return this.cartRepository.getGoodsQuery()
  }

  private get goodsCountQuery() {
    return this.cartRepository.getGoodsCountQuery()
  }

  public get count() {
    return this.goodsCountQuery.data
  }

  public get goods() {
    return this.goodsQuery.data || []
  }
}
```

---

# Found a bug - write a test

If a bug was found in the system at any testing stage, then a test for the corresponding case must be written to prevent the bug from reappearing.

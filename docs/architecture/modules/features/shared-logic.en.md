# Reusing Logic Between Features

Logic should be moved to `Domain` if the logic implemented inside a feature needs to be:

- Reused in another feature
- Reused in another module
- Used for integration with another feature

### When to use

The Domain layer is used for business logic related to the domain:

- Calculations specific to the domain
- Business rules validation
- Domain data transformation
- Logic for working with domain entities

### Examples

```ts
// modules/cart/domain/services/cart-calculator.ts
export class CartCalculator {
  public calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  public calculateDiscount(total: number, discountPercent: number): number {
    return total * (discountPercent / 100)
  }
}
```

[Detailed Domain Overview](../domain)

# Variables, Parameters, Properties

## Boolean variables must have a prefix indicating their Boolean nature

The rule applies to variables, parameters, and properties.

**✨ Motivation**

Identification of boolean variables, properties, and parameters by name.

**✅ Valid**

```ts
const isShow = Boolean(user.id)
const wasRemoved = !user
const hasID = Boolean(user.id)
```

```ts
function calcSum(product: Product, hasDiscount: boolean) {}
```

```ts
interface Props {
  isOpen: boolean
  isShow: boolean
  wasRemoved: boolean
  hasState: boolean
}
```

```ts
class Product {
  hasDiscount: boolean = false

  get isEmpty() {}
}
```

**❌ Invalid**

```ts
function calcSum(product: Product, discountIsPresent: boolean) {}
```

```ts
interface Props {
  open: boolean
  show: boolean
  removed: boolean
  stateIsPresent: boolean
}
```

```ts
class Product {
  discountIsPresent: boolean = false

  get empty() {}
}
```

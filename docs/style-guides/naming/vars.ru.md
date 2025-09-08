# Переменные, параметры, свойства

## Boolean переменные должны иметь префикс, указывающий на принадлежность к Boolean

Правило распространяется на переменные, параметры, свойства.

**✨ Мотивация**

Идентификация boolean переменных, свойств и параметров по названию.

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

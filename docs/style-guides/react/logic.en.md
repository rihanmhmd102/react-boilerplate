# Logic in Components

## Handlers with the `handle` prefix

**✨ Motivation**

Identification of react handlers.

**✅ Valid**

```tsx
function Cart({ list, onSetSum }: Props) {
  // calcSum - not a handler, so no prefix is needed
  const { calcSum } = useLogic()

  const handleClickPay = () => {
    onSetSum(calcSum(list))
  }

  return (
    <section>
      <Button onClick={handleClickPay}>Pay</Button>
    </section>
  )
}
```

**❌ Invalid**

```tsx
function Cart({ list, onSetSum }: Props) {
  // handleCalcSum is not a handler, so no prefix should be used
  const { handleCalcSum } = useLogic()

  // Handler not in the correct format
  const clickPayHandler = () => {
    onSetSum(handleCalcSum(list))
  }

  return (
    <section>
      <Button onClick={clickPayHandler}>Pay</Button>
    </section>
  )
}
```

## Long conditions in `jsx` markup are prohibited

**✨ Motivation**

Long conditions complicate the perception of `jsx` components.

**❌ Invalid**

```tsx
function Cart({ list, isSuccess, userName, onPay }: Props) {
  return (
    <section>
      {(Boolean(list.length) && isSuccess)
        || (userName.startsWith('Vasya') && (
          <Button onClick={onPay}>Pay</Button>
        ))}
    </section>
  )
}
```

**✅ Valid**

```tsx
function Cart({ list, isSuccess, userName, onPay }: Props) {
  const isVasya = userName.startsWith('Vasya')
  const isShowPayButton = (Boolean(list.length) && isSuccess) || isVasya

  return (
    <section>
      {isShowPayButton && <Button onClick={onPay}>Pay</Button>}
    </section>
  )
}
```

## Logic in loops inside `jsx` markup is prohibited

Logic in loops must be moved to a separate component or to the component function body.

**✨ Motivation**

Simplifying the perception and maintenance of `jsx` components.

**❌ Invalid**

```tsx
function MainPage({ list }: Props) {
  return (
    <section>
      <Header />
      <Filters />
      <ul>
        {list.map((item) => {
          // Perception and maintenance complexity will increase as component logic grows
          const price = formatPriceToView(item.price)
          const nickName = [item.name, item.surname].join(' ')

          return (
            <li>
              <Typography>{price}</Typography>
              <Typography>{nickName}</Typography>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
```

**✅ Valid**

```tsx
function ListItem({ itemInfo }: ListItemProps) {
  const price = formatPriceToView(item.price)
  const nickName = [item.name, item.surname].join(' ')

  return (
    <li>
      <Typography>{price}</Typography>
      <Typography>{nickName}</Typography>
    </li>
  )
}

function MainPage({ list }: MainPageProps) {
  return (
    <section>
      <Header />
      <Filters />
      <ul>
        {list.map(item => (
          <ListItem itemInfo={item} />
        ))}
      </ul>
    </section>
  )
}
```

## Handler implementation in `jsx` is prohibited

**✨ Motivation**

Moving handlers out of jsx allows keeping all component logic in one place.

**✅ Valid**

```tsx
function Cart({ list, onRemoveProduct }: Props) {
  const handleRemoveProduct = (id: string) => () => {
    onRemoveProduct(id)
  }

  return (
    <div>
      <ul>
        {list.map(({ id }) => (
          <li>
            <Button onClick={handleRemoveProduct(id)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

**❌ Invalid**

```tsx
function Cart({ list, onRemoveProduct }: Props) {
  return (
    <div>
      <ul>
        {list.map(({ id }) => (
          <li>
            <Button onClick={() => onRemoveProduct(id)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Direct handler passing to components is allowed

**✅ Valid**

```tsx
function Cart({ onPay }: Props) {
  return (
    <div>
      <Button onClick={onPay}>Pay</Button>
    </div>
  )
}
```

**❌ Invalid**

```tsx
function Cart({ onPay }: Props) {
  // Extra code that does nothing:
  const handlePay = () => {
    onPay()
  }

  return (
    <div>
      <Button onClick={handlePay}>Pay</Button>
    </div>
  )
}
```

## Nested ternary operators in `jsx` are prohibited

Rules correspond to [unified rules for ternary operators](../conditional-statements#nested-ternary-operators-are-prohibited).

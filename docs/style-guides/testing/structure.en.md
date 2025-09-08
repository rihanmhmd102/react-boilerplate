# Test Structure

## Assertions use it

**✨ Motivation**

Test homogeneity.

**✅ Valid**

```ts
describe('formatPhoneToView', () => {
  it('Mask contains +7 by default')

  it('Mask adds 8 when isStartWithPlus=false')
})
```

**❌ Invalid**

```ts
describe('formatPhoneToView', () => {
  test('Mask contains +7 by default')

  test('Mask adds 8 when isStartWithPlus=false')
})
```

## One level of `describe` nesting is allowed

**✨ Motivation**

Allows avoiding complications in reading tests with deep nesting.

**✅ Valid**

```ts
describe('CartRepository', () => {
  describe('Total item counter', () => {
    it('Increases when adding items before successful request completion')

    it('Reverts to original when item addition request fails')

    it('Decreases when removing items before successful request completion')

    it('Reverts to original when item removal request fails')
  })
})
```

**❌ Invalid**

```ts
describe('CartRepository', () => {
  describe('Total item counter', () => {
    describe('When adding items', () => {
      it('Increases before successful request completion')
      it('Reverts to original when request fails')
    })

    describe('When removing items', () => {
      it('Decreases before successful request completion')
      it('Reverts to original when request fails')
    })
  })
})
```

## The tested entity is marked as SUT in tests

SUT - system under test.

**✨ Motivation**

Allows visually highlighting the tested entity in tests.

**✅ Valid**

```ts
describe('CreateBookScreenStore', () => {
  it('Successful book creation shows success notification', async () => {
    const notifyMock = mock<typeof notify>()
    const fakeBookFormValues = makeFakeBookFormValues({ name: 'Clean Code' })
    const sut = new CreateBookScreenStore(notifyMock)

    await sut.createBook(fakeBookFormValues)

    expect(notifyMock.success).toBeCalledWith('Clean Code successfully created')
  })
})
```

**❌ Invalid**

```ts
describe('CreateBookScreenStore', () => {
  it('Successful book creation shows success notification', async () => {
    const notifyMock = mock<typeof notify>()
    const fakeBookFormValues = makeFakeBookFormValues({ name: 'Clean Code' })
    const bookScreenStore = new CreateBookScreenStore(notifyMock)

    await bookScreenStore.createBook(fakeBookFormValues)

    expect(notifyMock.success).toBeCalledWith('Clean Code successfully created')
  })
})
```

### Function execution result is not SUT

**❌ Invalid**

```ts
describe('formatPriceToView', () => {
  it('Adds postfix to result string', () => {
    const sut = formatPriceToView(100)

    expect(sut).toBe('100 rub.')
  })
})
```

**✅ Valid**

```ts
describe('formatPriceToView', () => {
  it('Adds postfix to result string', () => {
    const result = formatPriceToView(100)

    expect(result).toBe('100 rub.')
  })
})
```

## Test structure should follow AAA (Arrange-Act-Assert)

- AAA sequence must be maintained
- Comments for each AAA block are not needed
- Indents between AAA blocks are optional

**✨ Motivation**

Allows standardizing test structures.

**✅ Valid**

```ts
it('Item list and counter reset after reset', () => {
  const cartSourcesStub = mock<CartNetworkSources>()
  const sut = new CartRepository(cartSourcesStub, createCacheService())
  const goodsCountQuery = sut.getGoodsCountQuery()
  const goodsQuery = sut.getGoodsQuery()

  sut.resetCartCache()
  expect(goodsCountQuery.data).toBe(0)
  expect(goodsQuery.data).toEqual([])
})
```

```tsx
it('OnChange is called without passed isExpanded', async () => {
  const onChangeSpy = vi.fn()

  renderWithTheme(
    <Accordion
      summary="Test"
      startAdorment={<InfoFillMd color="info" />}
      onChange={onChangeSpy}
    >
      <Typography>Content</Typography>
    </Accordion>,
  )

  const title = screen.getByRole('button', { name: 'Test' })

  await userEvents.click(title)
  expect(onChangeSpy).toHaveBeenCalled()
})
```

**❌ Invalid**

Comments for AAA blocks are not needed.

```ts
it('Item list and counter reset after reset', () => {
  // Arrange
  const cartSourcesStub = mock<CartNetworkSources>()
  const sut = new CartRepository(cartSourcesStub, createCacheService())
  const goodsCountQuery = sut.getGoodsCountQuery()
  const goodsQuery = sut.getGoodsQuery()

  // Act
  sut.resetCartCache()

  // Assert
  expect(goodsCountQuery.data).toBe(0)
  expect(goodsQuery.data).toEqual([])
})
```

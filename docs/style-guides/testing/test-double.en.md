# Test Double

## Mocks and stubs have the postfix mock

**✨ Motivation**

Using the same designation for mocks and stubs simplifies test implementation.
There's no need to think about differences when implementing tests.

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

In the example below, cartSourcesMock is a stub, but for simplicity, the mock postfix should be used.

```ts
describe('CartRepository', () => {
  it('Item list and counter reset after reset', () => {
    const cartSourcesMock = mock<CartNetworkSources>()

    const sut = new CartRepository(cartSourcesMock, createCacheService())
    const goodsCountQuery = sut.getGoodsCountQuery()
    const goodsQuery = sut.getGoodsQuery()

    sut.resetCartCache()
    expect(goodsCountQuery.data).toBe(0)
    expect(goodsQuery.data).toEqual([])
  })
})
```

## Spies have the postfix `spy`

**✨ Motivation**

Allows distinguishing spies from simple functions and other test doubles.

**✅ Valid**

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

```tsx
it('OnChange is called without passed isExpanded', async () => {
  const onChange = vi.fn()

  renderWithTheme(
    <Accordion
      summary="Test"
      startAdorment={<InfoFillMd color="info" />}
      onChange={onChange}
    >
      <Typography>Content</Typography>
    </Accordion>,
  )

  const title = screen.getByRole('button', { name: 'Test' })

  await userEvents.click(title)
  expect(onChange).toHaveBeenCalled()
})
```

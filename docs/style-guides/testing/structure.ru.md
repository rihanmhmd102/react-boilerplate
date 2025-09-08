# Структура тестов

## Для утверждений используется it

**✨ Мотивация**

Однородность тестов.

**✅ Valid**

```ts
describe('formatPhoneToView', () => {
  it('Маска содержит по-умолчанию +7')

  it('В маску добавляется 8 при isStartWithPlus=false')
})
```

**❌ Invalid**

```ts
describe('formatPhoneToView', () => {
  test('Маска содержит по-умолчанию +7')

  test('В маску добавляется 8 при isStartWithPlus=false')
})
```

## Допустим первый уровень вложенности `describe`

**✨ Мотивация**

Позволяет исключить усложнения чтения тестов при большой вложенности.

**✅ Valid**

```ts
describe('CartRepository', () => {
  describe('Общий счетчик товаров', () => {
    it('Увеличивается при добавлении товаров до успешного выполнения запроса')

    it('Откатывается в исходное при ошибке запроса на добавления товаров в корзину')

    it('Уменьшается при удалении товаров до успешного выполнения запроса')

    it('Откатывается в исходное при ошибке запроса на удаление товаров из корзины')
  })
})
```

**❌ Invalid**

```ts
describe('CartRepository', () => {
  describe('Общий счетчик товаров', () => {
    describe('При добавлении товаров', () => {
      it('Увеличивается до успешного выполнения запроса')
      it('Откатывается в исходное при ошибке запроса')
    })

    describe('При удалении товаров', () => {
      it('Уменьшается до успешного выполнения запроса')
      it('Откатывается в исходное при ошибке запроса')
    })
  })
})
```

## Тестируемая сущность помечается в тестах как SUT

SUT - system under test.

**✨ Мотивация**

Позволяет визуально в тесте выделять тестируемую сущность.

**✅ Valid**

```ts
describe('CreateBookScreenStore', () => {
  it('Успешное создание книги показывает уведомление об успешности', async () => {
    const notifyMock = mock<typeof notify>()
    const fakeBookFormValues = makeFakeBookFormValues({ name: 'Чистый код' })
    const sut = new CreateBookScreenStore(notifyMock)

    await sut.createBook(fakeBookFormValues)

    expect(notifyMock.success).toBeCalledWith('Чистый код успешно создана')
  })
})
```

**❌ Invalid**

```ts
describe('CreateBookScreenStore', () => {
  it('Успешное создание книги показывает уведомление об успешности', async () => {
    const notifyMock = mock<typeof notify>()
    const fakeBookFormValues = makeFakeBookFormValues({ name: 'Чистый код' })
    const bookScreenStore = new CreateBookScreenStore(notifyMock)

    await bookScreenStore.createBook(fakeBookFormValues)

    expect(notifyMock.success).toBeCalledWith('Чистый код успешно создана')
  })
})
```

### Результат выполнения функции не является SUT

**❌ Invalid**

```ts
describe('formatPriceToView', () => {
  it('В результирующую строку добавляется постфикс', () => {
    const sut = formatPriceToView(100)

    expect(sut).toBe('100 руб.')
  })
})
```

**✅ Valid**

```ts
describe('formatPriceToView', () => {
  it('В результирующую строку добавляется постфикс', () => {
    const result = formatPriceToView(100)

    expect(result).toBe('100 руб.')
  })
})
```

## Структура теста должны соответствовать AAA (Arrange-Act-Assert)

- Последовательность AAA должна соблюдаться
- Комментарии для каждого блока AAA делать не надо
- Отступы между блоками AAA - не обязательное условие

**✨ Мотивация**

Позволяет стандартизировать структуры тестов.

**✅ Valid**

```ts
it('Список товаров и счетчик сбрасывается после ресета', () => {
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
it('OnChange Вызывается без переданного isExpanded', async () => {
  const onChangeSpy = vi.fn()

  renderWithTheme(
    <Accordion
      summary="Тест"
      startAdorment={<InfoFillMd color="info" />}
      onChange={onChangeSpy}
    >
      <Typography>Контент</Typography>
    </Accordion>,
  )

  const title = screen.getByRole('button', { name: 'Тест' })

  await userEvents.click(title)
  expect(onChangeSpy).toHaveBeenCalled()
})
```

**❌ Invalid**

Оставлять комментарии для блоков AAA не нужно.

```ts
it('Список товаров и счетчик сбрасывается после ресета', () => {
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

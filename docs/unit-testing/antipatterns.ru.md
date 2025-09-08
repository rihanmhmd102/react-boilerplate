# Антипаттерны тестирования

## Проверка разных результатов в одном тест-кейсе (множественный блок `assert` из AAA)

Каждый тест-кейс должен проверять свой конкретный результат и сценарий.

Стоит избегать проверки нескольких сценарий и результатов в одном тест-кейсе.

Если необходимо проверить промежуточные результаты выполнения, то для каждой проверки должен быть реализован свой тест-кейс.

Использование данного антипаттерна:

- Приводит к плохой обратной связи теста: становится сложно понять где конкретно произошла ошибка
- Ухудшает поддержку

Invalid

```tsx
describe('Query', () => {
  describe('При возникновении ошибки', () => {
    it('Вызывается onError', async () => {
      const onError = vi.fn()
      const sut = new Query(() => Promise.reject('foo'), {
        dataStorage: getDataStorage(),
      })

      sut.sync({ onError })
      await when(() => !sut.isLoading)

      expect(sut.data).toBe(undefined)
      expect(sut.isError).toBe(true)

      await when(() => sut.error !== undefined)

      expect(sut.error).toBe('foo')
      expect(onError).toBeCalledWith('foo')
    })
  })
})
```

Valid

```tsx
describe('Query', () => {
  describe('При возникновении ошибки', () => {
    const setupErrorQuery = async (onError: OnError = vi.fn(), errorMessage: string = 'foo') => {
      const sut = new Query(() => Promise.reject(errorMessage), {
        dataStorage: getDataStorage(),
      })

      sut.sync({ onError })
      await when(() => store.isError)

      return { sut }
    }

    it('onError вызывается с сообщение ошибки', async () => {
      const onError = vi.fn()
      await setupErrorQuery(onError, 'foo')

      expect(onError).toBeCalledWith('foo')
    })

    it('Статусные флаги устанавливаются в error state', async () => {
      const { sut } = await setupErrorQuery()

      expect(sut.isError).toBeTruthy()
      expect(sut.isLoading).toBeFalsy()
      expect(sut.isSuccess).toBeFalsy()
    })

    it('Data сбрасывается', async () => {
      const { sut } = await setupErrorQuery()

      expect(sut.data).toBe(undefined)
    })
  })
})
```

---

## Утечка деталей имплементации SUT в тест

Необходимо следить за тем, чтобы в тестах не дублировалась логика, реализуемая в SUT.

**Пример с конкатенацией строк**

```tsx
export function formatPriceToView(price: number): string {
  return price ? `${price.toLocaleString('ru')} руб.` : 'Бесплатно'
}
```

**Invalid**

В тесте для проверки результата дублируется логика SUT.

```tsx
describe('formatPriceToView', () => {
  it.each([[1000], [10000], [100000], [1000000]])(
    'Для "%s" добавляется неразрывный пробел в числах',
    (input) => {
      const result = formatPriceToView(input);

      expect(result).toBe(`${input.toLocaleString('ru')} руб.`);
    },
  );
};
```

**Valid**

В тесте руками указывается ожидаемый результат.

```tsx
describe('formatPriceToView', () => {
  it.each([
      [1000, '1 000 руб.'],
      [10000, '10 000 руб.'],
      [100000, '100 000 руб.'],
      [1000000, '1 000 000 руб.'],
  ])('Для "%s" добавляется неразрывный пробел в числах', (input, output) => {
    const result = formatPriceToView(input);

    expect(result).toBe(output);
  });
};
```

**Пример с проверкой выходного объекта**

```tsx
function formatBookItemToView(book: BookRepositoryDTO.BookListItemDTO) {
  return {
    ...book,
    price: formatPriceToView(book.price),
  }
}
```

**Invalid**

`Spread` является частью логики SUT, поэтому использовать его при проверке результата не рекомендуется.

```tsx
describe('formatBookItem', () => {
  it('Данные книги отдаются в формате для отображения', () => {
    const fakeBookItem = bookRepositoryFaker.makeBookItem({ price: 1000 })

    const result = formatBookItemToView(fakeBookItem)

    expect(result).toEqual({
      ...fakeBookItem,
      price: '1 000 руб.',
    })
  })
})
```

**Valid**

Необходимо руками однозначно проверять ожидаемый результат.

```tsx
describe('formatBookItem', () => {
  it('Данные книги отдаются в формате для отображения', () => {
    const fakeBookItem = bookRepositoryFaker.makeBookItem({ price: 1000 })

    const result = formatBookItemToView(fakeBookItem)

    expect(result).toEqual({
      id: fakeBookItem.id,
      name: fakeBookItem.name,
      price: '1 000 руб.',
    })
  })
})
```

---

## Использование единого Arrange этапа для всех it в describe

Для каждого `it` в `describe` необходимо вызывать уникальный **Arrange** этап. Рекомендуется выносить переиспользуемый Arrange этап в функцию, которая будет вызываться по отдельности для каждого теста.

**Valid**

В примере ниже `setupSuccessCreation` вызывается для каждого it по отдельности:

```tsx
describe('CreateBookScreenStore', () => {
  const setupSuccessCreation = () => {
    const routerMock = createRouterMock()
    const notifyMock = mock<typeof notify>()
    const sut = new CreateBookScreenStore(routerMock, notifyMock)

    return { sut, notifyMock, routerMock }
  }

  describe('Успешное создание книги', () => {
    it('Показывает уведомление об успешности', async () => {
      const fakeBookFormValues = makeFakeBookFormValues({ name: 'Чистый код' })
      const { sut, notifyMock } = setupSuccessCreation()

      await sut.createBook(fakeBookFormValues)
      expect(notifyMock.success).toBeCalledWith('Чистый код успешно создана')
    })

    it('Редиректит на страницу списка книг', async () => {
      const fakeBookFormValues = makeFakeBookFormValues()
      const { sut, routerMock } = setupSuccessCreation()

      await sut.createBook(fakeBookFormValues)

      expect(routerMock).toMatchObject({
        pathname: APP_ROUTES.books.getRedirectPath(),
      })
    })
  })
})
```

**Invalid**

В примере ниже сделан единый **Arrange** этап для всех it:

```tsx
describe('CreateBookScreenStore', () => {
  const routerMock = createRouterMock()
  const notifyMock = mock<typeof notify>()
  const sut = new CreateBookScreenStore(routerMock, notifyMock)

  describe('Успешное создание книги', () => {
    it('Показывает уведомление об успешности', async () => {
      const fakeBookFormValues = makeFakeBookFormValues({ name: 'Чистый код' })

      await sut.createBook(fakeBookFormValues)
      expect(notifyMock.success).toBeCalledWith('Чистый код успешно создана')
    })

    it('Редиректит на страницу списка книг', async () => {
      const fakeBookFormValues = makeFakeBookFormValues()

      await sut.createBook(fakeBookFormValues)

      expect(routerMock).toMatchObject({
        pathname: APP_ROUTES.books.getRedirectPath(),
      })
    })
  })
})
```

**Проблемы**:

- Начальное состояние объектов может быть не таким, каким того ожидает тест из-за того, что при начале выполнения теста используются уже созданные объекты
- Моки будут вызываться больше одного раза. Во всех it `routerMock` и `notifyMock` используются одни и те же
- Зависимость от порядка выполнения тестов. `Sut` единый для всех тестов, и его состояние может изменяться в зависимости от порядка выполнения тестов

---

# Антипаттерны  именования тест-кейсов

## Несоответствие названия тест-кейса и проводимой проверки

**Пример**

Исходный код:

```tsx
function formatPriceToView(price?: number): string {
  return price ? `${price.toLocaleString('ru')} руб.` : 'Бесплатно'
}
```

**Invalid**

```tsx
describe('formatPriceToView', () => {
  it('Undefined не вызовет ошибку', () => {
    expect(formatPriceToView(undefined)).toBe('Бесплатно')
  })
})
```

Название указывает на то, что при передаче `undefined` не вызовется ошибка, но при этом в самом тесте не проверяется всплытие ошибки.

Если следовать названию тест-кейса, то тест должен выглядеть так:

```tsx
describe('formatPriceToView', () => {
  it('Undefined не вызовет ошибку', () => {
    expect(() => formatPriceToView(undefined)).not.toThrow()
  })
})
```

Но если обратиться к исходному код у `formatPriceToView`, то станет понятно, что тестируется возврат заглушки ‘Бесплатно’.

**Valid**

```tsx
describe('formatPriceToView', () => {
  it('Для undefined вернется дефолтный текст', () => {
    expect(formatPriceToView(undefined)).toBe('Бесплатно')
  })
})
```

---

## Отсутствие конкретики в названии тест-кейса

Проблемы при использовании антипаттерна:

- Невозможно понять что делает тест по названию
- Невозможно понять чего ожидать пользователю функции при работе с нулем. Отсутствие документации
- Сложно расширять тест-кейсы из-за того, что существующие тест-кейсы по названию охватывают слишком много кейсов
- Риск пропустить важные крайние кейсы

**Invalid**

```tsx
describe('formatPriceToView', () => {
  it('Корректно работает с нулем', () => {
    expect(formatPriceToView(0)).toBe('Бесплатно')
  })
})
```

Не понятно что конкретно будет происходить при передаче нуля и что конкретно проверяется в данном случае.

**Valid**

```tsx
describe('formatPriceToView', () => {
  it('Для нуля возвращается дефолтный текст', () => {
    expect(formatPriceToView(0)).toBe('Бесплатно')
  })
})
```

**Invalid**

```tsx
describe('CartRepository', () => {
  describe('Общий счетчик товаров', () => {
    it('Правильно работает при добавлении товара в корзину', async () => {
      const sut = new CartRepository(createCacheService())
      const goodsCountQuery = sut.getGoodsCountQuery()

      sut.addGoods(['id'])
      expect(goodsCountQuery.data).toBe(1)
    })
  })
})
```

Название тест-кейса слишком абстрактное и не дает понимая о предмете тестировани и результата теста.

**Valid**

```tsx
describe('CartRepository', () => {
  describe('Общий счетчик товаров', () => {
    it('Увеличивается при добавлении товаров после успешного выполнения запроса', async () => {
      const sut = new CartRepository(createCacheService())
      const goodsCountQuery = sut.getGoodsCountQuery()

      sut.addGoods(['id'])
      expect(goodsCountQuery.data).toBe(1)
    })
  })
})
```

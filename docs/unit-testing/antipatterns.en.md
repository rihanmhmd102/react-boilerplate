# Testing Antipatterns

## Testing Different Results in One Test Case (Multiple `assert` Blocks from AAA)

Each test case should check its specific result and scenario.

Avoid checking multiple scenarios and results in one test case.

If you need to check intermediate execution results, then a separate test case should be implemented for each check.

Using this antipattern:

- Leads to poor test feedback: it becomes difficult to understand where exactly the error occurred
- Worsens maintenance

Invalid

```tsx
describe('Query', () => {
  describe('When an error occurs', () => {
    it('onError is called', async () => {
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
  describe('When an error occurs', () => {
    const setupErrorQuery = async (onError: OnError = vi.fn(), errorMessage: string = 'foo') => {
      const sut = new Query(() => Promise.reject(errorMessage), {
        dataStorage: getDataStorage(),
      })

      sut.sync({ onError })
      await when(() => store.isError)

      return { sut }
    }

    it('onError is called with error message', async () => {
      const onError = vi.fn()
      await setupErrorQuery(onError, 'foo')

      expect(onError).toBeCalledWith('foo')
    })

    it('Status flags are set to error state', async () => {
      const { sut } = await setupErrorQuery()

      expect(sut.isError).toBeTruthy()
      expect(sut.isLoading).toBeFalsy()
      expect(sut.isSuccess).toBeFalsy()
    })

    it('Data is reset', async () => {
      const { sut } = await setupErrorQuery()

      expect(sut.data).toBe(undefined)
    })
  })
})
```

---

## Leaking SUT Implementation Details into Tests

It's necessary to ensure that tests don't duplicate the logic implemented in the SUT.

**String concatenation example**

```tsx
export function formatPriceToView(price: number): string {
  return price ? `${price.toLocaleString('ru')} руб.` : 'Free'
}
```

**Invalid**

The test duplicates the SUT logic to check the result.

```tsx
describe('formatPriceToView', () => {
  it.each([[1000], [10000], [100000], [1000000]])(
    'For "%s" non-breaking space is added in numbers',
    (input) => {
      const result = formatPriceToView(input);

      expect(result).toBe(`${input.toLocaleString('ru')} руб.`);
    },
  );
};
```

**Valid**

The test manually specifies the expected result.

```tsx
describe('formatPriceToView', () => {
  it.each([
      [1000, '1 000 руб.'],
      [10000, '10 000 руб.'],
      [100000, '100 000 руб.'],
      [1000000, '1 000 000 руб.'],
  ])('For "%s" non-breaking space is added in numbers', (input, output) => {
    const result = formatPriceToView(input);

    expect(result).toBe(output);
  });
};
```

**Output object checking example**

```tsx
function formatBookItemToView(book: BookRepositoryDTO.BookListItemDTO) {
  return {
    ...book,
    price: formatPriceToView(book.price),
  }
}
```

**Invalid**

`Spread` is part of the SUT logic, so using it when checking the result is not recommended.

```tsx
describe('formatBookItem', () => {
  it('Book data is returned in display format', () => {
    const fakeBookItem = bookRepositoryFaker.makeBookItem({ price: 1000 })

    const result = formatBookItemToView(fakeBookItem)

    expect(result).toEqual({
      ...fakeBookItem,
      price: '1 000 руб.',
    })
  })
})
```

**Valid**

It's necessary to manually unambiguously check the expected result.

```tsx
describe('formatBookItem', () => {
  it('Book data is returned in display format', () => {
    const fakeBookItem = bookRepositoryFaker.makeBookItem({ price: 1000 })

    const result = formatBookItemToView(fakeBookItem)

    expect(result).toEqual({
      id: fakeBookItem.id,
      name: fakeBookItem.name,
      price: '1 000 руб.',
    })
  })
})
```

---

## Using a Single Arrange Stage for All `it` in `describe`

For each `it` in `describe`, a unique **Arrange** stage must be called. It's recommended to extract reusable Arrange stage into a function that will be called separately for each test.

**Valid**

In the example below, `setupSuccessCreation` is called for each `it` separately:

```tsx
describe('CreateBookScreenStore', () => {
  const setupSuccessCreation = () => {
    const routerMock = createRouterMock()
    const notifyMock = mock<typeof notify>()
    const sut = new CreateBookScreenStore(routerMock, notifyMock)

    return { sut, notifyMock, routerMock }
  }

  describe('Successful book creation', () => {
    it('Shows success notification', async () => {
      const fakeBookFormValues = makeFakeBookFormValues({ name: 'Clean Code' })
      const { sut, notifyMock } = setupSuccessCreation()

      await sut.createBook(fakeBookFormValues)
      expect(notifyMock.success).toBeCalledWith('Clean Code successfully created')
    })

    it('Redirects to books list page', async () => {
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

In the example below, a single **Arrange** stage is made for all `it`:

```tsx
describe('CreateBookScreenStore', () => {
  const routerMock = createRouterMock()
  const notifyMock = mock<typeof notify>()
  const sut = new CreateBookScreenStore(routerMock, notifyMock)

  describe('Successful book creation', () => {
    it('Shows success notification', async () => {
      const fakeBookFormValues = makeFakeBookFormValues({ name: 'Clean Code' })

      await sut.createBook(fakeBookFormValues)
      expect(notifyMock.success).toBeCalledWith('Clean Code successfully created')
    })

    it('Redirects to books list page', async () => {
      const fakeBookFormValues = makeFakeBookFormValues()

      await sut.createBook(fakeBookFormValues)

      expect(routerMock).toMatchObject({
        pathname: APP_ROUTES.books.getRedirectPath(),
      })
    })
  })
})
```

**Problems**:

- Initial state of objects may not be what the test expects because when the test starts executing, already created objects are used
- Mocks will be called more than once. In all `it`, the same `routerMock` and `notifyMock` are used
- Dependency on test execution order. `SUT` is the same for all tests, and its state may change depending on the test execution order

---

# Test Case Naming Antipatterns

## Mismatch Between Test Case Name and Performed Check

**Example**

Source code:

```tsx
function formatPriceToView(price?: number): string {
  return price ? `${price.toLocaleString('ru')} руб.` : 'Free'
}
```

**Invalid**

```tsx
describe('formatPriceToView', () => {
  it('Undefined will not cause an error', () => {
    expect(formatPriceToView(undefined)).toBe('Free')
  })
})
```

The name indicates that passing `undefined` will not cause an error, but the test itself doesn't check for error throwing.

If following the test case name, the test should look like this:

```tsx
describe('formatPriceToView', () => {
  it('Undefined will not cause an error', () => {
    expect(() => formatPriceToView(undefined)).not.toThrow()
  })
})
```

But if we look at the source code of `formatPriceToView`, it becomes clear that the test is checking the return of the 'Free' fallback.

**Valid**

```tsx
describe('formatPriceToView', () => {
  it('For undefined returns default text', () => {
    expect(formatPriceToView(undefined)).toBe('Free')
  })
})
```

---

## Lack of Specificity in Test Case Name

Problems when using the antipattern:

- Impossible to understand what the test does by name
- Impossible to understand what the function user should expect when working with zero. Lack of documentation
- Difficult to extend test cases because existing test cases by name cover too many cases
- Risk of missing important edge cases

**Invalid**

```tsx
describe('formatPriceToView', () => {
  it('Works correctly with zero', () => {
    expect(formatPriceToView(0)).toBe('Free')
  })
})
```

It's unclear what specifically will happen when passing zero and what specifically is being checked in this case.

**Valid**

```tsx
describe('formatPriceToView', () => {
  it('For zero returns default text', () => {
    expect(formatPriceToView(0)).toBe('Free')
  })
})
```

**Invalid**

```tsx
describe('CartRepository', () => {
  describe('Total goods counter', () => {
    it('Works correctly when adding goods to cart', async () => {
      const sut = new CartRepository(createCacheService())
      const goodsCountQuery = sut.getGoodsCountQuery()

      sut.addGoods(['id'])
      expect(goodsCountQuery.data).toBe(1)
    })
  })
})
```

The test case name is too abstract and doesn't give understanding about the test subject and result.

**Valid**

```tsx
describe('CartRepository', () => {
  describe('Total goods counter', () => {
    it('Increases when adding goods after successful request execution', async () => {
      const sut = new CartRepository(createCacheService())
      const goodsCountQuery = sut.getGoodsCountQuery()

      sut.addGoods(['id'])
      expect(goodsCountQuery.data).toBe(1)
    })
  })
})
```

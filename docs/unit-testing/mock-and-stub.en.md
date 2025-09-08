# Working with Dependencies (Mock and Stub)

If in the question "what exactly to test" the Unit Testing Guide leans towards the "classical school" of testing, then in the question of isolation the approach is already closer to the "London school".

# Module Mocking

[Module mocking](https://vitest.dev/guide/mocking.html#modules) increases test brittleness and exposes the internal implementation of the SUT.

**Module mocking should be avoided.**

---

# Terminology

For simplicity, no distinction is made between **Mock** and **Stub** in tests.

Both Mock and Stub are named as Mock:

[Test Double | Style Guide](/style-guides/testing/test-double.md)

---

# DI

It's recommended to **use basic DI** for all dependencies of a software entity:

[DI for Repositories](/architecture/data.md)

[Using DI to control dependencies](/architecture/modules/features/overview.md)

In the context of testing, using DI provides several advantages:

- Ability to easily substitute dependencies with test ones
- Not using module mocks
- Reducing test brittleness

**Example for Class:**

```tsx
export class CartScreenStore {
  private readonly modalStore = createFlagStore();

  constructor(
    private readonly cardPaymentStore: CardPaymentStore,
    private readonly routerService: Router,
  ) {}

  ...

}

...
describe('CartScreenStore', () => {
  it('Payment process starts in background when modal is opened', () => {
    const cartPaymentStoreMock = mock<CardPaymentStore>();
    const sut = new CartScreenStore(cartPaymentStoreMock, createRouterMock());

    sut.openModal();
    expect(cartPaymentStoreMock.pay).toBeCalled();
  });
};
```

**DI Example for React Hook:**

```tsx
function useBookForm(store: BookFormStore) {
  const form = useForm<BookFormValues>()

  useEffect(() => {
    store.getBooks()
  }, [])

  return {
    isPresentCoAuthor: store.isPresentCoAuthor,
    submit: form.handleSubmit,
  }
}
```

The `store` dependency is accepted as a parameter, thanks to this, `useBookForm` depends on the abstract interface `BookFormStore`.

**DI Example for React Component:**

```tsx
interface AddToCartButtonProps {
  store: ProductCartManagerStore
}

const AddToCartButton = observer(({ store }: AddToCartButtonProps) => {
  const { addToCart } = store

  return <Button onClick={addToCart}>Buy</Button>
})
```

The `store` dependency is accepted through props, thanks to this, `AddToCartButton` depends on the abstract interface `ProductCartManagerStore`.

---

# Rules for Dependency Substitution

## All dependencies **interacting with the environment (`DOM`, `process.env`...)** are substituted

**Reason:** test slowdown. Executing real services requires environment emulation

**Examples:** `NotificationService` (when calling method renders React component), `Router` (interaction with history).

```tsx
export class CreateBookScreenStore {
  constructor(
    private readonly administrationRepository: AdministrationRepository,
    private readonly routerService: Router,
    private readonly notifyService: typeof notify,
  ) {}
}
```

```tsx
it('Successful book creation redirects to books list page', async () => {
  const fakeBookFormValues = makeFakeBookFormValues()

  const adminRepositoryMock = mock<AdministrationRepository>()
  const routerMock = createRouterMock()
  const notifyMock = mock<typeof notify>()
  const sut = new CreateBookScreenStore(
    adminRepositoryMock,
    routerMock,
    notifyMock,
  )

  await sut.createBook(fakeBookFormValues)

  expect(routerMock).toMatchObject({
    pathname: APP_ROUTES.books.getRedirectPath(),
  })
})
```

---

## Dependencies with side effects are substituted

If a dependency has side effects internally (**the most common side effect is network interaction**), it must be substituted with a mock.

**Example**:

`GoodsListStore` has `BookRepository` as a dependency, which interacts with the backend:

```tsx
class GoodsListStore {
  constructor(private readonly bookRepository: BookRepository) {
    makeAutoObservable(this)
  }

  public async getList(): Promise<ListItem[]> {
    const data = await this.bookRepository.getBookList()

    return data.map(({ id, name, price }) => ({
      id,
      name,
      price: formatPriceToView(price),
      store: createProductCartManagerStore(id),
    }))
  }
}
```

Incorrect example **unit-test for `getList`**

```tsx
it('Book list is formatted for display', async () => {
  const fakeBookList = bookRepositoryFaker.makeBookList(2, { price: 1000 })
  const fakeBookListItem = fakeBookList.data[0]

  axiosMock.onGet('/books').reply(200, fakeBookList)

  const bookRepository = new BookRepository(bookNetworkSources)
  const sut = new GoodsListStore(bookRepository)

  const resultList = await sut.getList()

  expect(resultList[0]).toMatchObject({
    id: fakeBookListItem.id,
    name: fakeBookListItem.name,
    price: '1 000 руб.',
  })
})
```

`BookRepository` interacts with the server through `axios`, so it was decided to mock `axios`.

Problems of this example are related to low refactoring resistance due to:

- Direct connection of the test with `axios`, which is part of the `BookRepository` implementation. If `axios` is refactored or replaced with another library, all application tests interacting with `axios` will need to be rewritten
- Direct connection of the test and endpoint from which data is requested. When changing the endpoint or increasing their number for data formation, each dependent test will need to be changed, while the response from `BookRepository` may remain unchanged
- Direct connection of the test and the data type that the endpoint returns. `BookRepository` is a facade for working with data, so the backend response and data returned by `BookRepository` differ. When changing the backend response, all related tests will need to be rewritten, while the response from `BookRepository` may remain unchanged.

Incorrect example **unit-test for `getList`**

```tsx
it('Book list is formatted for display', async () => {
  const fakeBookList = bookRepositoryFaker.makeBookList(2, { price: 1000 })
  const fakeBookListItem = fakeBookList.data[0]

  const mockServer = setupServer([
    http.get('https://rest-endpoint.example/path/to/books', () => {
      return HttpResponse.json(fakeBookList)
    }),
  ])

  mockServer.listen({ onUnhandledRequest: 'error' })

  const bookRepository = new BookRepository(bookNetworkSources)
  const sut = new GoodsListStore(bookRepository)

  const resultList = await sut.getList()

  expect(resultList[0]).toMatchObject({
    id: fakeBookListItem.id,
    name: fakeBookListItem.name,
    price: '1 000 руб.',
  })
})
```

In the provided test, the server response is substituted using testing framework tools.

Problems of this test are identical to the previous example.

**Correct unit-test example for `getList`**

```tsx
describe('GoodsListStore', () => {
  it('Book list is formatted for display', async () => {
    const fakeBookList = bookRepositoryFaker.makeBookList(2, { price: 1000 })
    const fakeBookListItem = fakeBookList.data[0]

    const bookRepositoryMock = mock<BookRepository>({
      getBookList: async () => fakeBookList,
    })
    const sut = new GoodsListStore(bookRepositoryMock)

    const resultList = await sut.getList()

    expect(resultList[0]).toMatchObject({
      id: fakeBookListItem.id,
      name: fakeBookListItem.name,
      price: '1 000 руб.',
    })
  })
})
```

In the test, `BookRepository` was substituted with a mock. The `BookRepository` implementation is not exposed, refactoring resistance is at an acceptable level.

---

## Dependencies with complex initialization are substituted

Example of complex initialization: **large dependency graph.**

`CartStore` is a dependency of `ProductCartManagerStore`:

```tsx
class ProductCartManagerStore {
  constructor(private readonly cartStore: CartStore) {}
}
```

In turn, `CartStore` also has dependencies:

```tsx
class CartStore {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly notifyService: typeof notify,
  ) {}
}
```

**Example with brittle test**

If not mocking `CartStore`, then the test will have the following initialization:

```tsx
const fakeGoods = cartRepositoryFaker.makeGoodsList()
const currentProduct = fakeGoods[0]

const cache = createCacheService()
const cartNetworkSourcesMock = mock<CartNetworkSources>({
  getGoods: async () => fakeGoods,
})
const cartRepository = new CartRepository(cartNetworkSourcesMock, cache)
const notifyMock = mock<NotifyService>()
const cartStore = new CartStore(cartRepository, notifyMock)

const sut = new ProductCartManagerStore(cartStore)
```

Initialization is complex, and such an approach makes the test dependent on the implementation of `CartStore` and its dependencies. If dependencies change in any way, the test will need to be refactored.

**Example with refactoring-resistant test**

```tsx
const fakeGoods = cartRepositoryFaker.makeGoodsList()
const currentProduct = fakeGoods[0]

const cartStoreMock = mock<CartStore>({
  goods: fakeGoods,
})
const sut = new ProductCartManagerStore(cartStoreMock, currentProduct.id)
```

---

## Dependencies containing state that is difficult to bring to the necessary point for testing start are substituted

**Example**

`CartStore` depends on `CartRepository`:

```tsx
class CartStore {
  constructor(private readonly cartRepository: CartRepository) {
    makeAutoObservable(this)
  }

  public get bestProduct() {
    return `Best product: ${this.cartRepository.bestProduct.name}`
  }
}
```

To form `CartStore.bestProduct`, `CartRepository` must form `bestProduct` on its side. For this, two methods must be called in `CartRepository`:

- `addGoods` - add products to `CartRepository`
- `setBestProduct` - set `bestProduct` by product ID

**Test with low refactoring resistance**

```tsx
it('Best product name is formatted for display', async () => {
  const fakeBookList = cartRepositoryFaker.makeBookList()
  const cartRepository = new CartRepository(cartNetworkSourcesMock)

  const sut = new CartStore(cartRepository)

  cartRepository.addGoods(fakeBookList)
  cartRepository.setBestProduct(fakeBookList[0].id)

  expect(sut.bestProduct).toBe('Best product: Crime and Punishment')
})
```

In the test, to set the necessary state of `CartRepository`, methods `addGoods` and `setBestProduct` are called.

Problems:

- The complexity of bringing `CartRepository` to the necessary state for the test can be much more complex and this will cause additional improvements
- Low refactoring resistance due to exposing the `CartRepository` implementation in the test. Tests for `CartStore` will fail when changing the functionality for setting `bestProduct` or changing the API of existing `CartRepository` methods

**Refactoring-resistant test**

```tsx
it('Best product name is formatted for display', async () => {
  const fakeBestProduct = cartRepositoryFaker.makeBestProduct({
    name: 'Crime and Punishment',
  })
  const cartRepositoryMock = mock<CartRepository>({
    bestProduct: fakeBestProduct,
  })

  const sut = new CartStore(cartRepositoryMock)

  expect(sut.bestProduct).toBe('Best product: Crime and Punishment')
})
```

The test depends on the public API of only one property of `CartRepository`, which is directly related to the SUT.

---

## Dependencies that are part of the SUT implementation are not substituted

If a dependency is part of the SUT implementation (not an external dependency), then it shouldn't be substituted.

**In the example below, substituting `formatItemToView` or `CartManager` is not necessary:**

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

# Creating mocks and stubs

`Mocks` must be created based on an interface. In the example below, using the mock function, an object was created where all methods and properties except `goods` were replaced with `spy`:

```tsx
const fakeGoodsList = cartRepositoryFaker.makeGoodsList(2)

const cartStoreMock = mock<CartStore>({
  goods: fakeGoodsList,
})

const sut = new CardPaymentStore(cartStoreStub)
```

Using this concept allows creating mocks quite easily:

- No need to describe all service methods, only those that participate in the test need to be described.
- No need to initialize the service and describe its dependencies

---

# Implementing "Smart" Mocks for Commonly Used Public Services

## Problem

The application may contain services that are frequently used in application layers, for example: `Router`, `CacheService`, `NotificationsService`...

Without additional tools, checking interaction with the service might look like this:

```tsx
it('Successful book creation redirects to books list page', async () => {
  const fakeBookFormValues = makeFakeBookFormValues()

  const routerMock = mock<Router>()
  const sut = new CreateBookScreenStore(routerMock)

  await sut.createBook(fakeBookFormValues)

  expect(routerMock.push).toBeCalledWith('/books')
})
```

Problems of the provided solution:

- The test exposes the `Router` implementation by accessing its `push` method, if `CreateBookScreenStore` replaces push with `replace`, then the test will fail, while the result still satisfies us
- When replacing the `Router` library, all tests in the application using `Router` will need to be rewritten

## Solution

**To avoid the described problems, "smart" mocks should be used for commonly used public services.**

"Smart" mocks provide an abstract interface for result checking.

Example of a "smart" router mock:

[npm: next-router-mock](https://www.npmjs.com/package/next-router-mock)

```tsx
it('Successful book creation redirects to books list page', async () => {
  const fakeBookFormValues = makeFakeBookFormValues()

  const routerMock = createRouterMock()
  const sut = new CreateBookScreenStore(routerMock)

  await sut.createBook(fakeBookFormValues)

  expect(routerMock).toMatchObject({
    pathname: '/books',
  })
})
```

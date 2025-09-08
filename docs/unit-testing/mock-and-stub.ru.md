# Работа с зависимостями (Mock и Stub)

Если в вопросе “что именно тестировать” Unit Testing Guide тяготеет к “классической школе” тестирования, то в вопросе изоляции подход уже приближен к “лондонской школе”.

# Mock модулей

[Mock модулей](https://vitest.dev/guide/mocking.html#modules) увеличивает хрупкость тестов и раскрывает внутреннюю реализацию SUT.

**Mock модулей следует избегать.**

---

# Терминогология

Для упрощения, в тестах различия между **Mock** и **Stub** не делаются.

И Mock и Stub именуются как Mock:

[Test Double | Style Guide](/style-guides/testing/test-double.md)

---

# DI

Рекомендуется для всех зависимостей программной сущности **использовать базовый DI**:

[DI для Repositories](/architecture/data.md)

[Использование DI для контроля зависимостей](/architecture/modules/features/overview.md)

В рамках тестирования использование DI дает ряд преимуществ:

- Возможность простой подмены зависимостей на тестовые
- Не использовать mock модулей
- Уменьшение хрупкости тестов

**Пример для Class:**

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
  it('Процесс оплаты запускается фоном при открытии модалки', () => {
    const cartPaymentStoreMock = mock<CardPaymentStore>();
    const sut = new CartScreenStore(cartPaymentStoreMock, createRouterMock());

    sut.openModal();
    expect(cartPaymentStoreMock.pay).toBeCalled();
  });
};
```

**Пример DI для React Hook:**

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

Зависимость `store` принимается в параметре, благодаря этому, `useBookForm` зависит от абстрактного интерфейса `BookFormStore`.

**Пример DI для React Component:**

```tsx
interface AddToCartButtonProps {
  store: ProductCartManagerStore
}

const AddToCartButton = observer(({ store }: AddToCartButtonProps) => {
  const { addToCart } = store

  return <Button onClick={addToCart}>Купить</Button>
})
```

Зависимость `store` принимается через props, благодаря этому, `AddToCartButton` зависит от абстрактного интерфейса `ProductCartManagerStore`.

---

# Правила подмены зависимостей

## Подменяются все зависимости **взаимодействующие с окружением (`DOM`, `process.env`…)**

**Причина: з**амедление тестов. Выполнение реальных сервисов требует эмуляцию окружения

****Примеры: `NotificationService` (при вызове метода рендерит React компонент), `Router` (взаимодействие с history).

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
it('Успешное создание книги редиректит на страницу списка книг', async () => {
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

## Подменяются зависимости, имеющие побочные эффекты

Если зависимость внутри себя имеет побочные эффекты (**самый распространенный побочных эффект - это взаимодействие с сетью**), ее необходимо подменить моком.

**Пример**:

У `GoodsListStore` в зависимостях находится `BookRepository`, который взаимодействует с бэкендом:

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

Некорректный пример **unit-теста для `getList`**

```tsx
it('Список книг форматируется для отображения', async () => {
  const fakeBookList = bookRepositoryFaker.makeBookList(2, { price: 1000 })
  const fakeBookListItem = fakeBookList.data[0]

  axiosMock.onGet('/books').reply(200, fakeBookList)

  const bookRepository = new BookRepository(bookNetworkSources)
  const sut = new GoodsListStore(bookRepository)

  const resultList = await sut.getList()

  expect(resultList[0]).toMatchObject({
    id: fakeBookListItem.id,
    name: fakeBookListItem.name,
    price: '1 000 руб.',
  })
})
```

`BookRepository` взаимодействует с сервером через `axios`, поэтому было принято решение замокать `axios`.

Проблемы данного примера связаны с низкой устойчивостью к рефакторингу из-за:

- Прямой связи теста с `axios`, который является частью имплементации `BookRepository`. Если будет произведен рефакторинг `axios` или он будет заменен на другую библиотеку, то придется переписать все тесты приложения, взаимодействующие с `axios`
- Прямой связи теста и эндпоинта, с которого делается запрос на получение данных. При изменении эндпоинта или увеличения их количества для формирования данных, придется изменять каждый зависимый тест,  при этом ответ от  `BookRepository` может остаться неизменным
- Прямой связи теста и типа данных, который отдает эндпоинт. `BookRepository` - фасад для работы с данными, поэтому ответ от бэкенда и данные, отдаваемые `BookRepository`, отличаются. При изменении ответа бэкенда придется переписывать все связанные тесты, при этом ответ от  `BookRepository` может остаться неизменным.

Некорректный пример **unit-теста для `getList`**

```tsx
it('Список книг форматируется для отображения', async () => {
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
    price: '1 000 руб.',
  })
})
```

В приведенном тесте происходит подмена ответа от сервера посредством инструментов тестового фреймворка.

Проблемы данного теста идентичны предыдущему примеру.

**Корректный пример unit-теста для `getList`**

```tsx
describe('GoodsListStore', () => {
  it('Список книг форматируется для отображения', async () => {
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
      price: '1 000 руб.',
    })
  })
})
```

В тесте `BookRepository` был подменен моком. Имплементация `BookRepository` не раскрыта, устойчивость к рефакторингу находится на приемлемом уровне.

---

## Подменяются зависимости со сложной инициализацией

Пример сложной инициализации: **большой граф зависимостей.**

`CartStore` является зависимостью `ProductCartManagerStore`:

```tsx
class ProductCartManagerStore {
  constructor(private readonly cartStore: CartStore) {}
}
```

В свою очередь `CartStore` тоже имеет зависимости:

```tsx
class CartStore {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly notifyService: typeof notify,
  ) {}
}
```

**Пример с хрупким тестов**

Если не мокать `CartStore`, то в тесте получим следующую инициализиацию:

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

Инициализация является сложной, а также такой подход делает тест зависимым от имплементации `CartStore` и его зависимостей. Если зависимости каким-либо образом изменяться, то придется рефакторить тест.

**Пример с устойчивым к рефакторингу тестом**

```tsx
const fakeGoods = cartRepositoryFaker.makeGoodsList()
const currentProduct = fakeGoods[0]

const cartStoreMock = mock<CartStore>({
  goods: fakeGoods,
})
const sut = new ProductCartManagerStore(cartStoreMock, currentProduct.id)
```

---

## Подменяются зависимости, содержащие состояние, которое сложно привести в необходимую точку для начала тестирования

**Пример**

`CartStore` зависит `CartRepository`:

```tsx
class CartStore {
  constructor(private readonly cartRepository: CartRepository) {
    makeAutoObservable(this)
  }

  public get bestProduct() {
    return `Лучший продукт: ${this.cartRepository.bestProduct.name}`
  }
}
```

Для формирования `CartStore.bestProduct`, `CartRepository` должен сформировать на своей стороне `bestProduct`. Для этого в `CartRepository` необходимо вызвать два метода:

- `addGoods` - добавить в `CartRepository` продукты
- `setBestProduct` - установить `bestProduct` по ID продукта

**Тест с низкой устойчивостью к рефакторингу**

```tsx
it('Имя лучшего продукта форматируется для отображения', async () => {
  const fakeBookList = cartRepositoryFaker.makeBookList()
  const cartRepository = new CartRepository(cartNetworkSourcesMock)

  const sut = new CartStore(cartRepository)

  cartRepository.addGoods(fakeBookList)
  cartRepository.setBestProduct(fakeBookList[0].id)

  expect(sut.bestProduct).toBe('Лучший продукт: Преступление и наказание')
})
```

В тесте для установки необходимого состояния `CartRepository` вызываются методы `addGoods` и `setBestProduct`.

Проблемы:

- Сложность приведения `CartRepository` в необходимое состояния для теста может быть намного сложнее и это будет вызывать дополнительные доработки
- Низкая устойчивость к рефакторингу из-за раскрытия имлементации `CartRepository` в тесте. Тесты для `CartStore` будут падать при изменении функционала по установке `bestProduct` или изменению API существующий методов `CartRepository`

**Тест, устойчивый к рефакторингу**

```tsx
it('Имя лучшего продукта форматируется для отображения', async () => {
  const fakeBestProduct = cartRepositoryFaker.makeBestProduct({
    name: 'Преступление и наказание',
  })
  const cartRepositoryMock = mock<CartRepository>({
    bestProduct: fakeBestProduct,
  })

  const sut = new CartStore(cartRepositoryMock)

  expect(sut.bestProduct).toBe('Лучший продукт: Преступление и наказание')
})
```

Тест зависит от публичного API только одного свойства `CartRepository`, который напрямую связан с SUT.

---

## Зависимости, являющиеся частью имплементации SUT, не подменяются

Если зависимость является частью имплементации SUT (не внешняя зависимость), то ее подменять не надо.

**В примере ниже подменять `formatItemToView` или `CartManager` не нужно:**

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

# Создание mocks и stubs

Создавать `mocks` необходимо на основе интерфейса. В примере ниже с помощью функции mock был создан объект,  в котором все методы и свойства кроме `goods` были заменены на `spy`:

```tsx
const fakeGoodsList = cartRepositoryFaker.makeGoodsList(2)

const cartStoreMock = mock<CartStore>({
  goods: fakeGoodsList,
})

const sut = new CardPaymentStore(cartStoreStub)
```

Использование данной концепции позволяет достаточно просто создавать моки:

- Нет необходимости описывать все методы сервиса, надо описать только те, которые участвуют в тесте.
- Нет необходимости инициализировать сервис и описывать его зависимости

---

# Реализация “умных” моков для общедоступных часто используемых сервисов

## Проблема

В приложении могут находится сервисы, которые часто используются в слоях приложения, например: `Router`, `CacheService`, `NotificationsService`…

Без дополнительных инструментов проверка взаимодействия с сервисом может выглядеть следующим образом:

```tsx
it('Успешное создание книги редиректит на страницу списка книг', async () => {
  const fakeBookFormValues = makeFakeBookFormValues()

  const routerMock = mock<Router>()
  const sut = new CreateBookScreenStore(routerMock)

  await sut.createBook(fakeBookFormValues)

  expect(routerMock.push).toBeCalledWith('/books')
})
```

Проблемы приведенного решения:

- Тест раскрывает имплементацию `Router` обращаясь к его методу `push`, если `CreateBookScreenStore` заменит push на `replace`, то тесты упадет, при этом результат нас по прежнему удолетворяет
- При замене библиотеки `Router` придется переписать все тесты в приложении, использующие `Router`

## Решение

**Для избежания описанных проблем для общедоступных часто используемых сервисов необходимо использовать “умные” моки.**

“Умные” моки предоставляют абстрактный интерфейс для проверки результата.

Пример “умного” мока роутера:

[npm: next-router-mock](https://www.npmjs.com/package/next-router-mock)

```tsx
it('Успешное создание книги редиректит на страницу списка книг', async () => {
  const fakeBookFormValues = makeFakeBookFormValues()

  const routerMock = createRouterMock()
  const sut = new CreateBookScreenStore(routerMock)

  await sut.createBook(fakeBookFormValues)

  expect(routerMock).toMatchObject({
    pathname: '/books',
  })
})
```

# Fakes

## Fake data has the prefix `fake`

**✨ Motivation**

Allows distinguishing fake data in tests from other types of data.

**✅ Valid**

```ts
it('CreateBook sends changed form values to the repository', async () => {
  const fakeBook = bookRepositoryFaker.makeBookByName()
  const fakeBookFormValues: BookFormValues = {
    name: fakeBook.name,
    genre: fakeBook.genre,
    pageCount: '22',
    author: fakeBook.author,
    isPresentCoAuthor: false,
  }

  const cacheService = createCacheService()
  const creationBookSpy = vi.fn().mockResolvedValue(undefined)
  const adminRepositoryMock = mock<AdministrationRepository>({
    createBookMutation: () => cacheService.createMutation(creationBookSpy),
  })

  const sut = new CreateBookScreenStore(
    adminRepositoryMock,
    createRouterMock(),
  )

  await sut.createBook(fakeBookFormValues)

  expect(creationBookSpy).toBeCalledWith({
    name: fakeBook.name,
    genreID: fakeBook.genre.id,
    pageCount: 22,
    author: fakeBook.author,
  })
})
```

**❌ Invalid**

```ts
it('CreateBook sends changed form values to the repository', async () => {
  const book = bookRepositoryFaker.makeBookByName()
  const bookFormValues: BookFormValues = {
    name: book.name,
    genre: book.genre,
    pageCount: '22',
    author: book.author,
    isPresentCoAuthor: false,
  }

  const cacheService = createCacheService()
  const creationBookSpy = vi.fn().mockResolvedValue(undefined)
  const adminRepositoryMock = mock<AdministrationRepository>({
    createBookMutation: () => cacheService.createMutation(creationBookSpy),
  })

  const sut = new CreateBookScreenStore(
    adminRepositoryMock,
    createRouterMock(),
  )

  await sut.createBook(bookFormValues)

  expect(creationBookSpy).toBeCalledWith({
    name: book.name,
    genreID: book.genre.id,
    pageCount: 22,
    author: book.author,
  })
})
```

## Faker service must be located in a separate file named `faker.ts`

**✨ Motivation**

Identification of faker services and separation from production code.

**✅ Valid**

```
├── user-repository/
|    ├── user-repository.ts
|    ├── faker.ts
|    └── index.ts
```

**❌ Invalid**

```
├── user-repository/
|    ├── user-repository.ts
|    ├── user-repository.faker.ts
|    └── index.ts
```

```
├── user-repository/
|    ├── user-repository.ts
|    ├── user-repository.stub.ts
|    └── index.ts
```

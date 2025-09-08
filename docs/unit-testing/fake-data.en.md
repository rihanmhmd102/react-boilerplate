# Fake Data for Tests

# Avoiding Fixtures

It's recommended to avoid using `fixtures`. The article below contains the justification:

[Don't use fixtures in Cypress and unit tests — use factory functions](https://habr.com/ru/companies/otus/articles/540512/)

# Faker for Generating Test Data

`Faker` is used to generate test data (this is not the name of a library, but the name of an abstract architectural entity).

`Faker` allows generating the necessary data set for test execution and working with a *Contract first* approach.

Benefits of using `faker`:

- Reduces test coupling (a unique data set is generated for each test)
- Reduces burden on test data generation
- Simplifies development with *Contract first approach, when the backend is not ready yet, but there is a contract*

## Location

`Faker` should be located next to the entity on which the data is generated.

```jsx
├── data/
|    └── repositories/
|    |    └── cart-repository/
|    |    |    ├── cart-repository.ts
|    |    |    ├── cart-repository.test.ts
|    |    |    ├── dto.ts
|    |    |    ├── faker.ts
|    |    |    └── index.ts
```

## Faker Content

`Faker` contains methods with the `make` prefix that allow generating test data according to given types.

Example:

```tsx
export const cartRepositoryFaker = {
  makeGoodsList(length?: number): CartRepositoryDTO.GoodsDTO {
    return {
      data: Array.from({ length }).map(() => this.makeGoodsItem()),
    }
  },
  makeGoodsItem(
    data?: Partial<CartRepositoryDTO.GoodsItemDTO>,
  ): CartRepositoryDTO.GoodsItemDTO {
    return {
      name: faker.commerce.productName(),
      id: faker.string.uuid(),
      price: faker.number.int(100000),
      count: faker.number.int(5),
      ...data,
    }
  },
}
```

## Random Data Generation

To save developer time and effort, it's recommended to use a ready-made library for generating test data.

Example of such a library:

[Faker](https://fakerjs.dev/)

### Seed for Repeating Generated Data

Random data generation when running tests in CI can cause test failures due to hitting edge cases.

For test debugging, it's necessary that the CI displays the `seed` on which the data was generated.

`Seed` will allow locally generating an identical data set to repeat the test case.

**Example**

Before each test:

- Generate and set `seed`
- When test fails, display message with `seed`

```ts
import { random } from 'lodash-es'
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach } from 'vitest'

import { faker } from './shared/services/Faker'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom/vitest'

beforeEach((p) => {
  const fakerSeed = random(0, 10000)

  faker.seed(fakerSeed)

  p.onTestFailed(() => {
    console.log(
      `Logs for task: "${p.task.name}"`,
      `Data was generated using FakerSeed: ${fakerSeed}. FakerSeed will allow you to repeat the generated data for local reproduction.`,
    )
  })
})
```

After a test fails in CI, you can get the necessary `seed` from the console message and locally repeat the data set:

```tsx
describe('formatPriceToView', () => {
  it('Postfix is added to the result string', () => {
    faker.seed(1380)
    expect(formatPriceToView(100)).toBe('100 руб.')
  })
})
```

---

## Usage in Tests

Fake data in tests should be marked with the `fake` prefix:

```tsx
describe('ProductCartManagerStore', () => {
  it('Item in cart flag equals true if cart has at least one item', () => {
    const fakeGoodsItem = cartRepositoryFaker.makeGoodsItem({ count: 1 })

    const cartStoreStub = mock<CartStore>({
      goods: [fakeGoodsItem],
    })
    const sut = new ProductCartManagerStore(cartStoreStub, fakeGoodsItem.id)

    expect(sut.hasAddedToCart).toBeTruthy()
  })
})
```

## Manual Value Setting for Verification

It's acceptable to make part of the data non-auto-generated for correct SUT operation verification.

Example:

```tsx
describe('ProductCartManagerStore', () => {
  it('Item in cart flag equals true if cart has at least one item', () => {
    const fakeGoodsItem = cartRepositoryFaker.makeGoodsItem({ count: 1 })

    const cartStoreStub = mock<CartStore>({
      goods: [fakeGoodsItem],
    })
    const sut = new ProductCartManagerStore(cartStoreStub, fakeGoodsItem.id)

    expect(sut.hasAddedToCart).toBeTruthy()
  })
})
```

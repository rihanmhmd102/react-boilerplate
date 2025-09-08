# Фейковые данные для тестов

# Отказ от Fixture

Рекомендуется избегать использования `fixture`. В статье ниже находится обоснование:

[Не используйте фикстуры в Cypress и юнит-тесты — используйте фабричные функции](https://habr.com/ru/companies/otus/articles/540512/)

# Faker для генерации тестовых данных

Для генерации тестовых данных используются `faker` (это не название библиотеки, а название абстрактной архитектурной сущности).

`Faker` позволяет сгенерировать необходимый набор данных для выполнения тестов и работы по *Contract first* подходу.

Преимущества использования `faker`:

- Уменьшает зацепление тестов (для каждого теста генерируется уникальный набор данных)
- Снижение нагрузки на генерацию тестовых данных
- Простота разработки по *Contract first, когда бэкенд еще не готов, но есть контракт*

## Расположение

`Faker` должен располагаться рядом с сущностью, на основе которой генерируются данные.

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

## Содержимое faker

`Faker` содержит методы с префиксом `make` , позволяющие генерировать тестовые данные по заданным типам.

Пример:

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

## Рандомная генерация данных

Для экономии времени и сил разработчика рекомендуется использовать готовую библиотеку для генерации тестовых данных.

Пример подобной библиотеки:

[Faker](https://fakerjs.dev/)

### Seed для повтора сгенерированных данных

Генерация рандомных данных при выполнении тестов в CI может вызвать падение теста по причине попадания в крайний кейс.

Для отладки теста необходимо, чтобы в CI отображался `seed`, на основе которого были сгенерированы данные.

`Seed` позволит локально сгенерировать идентичный набор данных для повтора тест-кейса.

**Пример**

Перед каждым тестом:

- Генерировать и устанавливать `seed`
- При падении теста отображать сообщение с `seed`

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
      `Данные были сгенерированы с помощью FakerSeed: ${fakerSeed}. FakerSeed позволит вам повторить сгенерированные данные для локального воспроизведения.`,
    )
  })
})
```

После падения теста в CI, можно будет получить необходимый `seed` из сообщения в консоле и локально повторить набор данных:

```tsx
describe('formatPriceToView', () => {
  it('В результирующую строку добавляется постфикс', () => {
    faker.seed(1380)
    expect(formatPriceToView(100)).toBe('100 руб.')
  })
})
```

---

## Использование в тестах

Фейковые данные в тесте должны помечаться префиксом `fake`:

```tsx
describe('ProductCartManagerStore', () => {
  it('Признак наличия товара в корзине равен true, если в корзине есть хотя бы один товар', () => {
    const fakeGoodsItem = cartRepositoryFaker.makeGoodsItem({ count: 1 })

    const cartStoreStub = mock<CartStore>({
      goods: [fakeGoodsItem],
    })
    const sut = new ProductCartManagerStore(cartStoreStub, fakeGoodsItem.id)

    expect(sut.hasAddedToCart).toBeTruthy()
  })
})
```

## Ручная установка значений для проверки

Допускается часть данных делать не автогенерируемыми для корректной проверки работы SUT.

Пример:

```tsx
describe('ProductCartManagerStore', () => {
  it('Признак наличия товара в корзине равен true, если в корзине есть хотя бы один товар', () => {
    const fakeGoodsItem = cartRepositoryFaker.makeGoodsItem({ count: 1 })

    const cartStoreStub = mock<CartStore>({
      goods: [fakeGoodsItem],
    })
    const sut = new ProductCartManagerStore(cartStoreStub, fakeGoodsItem.id)

    expect(sut.hasAddedToCart).toBeTruthy()
  })
})
```

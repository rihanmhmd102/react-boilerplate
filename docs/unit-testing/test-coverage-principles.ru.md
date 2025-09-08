# Принципы покрытия тестами

# Приватные методы и свойства тестами не покрываются

Тестироваться и проверяться в тестах должны только публичные методы и свойства.

**Пример приватных “методов” в контексте es module:**

```tsx
// приватная функция. Не тестируется
const addMask = (phone: string): string => {
    ...
};

// приватная функция. Не тестируется
const removeFirstNumber = (phone: string): string => {
    ...
};

export const formatPhoneToView = (phone?: string) =>
  addMask(removeFirstNumber(phone));
```

---

# Программные сущности, являющиеся частью реализации SUT, тестами не покрываются

В вопросе “что именно тестировать” Unit Testing Guide тяготеет к “классической школе” тестирования.

В примере ниже тесты должны быть написаны только для публичного верхнеуровневного сервиса `CartStore`. Программные сущности, являющиеся частью имплементации (`formatItemToView`, `CartManager`) тестировать не надо.

Тест для верхнеуровнего сервиса будет самым устойчивым и наилучшим образом будет защищать от багов.

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

# Стоит избегать бесполезных тестов

Тест не нужно писать, если тестируемый метод | сущность | свойство не участвует в реализации бизнес-требований или делает слишком простое действие, не содержит логики.

Например, в `CartStore` нет необходимости писать тесты для getter `count` и `goods`.

```tsx
export class CartStore {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly notifyService: typeof notify,
  ) {
    makeAutoObservable(this)
  }

  private get goodsQuery() {
    return this.cartRepository.getGoodsQuery()
  }

  private get goodsCountQuery() {
    return this.cartRepository.getGoodsCountQuery()
  }

  public get count() {
    return this.goodsCountQuery.data
  }

  public get goods() {
    return this.goodsQuery.data || []
  }
}
```

---

# Нашел баг - напиши тест

Если в системе на любом этапе тестирования был найден баг, то необходимо написать тест на соответствующий кейс, чтобы исключить повторное появление бага.

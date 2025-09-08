# Contract First подход

Для того, чтобы разработку frontend и backend части можно было вести параллельно, используется Contract First подход: backend заранее формирует интерфейсы, по которым будет взаимодействовать с API клиентское приложение.

Архитектурный подход предоставляет инструмент для удобной разработки по Contract First подходу.

## Фейковые sources

Для каждого `sources` может быть создана своя фейковая версия в файле `faker`:

```
├── app/
├── screens/
├── modules/
├── data/
|    ├── repositories/
|    ├── sources/
|    |    ├── cart-network-sources/
|    |    |    ├── cart-network-sources.ts
|    |    |    ├── dto.ts
|    |    |    ├── faker.ts
|    |    |    └── index.ts
|    |    └── index.ts
|    └── index.ts
└── shared/
```

`data/sources/cart-network-sources/faker.ts`

```tsx
export const fakeCartNetworkSources: CartNetworkSources = {
  ...cartNetworkSources,
  getGoods: async () =>
    makeFakeSourceRes(cartNetworkSourcesFaker.makeGoodsList()),
  getGoodsCount: async () => makeFakeSourceRes(10),
}
```

Благодаря использованию DI для `repositories` происходит подмена реального `sources` на фейковый:

```tsx
export const cartRepository = new CartRepository(
  fakeCartNetworkSources,
  cacheService,
)
```

Теперь разработчик может реализовывать новую фичу по Contract First подходу, при чем вся система, кроме sources, будет работать также как на production.

После успешной реализации API просто меняем фейковый sources на реальный:

```tsx
export const cartRepository = new CartRepository(
  cartNetworkSources,
  cacheService,
)
```

## Преимущества использования фейковых sources

- Подмена данных происходит на самом краю архитектуры - sources. Благодаря этому вся система, за исключением `sources`, работает идентично production.
- Нет необходимости самостоятельно придумывать тестовые данные
- Благодаря генерации фейковых данных вероятность отлова бага на раннем этапе разработки увеличивается (например, ошибки переполнения в верстке)

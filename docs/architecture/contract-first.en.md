# Contract First Approach

In order to develop frontend and backend parts in parallel, the Contract First approach is used: the backend forms interfaces in advance through which the client application will interact with the API.

The architectural approach provides a tool for convenient development using the Contract First approach.

## Fake sources

For each `sources` its own fake version can be created in the `faker` file:

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

Thanks to using DI for `repositories`, real `sources` are substituted with fake ones:

```tsx
export const cartRepository = new CartRepository(
  fakeCartNetworkSources,
  cacheService,
)
```

Now the developer can implement a new feature using the Contract First approach, with the entire system, except sources, working the same as in production.

After successful API implementation, we simply change fake sources to real ones:

```tsx
export const cartRepository = new CartRepository(
  cartNetworkSources,
  cacheService,
)
```

## Advantages of using fake sources

- Data substitution happens at the very edge of the architecture - sources. Thanks to this, the entire system, except for `sources`, works identically to production.
- No need to independently come up with test data
- Thanks to fake data generation, the probability of catching a bug at an early stage of development increases (for example, overflow errors in markup)

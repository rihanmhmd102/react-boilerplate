# Testing Methodology for Frontend Applications Ensuring Reliability and Refactoring Resilience

The testing principles described in this documentation allow tests to implement important attributes:

- Bug protection
- Refactoring resilience - low level of fragility
- Execution speed
- Maintenance simplicity

## Terminology

**SUT** (system under test) - the entity being tested.

This term is used in tests for unambiguous identification of the tested entity:

```ts
describe('CartScreenStore', () => {
  it('Payment process starts in background when modal is opened', () => {
    const cartPaymentStoreMock = mock<CardPaymentStore>()

    const sut = new CartScreenStore(cartPaymentStoreMock)

    sut.openModal()

    expect(cartPaymentStoreMock.pay).toBeCalled()
  })
})
```

## Test Location

Tests should be located next to the tested entity so that a visual connection can be established between the **SUT** and its tests.

Example:

```
├── data/
|    └── repositories/
|    |    └── user-repository/
|    |    |    ├── user-repository.ts
|    |    |    ├── user-repository.test.ts
|    |    |    └── index.ts

```

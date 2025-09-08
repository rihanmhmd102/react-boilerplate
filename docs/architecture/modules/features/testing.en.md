# Testing

Testing `features` allows unambiguously ensuring the correctness of business requirements implementation.

## Logic Testing

In `features` it is **mandatory** to test the logic layer.

Advantages of separate testing of `feature` logic:

- Ability to reuse feature logic without the need to move and refactor tests.
  The logic layer doesn't depend on UI, so at the architectural concept level there should be separate tests for logic
- Simplicity of implementing tests for the logic layer. To implement logic tests, there's no need to use additional tools or browser environment emulation
- Speed of test execution. Logic doesn't depend on UI, so there's no need to emulate browser environment, which significantly reduces test execution time

### Logic Test Requirements

`Features` logic tests follow unified requirements:

[Unit tests | Style Guide](/unit-testing/overview.md)

### Working with Repositories and faker

[Testing SUT using Repositories](/unit-testing/fake-data.md)

### Test Case Formation

[Testing Business Logic](/unit-testing/test-coverage-principles.md)

---

## UI Testing

If tests were implemented for the logic layer, then **UI layer testing can be either omitted**, or only check:

- Conditional rendering
- Interaction with browser environment (expected click handling, working with ref, window, etc.)

UI testing in `features` can be abandoned for reasons:

- Most key cases will already be checked at the logic layer. Duplication of tests should be avoided
- UI tests are integration testing. Integration testing is more complex to implement
- UI tests are slow because browser environment needs to be emulated
- For convenient and refactoring-resistant UI tests, DI for components is necessary, this will complicate interaction with `features` and their initialization

---

## Form Testing
<!-- TODO: insert link to form testing -->
[Form Testing]()

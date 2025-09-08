# Test Case Formation

Test case formation is not a trivial task. A unified format aims to simplify the process of forming test cases.

A unified format allows:

- Simplifying the process of forming test cases
- Increasing test case quality by answering necessary questions each time when forming test cases

# Brief Overview of Principles

<https://www.youtube.com/watch?v=DmFzvrhKyxo&ab_channel=AstralFrontend>

---

# Format

Each test case should be built according to the formula:

```jsx
it('TEST_SUBJECT + EXPECTED_RESULT + CONDITION')
```

## Examples

- `Total goods counter increases when adding goods to cart`
- `Payment process starts in background when modal is opened`
- `Postfix is added to result string`
- `Value "%s" is invalid if it's not a string`
- `Default message is overridden through parameters`
- `Content is displayed when title is clicked`
- `Tag is blocked when disabled=true`
- `onChange is called when tag is clicked`

### TEST_SUBJECT

When choosing the test subject, it's necessary to understand **WHAT** we are going to check, what object (subject) the check is directed at.

Examples of test subjects:

- `Total goods counter` increases when adding goods to cart
- `Payment process` starts in background when modal is opened
- `Result string` gets postfix added
- `Value "%s"` is invalid if it's not a string
- `Default message` is overridden through parameters
- `Content` is displayed when title is clicked
- `Tag` is blocked when disabled=true
- `onChange` is called when tag is clicked

### EXPECTED_RESULT

The second part of the test case must indicate the expected result. The expected result can be an action, state, or side effect.

Examples of expected results:

- Total goods counter `increases` when adding goods to cart
- Payment process `starts in background` when modal is opened
- Result string `gets postfix added`
- Value "%s" `is invalid` if it's not a string
- Default message `is overridden` through parameters
- Content `is displayed` when title is clicked
- Tag `is blocked` when disabled=true
- onChange `is called` when tag is clicked

### CONDITION

Condition is an optional block.

Examples of conditions:

- Total goods counter increases `when adding goods to cart`
- Payment process starts in background `when modal is opened`
- Value "%s" is invalid `if it's not a string`
- Default message is overridden `through parameters`
- Content is displayed `when title is clicked`
- Tag is blocked `when disabled=true`
- onChange is called `when tag is clicked`

---

# Test Case Grouping

Test cases can be grouped by **test subject and condition.**

**Example of grouping by test subject:**

```jsx
describe('Total goods counter', () => {
  it('Increases when adding goods before successful request execution')

  it(
    'Rolls back to original on error when adding goods to cart',
  )

  it('Decreases when removing goods before successful request execution')

  it(
    'Rolls back to original on error when removing goods from cart',
  )
})
```

**Example of grouping by condition:**

```jsx
describe('Query', () => {
  describe('When an error occurs', () => {
    it('onError is called with error text')

    it('Status flags are set to error state')

    it('Data is reset')
  })
})
```

---

# Testing Business Logic

In the architecture, business logic is located in layers: `Data` and `Modules`.

### Based on Task Requirements

**Test cases for business logic should be based on task requirements** implemented by analysts.

Task requirements, as a rule, contain **test subject**, **expected result**, and **condition**.

**Example**

Requirements:

```tsx
# Shopping Cart Payment

## Main Scenario

1. User added goods to cart
2. User went to cart
3. System displays list of goods added to cart
4. If user has saved card, then clicking "Pay" button:
    1. Payment of goods through saved card starts in background
    2. System displays modal window to show payment status
5. System redirects user to popular goods page

## Requirement 1. Implement payment error handling

If an error occurs when paying with card, then modal window should display message "Error when paying with card".
```

Part of requirements and code implementing the requirements:

```tsx
4. If user has saved card, then clicking "Pay" button:
    1. Payment of goods through saved card starts in background
```

```tsx
export class CartScreenStore {

...

  public openModal = () => {
    this.pay();
    this.modalStore.setTrue();
  };

...

  public pay = () => {
    if (!this.cardPaymentStore.isAllowCardPayment) {
      this.notifyService.info('Card payment not available');

      return;
    }

    this.cardPaymentStore.pay({
      onSuccess: () => {
        this.routerService.navigate('/popular');
      },
    });
  };
}
```

Test for the implemented part of requirements:

```tsx
describe('CartScreenStore', () => {
  // Test case name corresponds to requirements text
  it('Payment process starts in background when modal is opened', () => {
    const cartPaymentStoreMock = mock<CardPaymentStore>()
    const sut = new CartScreenStore(
      cartPaymentStoreMock,
      createRouterMock(),
      createNotifyMock(),
    )

    sut.openModal()

    expect(cartPaymentStoreMock.pay).toBeCalled()
  })
})
```

### Based on Acceptance Test Cases

Some test cases can be based on acceptance cases described by QA for the task.

Tests based on acceptance test cases are more preferable because they are created by testing specialists.

**Example**

Acceptance test case:

```tsx
# Acceptance Test Case. Successful Card Payment

## Preparation

1. In personal cabinet link card for payment
2. In "Goods" section add goods to cart
3. In header click "Cart" button

## Steps

## In cart click "Pay" button

**Expected result:**

1. Modal window with loader is displayed
2. After waiting redirect occurs to "Popular Goods" page
```

Test based on acceptance test case:

```tsx
describe('CartScreenStore', () => {
  it('Payment process starts in background when modal is opened', () => {})
})
```

---

# Testing Infrastructure Code

Infrastructure code is located in the `shared` layer.

Test case formation should be based on:

- Available state invariants

```jsx
it('isSuccess switches to true after successful request execution')
```

- Available behavior

```jsx
it('Content is displayed when header is clicked')
```

- Reaction to input parameters

```jsx
it('Content is displayed when isExpanded=true')
```

---

# Testing Based on Array of Input Values. Using it.each

To check SUT behavior based on an array of input data, `it.each` is used.

When using `it.each`, condition must be present:

```jsx
it.each(['', '9', '92', '921', '92176'])(
  'Value "%s" is invalid if field length is not 4 characters'
)
```

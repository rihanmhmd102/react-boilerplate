# Functions and Methods

## Functions and methods must start with a verb

**✨ Motivation**

A verb in the name of a function or method allows quickly understanding the action being performed.

**✅ Valid**

```ts
function calcSum() {}

function getUserData() {}

function removeID() {}

function refreshData() {}

function formatToView() {}

function createRequest() {}
```

```ts
class Example {
  public calcSum = () => {}

  public getUserData = () => {}

  public removeID = () => {}

  public refresh = () => {}

  public formatToView = () => {}
}
```

**❌ Invalid**
```ts
// Verb at the end
function sumCalc() {}

// Judging by the name, this is not a function but an object
function userDataGetter() {}

// Judging by the name, this is not a function but an object
function toViewFormatter() {}

// The name indicates that this is a process, not a function
function refreshingData() {}
```

### Functions and methods that return Boolean must start with a verb

The verb at the beginning of the function should indicate the purpose of the check being performed.

**✨ Motivation**

Adding a verb at the beginning of a function allows avoiding conflicts with Boolean variables.
The most common verb: check.

**✅ Valid**

```ts
const checkIsEmpty = (value: unknown) => remeda.isEmpty(value)

function checkWasRemoved(obj?: Record<string, unknown>): obj is undefined {
  return obj === undefined
}

function validateID(id: string) {
  return id.length === 2
}
```

```ts
class Example {
  public checkIsEmpty = (value: unknown) => remeda.isEmpty(value)

  public checkWasRemoved = (obj?: Record<string, unknown>): obj is undefined =>
    obj === undefined

  public validateID = (obj: { id?: string }) => Boolean(obj.id)
}
```

**❌ Invalid**

```ts
// Name is identical to variable
const isEmpty = (value: unknown) => remeda.isEmpty(value)

// Name is identical to variable
function hasRemoved(obj?: Record<string, unknown>): obj is undefined {
  return obj === undefined
}

// No verb
function removed(obj?: Record<string, unknown>): obj is undefined {
  return obj === undefined
}
```

```tsx
// Have to rename the function due to conflicts with parameters and variables
import { isEmpty as checkIsEmpty } from 'utils'

export function UserInfo({ data, isEmpty }: Props) {
  const isEmptyData = isEmpty && checkIsEmpty(data)

  return (
    <Grid>
      {isEmpty && <NoData />}
    </Grid>
  )
}
```

## For plural nouns, a clarifying word must be added

A clarifying word must be added: `getDrafts` -> `getDraftList`.

**✨ Motivation**

Due to plural nouns with added endings (for example, `s`), it's difficult to distinguish between a function working with one entity and multiple entities.

**✅ Valid**

```ts
class Example {
  public getDraft = () => {}
  public getDraftList = () => {}

  public sendDraft = () => {}
  public sendDraftList = () => {}

  public calcDraftSum = () => {}
  public calcDraftListSum = () => {}
}
```

---

```tsx
function DraftScreen() {}

function DraftListScreen() {}
```

**❌ Invalid**

It's difficult to visually find differences in names due to a difference of just one letter.

```ts
class Example {
  public getDraft = () => {}
  public getDrafts = () => {}

  public sendDraft = () => {}
  public sendDrafts = () => {}

  public calcDraftSum = () => {}
  public calcDraftsSum = () => {}
}
```

---

```tsx
function DraftScreen() {}

function DraftsScreen() {}
```

### It is recommended to use the `List` postfix for plural nouns

In most cases, `List` will be suitable for describing a plural noun, and preference should be given to this postfix.

**✨ Motivation**

Using different postfixes can lead to code inhomogeneity. For example, using words `Many`, `One`, `Single`, `Multiple`...

## Using `Remove` and `Delete` in names

**✨ Motivation**

Eliminating disputes about naming functions and methods for deletion.

### For business logic

If the deletion operation can be restored, `Remove` must be used,
otherwise `Delete` must be used.

**✅ Valid**

`removeAccount` - function for removing a user account with the possibility of restoring it in the future.

`removeRequest` - function that removes an application from the registry but moves it to an "archive".

`deleteRequest` - function that completely deletes an application from the system.

### For infrastructure code

It is recommended to use `Delete`.

`Remove` is used only in situations where `Delete` is not suitable semantically.

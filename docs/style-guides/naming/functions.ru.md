# Функции и методы

## Функции и методы должны начинаться с глагола

**✨ Мотивация**

Глагол в названии функции или метода позволяет быстро понять выполняемое действие.

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
// Глагол в конце
function sumCalc() {}

// Судя из названия это не функция, а объект
function userDataGetter() {}

// Судя из названия это не функция, а объект
function toViewFormatter() {}

// Название указывает, что это процесс, а не функция
function refreshingData() {}
```

### Функции и методы, возвращающие Boolean должны начинаться с глагола

Глагол в начале функции должен указывать на цель проводимой проверки.

**✨ Мотивация**

Добавление глагола в начало функции позволяет избежать пересечений с Boolean переменными.
Самый распространенный глагол: check.

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
// имя идентично переменной
const isEmpty = (value: unknown) => remeda.isEmpty(value)

// имя идентично переменной
function hasRemoved(obj?: Record<string, unknown>): obj is undefined {
  return obj === undefined
}

// нет глагола
function removed(obj?: Record<string, unknown>): obj is undefined {
  return obj === undefined
}
```

```tsx
// приходится переименовывать функцию из-за пересечений с параметрами и переменными
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

## Для существительных во множественном числе необходимо добавлять уточняющее слово

Необходимо добавлять уточняющее слово: `getDrafts` -> `getDraftList`.

**✨ Мотивация**

Из-за существительных во множественном числе с добавлением окончания (например, `s`) сложно отличить функцию, работающую с одной сущностью и несколькими

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

Сложно визуально найти отличия в названиях из-за разницы в одну букву.

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

### Рекомендуется использовать постфикс `List` для существительных во множественном числе

В большинстве случаев для описания существительного во множественном числе подойдет `List`, этому постфиксу необходимо отдавать предпочтение.

**✨ Мотивация**

Использование различных постфиксов может привести к неоднородности кода. Например, использование слов `Many`, `One`, `Single`, `Multiple`...

## Использование `Remove` и `Delete` в именах

**✨ Мотивация**

Исключение споров о нейминге функций и методов удаления.

### Для бизнес-логики

Если операция удаления производится с возможностью восстановления, то необходимо использовать `Remove`,
в противном случае необходимо использовать `Delete`.

**✅ Valid**

`removeAccount` - функция удаления аккаунта пользователя с возможностью в будущем его восстановления.

`removeRequest` - функция, удаляющая из реестра заявление, но при этом перемещающая его в "архив".

`deleteRequest` - функция полностью удаляющая заявление из системы.

### Для инфраструктурного кода

Рекомендуется использовать `Delete`.

`Remove` используется только в ситуациях, когда `Delete` не подходит по семантике.

# useLogic

`useLogic` предназначен для реализации логики фичи, сильно зацепленной на используемую react-библиотеку и фичи самого react.
Если логику можно реализовать без использования хука, то стоит отдать предпочтение [UIStore](./ui-store.ru.md).

```
├── payment-form/
|    ├── ui-store/
|    ├── use-logic/
|    |    |── utils/
|    |    |── hooks/
|    |    |── use-logic.ts
|    |    |── use-logic.test.ts
|    |    |── constants.ts
|    |    |── enums.ts
|    |    |── types.ts
|    |    └── index.ts
|    ├── payment-form.tsx
|    └── index.ts
```

## useLogic - единственная точка входа данных для компонента

Если в фиче есть `useLogic`, то только из него должны потребляться данные для компонента.
Даже если в фиче используется UIStore или другие stores:

```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

function Card(props: Props) {
  const uiStore = useLocalObservable(() => createUIStore(props))

  const { fullName, isShowDescription, description } = useLogic(uiStore)

  return (
    <Wrapper>
      <Typography>{fullName}</Typography>
      {isShowDescription && <Typography>{description}</Typography>}
    </Wrapper>
  )
}
```

```ts
export function useLogic(store: UIStore) {
  const isShowDescription = useEndScroll()

  return {
    isShowDescription,
    fullName: store.fullName,
    description: store.fullName,
  }
}
```

Hook должен возвращать абстрактный интерфейс, с которым работает компонент.

Благодаря этой абстрации появляется возможность изменить инструмент реализации логики, при этом оставить выходной интерфейс и ui неизменными.

## Взаимодействие с UIStore

`useLogic` должен принимать `UIStore` и другие stores параметром по ссылке для возможности более простого тестирования:

```ts
export function useLogic(store: UIStore) {
  const isShowDescription = useEndScroll()

  return {
    isShowDescription,
    fullName: store.fullName,
    description: store.fullName,
  }
}
```

### Инициализация UIStore

`UIStore` при использовании `useLogic` инициализируется в компоненте и передается в `useLogic`:

```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

function Card(props: Props) {
  const uiStore = useLocalObservable(createUIStore)

  const { fullName, isShowDescription, description } = useLogic(uiStore)

  return (
    <Wrapper>
      <Typography>{fullName}</Typography>
      {isShowDescription && <Typography>{description}</Typography>}
    </Wrapper>
  )
}
```

### Зависимости

`UIStore` не должен зависеть от `useLogic`:

![LogicDeps](../../../images/logic-deps.png)

Типы должны импортироваться из `UIStore` и `useLogic`.
А в свою очередь компонент для формирования своих props может использовать типы как из `useLogic`, так и из `UIStore`.

## Разделение зон ответственности между UIStore и useLogic

### Зона ответственности store

- Работа с данными. Взаимодействие с слоем `data`
- Форматирование данных для отображения, если эти данные не завязаны на изменение state формы

<!-- TODO: переписать согласно новому способу взаимодействовия с формами -->
## Зона ответственности hooks

### Описание типов формы

`useLogic` должен содержать типы формы:

```tsx
export interface BookFormValues {
  name: string
  genre: BookRepositoryDTO.GenreDTO
  pageCount: string
  author: AdministrationRepositoryDTO.CreateBookInputDTO['author']
  coAuthor?: AdministrationRepositoryDTO.CreateBookInputDTO['coAuthor']
  isPresentCoAuthor: boolean
}
```

### Валидация формы

`useForm` должен взаимодействовать с валидацией формы:

```tsx
const validationSchema = v.object<BookFormValues>({
  name: v.string(),
  genre: v.object<BookFormValues['genre']>({
    id: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
  }),
  pageCount: v.number(),
  author: v.object<BookFormValues['author']>({
    name: v.string(),
    surname: v.string(),
  }),
  isPresentCoAuthor: v.optional(v.boolean()),
  coAuthor: v.when({
    is: (_, ctx) => Boolean(ctx.values?.isPresentCoAuthor),
    then: v.object<BookFormValues['author']>({
      name: v.string(),
      surname: v.string(),
    }),
    otherwise: v.any(),
  }),
});

export const useLogic = () => {
  const form = useForm<BookFormValues>({ validationSchema });

 ...

};
```

### Инициализация формы с необходимыми параметрами

```tsx
export const useLogic = (): Result => {
  const form = useForm<BookFormValues>({ validationSchema });

 ...

};
```

### Подписка на изменение полей и state формы

```tsx
export function useLogic(store: UIStore, { onSubmit }: Params): Result {
  const form = useForm<BookFormValues>({ validationSchema })

  const isPresentCoAuthor = form.watch('isPresentCoAuthor')

  const name = form.watch('name')

  useEffect(() => {
    store.findBook(name)
  }, [name])

  return { form, isPresentCoAuthor, submit: form.handleSubmit(onSubmit) }
}
```

### Формирование данных для отображения

Если данные для отображения завязаны на изменение state формы, то логика форматирования помещается в хук:

```tsx
export function useLogic(): Returned {
  const { watch } = useBookFormContext()

  const { name, author } = watch()

  return {
    name,
    authorFullName: `${author.name} ${author.surname}`,
  }
}
```

## При использовании useLogic в компоненте не должно оставаться никакой логики, кроме инициализации

В `useLogic` переносятся из компонента:

- Подвязка на `mount`, `unmount`
- Создание `ref`
- Обработка событий

## Style guide

[Style Guide | useLogic]("../../../style-guides/ru/architecture/modules/features/logic-hook.md")

## Тестирование

Тестировать store и hook необходимо отдельно.

# Отделение логики от view

UI компонент должен быть ответственным **только за отображение,** количество ui логики в компоненте должно быть сведено к нулю.

Вся логика реализуется вне компонента в [`UIStore`](./ui-store.ru.md) или [`useLogic`](./use-logic.ru.md).

![UILogic](../../../images/ui-logic.png)

## Мотивация

Отделение view слоя от логики дает следующие преимущества:

- Возможность изменять логику и ui независимо
- Простота переиспользования логики или ui по необходимости
- Независимость от используемого фреймворка. Фреймворк при определенных обстоятельствах можно заменить, а логику переиспользовать
- Простота тестирования. Возможность тестировать отдельно логику и ui
- Однозначность расположения логики. Вся логика всегда находится в одном месте
- Логика не "размазывается" по компонентам. Избавляет от сложностей в поддержке кода
- Повышение читаемости кода
- Упрощение поддержки приложения

## UI компонент

Компонент должен содержать только то, что непосредственно связано с фреймворком, ответственным за отображение.

### ❌ Компонент не должен содержать

Все нижеперечисленные функции должны находиться в [`UIStore`](./ui-store.ru.md) или [`useLogic`](./use-logic.ru.md).

#### Логика форматирования данных для отображения

##### Форматирование дат для отображения

###### ❌ Invalid
```tsx
export function Card({ date }: Props) {
  return (
    <Wrapper>
      <IssueDate>{date.toLocaleDateString()}</IssueDate>
    </Wrapper>
  )
}
```

###### ✅ Valid
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function Card(props: Props) {
  const { issueDate } = useLocalObservable(() => createUIStore(props))

  return (
    <Wrapper>
      <IssueDate>{issueDate}</IssueDate>
    </Wrapper>
  )
}
```

---

##### Склеивание строк для отображения

###### ❌ Invalid
```tsx
export function Card({ name, surname }: Props) {
  return (
    <Wrapper>
      <Typography>{`${name} ${surname}`}</Typography>
    </Wrapper>
  )
}
```

###### ✅ Valid
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function Card(props: Props) {
  const { fullName } = useLocalObservable(() => createUIStore(props))

  return (
    <Wrapper>
      <Typography>{fullName}</Typography>
    </Wrapper>
  )
}
```

---

#### Формирование массивов или объектов

##### ❌ Invalid
```tsx
export function List({ list }: Props) {
  const data = useMemo(
    () => list.map(({ name, surname }) => `${name} ${surname}`),
    [list],
  )

  return (
    <Wrapper>
      {data.map(fullName => (
        <li key={fullName}>
          <Typography>{fullName}</Typography>
        </li>
      ))}
    </Wrapper>
  )
}
```

###### ✅ Valid
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function List({ list }: Props) {
  const { data, updateList } = useLocalObservable(() => createUIStore(list))

  useEffect(() => {
    updateList(list)
  }, [list])

  return (
    <Wrapper>
      {data.map(fullName => (
        <li key={fullName}>
          <Typography>{fullName}</Typography>
        </li>
      ))}
    </Wrapper>
  )
}
```

---

#### Форматирование props для компонентов

##### ❌ Invalid
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function Card() {
  const { name, list } = useLocalObservable(createUIStore)

  return (
    <Wrapper>
      <Viewer
        title={`Подробная информация о ${name}`}
        descriptions={list.map(({ description }) => description)}
      />
    </Wrapper>
  )
}
```

##### ✅ Valid
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function Card() {
  const { viewerTitle, descriptions } = useLocalObservable(createUIStore)

  return (
    <Wrapper>
      <Viewer
        title={viewerTitle}
        descriptions={descriptions}
      />
    </Wrapper>
  )
}
```

#### Расчет флагов, отвечающих за отображение частей ui

##### ❌ Invalid
```tsx
export function Card({ name, isOwner }: Props) {
  const isShowTitle = Boolean(name) && isOwner

  return <Wrapper>{isShowTitle && <Title>Заголовок</Title>}</Wrapper>
}
```

##### ✅ Valid
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function Card({ name, isOwner }: Props) {
  const { isShowTitle } = useLocalObservable(() => createUIStore({ name, isOwner }))

  return <Wrapper>{isShowTitle && <Title>Заголовок</Title>}</Wrapper>
}
```

### ✅ В компоненте может находится

ℹ️ Все нижеперечисленные ниже функции могут находиться как в компоненте, так и в `useLogic`, если `useLogic` определен.

#### Получение ref и передача HTMLElement в логику для последующей обработки

Пример:
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function Card() {
  const { setContainer } = useLocalObservable(createUIStore)

  const containerRef = useRef()

  useEffect(() => {
    setContainer(containerRef.current)
  }, [])

  return (
    <Wrapper ref={containerRef}>
      ...
    </Wrapper>
  )
}
```

#### Подвязка логики к методам жизненного цикла компонента

Пример:
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function Card() {
  const { mount, unmount } = useLocalObservable(createUIStore)

  useEffect(() => {
    mount()

    return unmount
  }, [])

  return <Wrapper>...</Wrapper>
}
```

#### Определение обработчиков событий

Пример:
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function Input() {
  const { value, changeValue } = useLocalObservable(createUIStore)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeValue(event.target.value)
  }

  return <input type="text" onChange={handleChange} value={value} />
}
```

Примечание: SyntheticEvent являются частью React, поэтому проникновение events в слой логики нежелательно.

#### Определение render функций

Пример:
```tsx
import { useLocalObservable } from 'mobx-react-lite'

import { createUIStore } from './ui-store'

export function Status() {
  const { statusType, info } = useLocalObservable(createUIStore)

  const renderStatus = () => {
    switch (statusType) {
      case StatusType.Success:
        return <SuccessStatus />
      case StatusType.Error:
        return <ErrorStatus />
      default:
        return <Info data={info} />
    }
  }

  return <Wrapper>{renderStatus()}</Wrapper>
}
```

**UI компонент потребляет логику фичи и полностью зависит от ее интерфейсов.**

## Логика

В рамках `features` бизнес-логика и ui логика не разделяется.

Логика в `feature` содержит:

- Формирование данных для отображения в ui
- Работу с данными, взаимодействие с `Data` слоем
- Работу с флагами, которые в компоненте будут ответственны за отображение компонента (например, удаление из DOM, изменение цвета и т.п.)

**Логика фичи не должна зависеть от ui компонента**. **Зависимости направлены от ui к логике:**

![UILogic](../../../images/ui-logic.png)

Логика может быть реализована на любом предпочтительном стэке с использованием:

- state manager
- hook (React стэк)
- service
- utils

### Мотивация объединения бизнес и ui логики в фиче

- Если оставлять ui логику в компоненте, то велика вероятность просачивания бизнес логики в компонент
- В реальном проекте зачастую достаточно сложно решить что относится к бизнес логике, а что относится к ui. Возникают ситуации, когда разработчики замедляются в реализации фичи из-за дилеммы: куда поместить эту логику? В компонент или в store?

### Реализация UI логики

Для реализации логики рекомендуется использовать state manager в [UIStore](./ui-store.ru.md).

State manager позволит:

- Не завязываться на специфику ui фреймворка
- Избежать нежелательных зависимостей от ui. Технически невозможно в state manager поместить специфику ui фреймворка
- Писать простые тесты для логики

Использование react hooks допустимо для реализации логики в [useLogic](./use-logic.ru.md), но желательно избегать данного сценария.
Так как hooks - это часть react, то в них доступны все методы по работе с ui, это значит в логику проникнет специфика фреймворка.

Из этого могут возникнуть проблемы:

- Невозможность переиспользования логики в другом стэке
- Смешивание ui и логики. Без контроля в hooks будет попадать логика работы с ref, react событиями и т.п.
- Невозможность переиспользования логики из-за косвенной зависимости от ui
- Сложность работы с глобальными данными
- Сложность тестирования. Для тестирования hooks необходимы дополнительные инструменты (react-testing-library, jsdom | happydom)

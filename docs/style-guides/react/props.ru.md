# Props

## Типы Props должны находится в файле компонента

**✨ Мотивация**

Нахождение Props типов в файле компонента позволяет:

- Избежать оверхеда по созданию отдельного файла для типов Props
- Избежать [проблем ошибочного направления зависимостей компонентов](#проблема-неправильного-направления-зависимостей)

**✅ Valid**

```user-info.tsx```

```tsx
interface Props {
  title: string
  userName: string
  onClick: () => void
}

export function UserInfo({ title, userName, onClick }: Props) {
  return (
    <Grid>
      <Typography>{title}</Typography>
      <Typography>{userName}</Typography>
      <Button onClick={onClick}>Показать</Button>
    </Grid>
  )
}
```

**❌ Invalid**

```user-info/user-info.tsx```

```tsx
import type { UserInfoProps } from './types'

export function UserInfo({ title, userName, onClick }: ButtonProps) {
  return (
    <Grid>
      <Typography>{title}</Typography>
      <Typography>{userName}</Typography>
      <Button onClick={onClick}>Показать</Button>
    </Grid>
  )
}
```

```user-info/types.ts```

```ts
export interface UserInfoProps {
  title: string
  userName: string
  onClick: () => void
}
```

### Проблема неправильного направления зависимостей компонентов

Вынесение Props в отдельный файл ```types.ts``` может приводить к тому, что Props дочерних компонентов будут зависеть от Props родителя:

```
├── user-card/
|    ├── header/
|    |    └── header.tsx
|    |    └── types.ts
|    |    └── index.ts
|    ├── user-card.tsx
|    ├── types.ts
|    └── index.ts
```

```user-card/types.ts```

```ts
export interface UserCardProps {
  headerTitle: ReactNode
}
```

```HeaderProps``` зависит от Props родительского компонента ```UserCardProps```:

```user-card/header/types.ts```

```ts
import type { UserCardProps } from '../types'

export interface HeaderProps {
  title: UserCardProps['headerTitle']
}
```

При этом компонент ```UserCard``` зависит от компонента ```Header``` (использует его внутри):

```tsx
export function UserCard({ title }: UserCardProps) {
  return (
    <Header title={title} />
  )
}
```

Такие связи порождают **циклические зависимости** не только на уровне импорта es модулей, но и на уровне проектирования компонентов:

- Возникнут сложные связи
- Возникнет высокое зацепление
- Сложно вынести дочерний компонент для переиспользования

Публичное API родительского компонента должно собираться из типов дочерних компонентов с однонаправленной связью.

## Все Props с маленькой буквы

**✨ Мотивация**

Упрощение формирования имен для props.

**✅ Valid**

```ts
interface Props {
  title: string
  userName: string
  onClick: () => void
  footer: ReactNode
  header: FunctionComponent
}
```

**❌ Invalid**

```ts
interface Props {
  title: string
  userName: string
  onClick: () => void
  Footer: ReactNode
  Header: FunctionComponent
}
```

## Все props обработчики с префиксом ```on```

**✨ Мотивация**

Идентификация обработчиков по названию.

**✅ Valid**

```ts
interface Props {
  onClick: () => void
  onChange: () => void
  onDelete: () => void
}
```

**❌ Invalid**

```ts
interface Props {
  handleClick: () => void
  remove: () => void
  clickHandler: () => void
}
```

## Boolean props должны иметь префикс, указывающий на принадлежность к Boolean

Соответствует [единому правилу нейминга Boolean переменных](../naming/vars#boolean-переменные-должны-иметь-префикс-указывающий-на-принадлежность-к-boolean).

## Строковые props передаются через двойные кавычки

**✨ Мотивация**

Стандартизация способа передачи props.

**✅ Valid**

```tsx
<Dialog title="Создание заявления" />
<Dialog title={isOrg ? 'Создание заявление ЮЛ' : 'Создание заявление ИП'} />
```

**❌ Invalid**

```tsx
<Dialog title="Создание заявления" />
```

# Props

## Props types must be located in the component file

**✨ Motivation**

Having Props types in the component file allows:

- Avoiding overhead from creating a separate file for Props types
- Avoiding [problems with incorrect dependency direction of components](#problem-of-incorrect-dependency-direction)

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
      <Button onClick={onClick}>Show</Button>
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
      <Button onClick={onClick}>Show</Button>
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

### Problem of incorrect dependency direction

Moving Props to a separate file ```types.ts``` can lead to child component Props depending on parent Props:

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

```HeaderProps``` depends on the parent component's Props ```UserCardProps```:

```user-card/header/types.ts```

```ts
import type { UserCardProps } from '../types'

export interface HeaderProps {
  title: UserCardProps['headerTitle']
}
```

At the same time, the ```UserCard``` component depends on the ```Header``` component (uses it inside):

```tsx
export function UserCard({ title }: UserCardProps) {
  return (
    <Header title={title} />
  )
}
```

Such relationships create **circular dependencies** not only at the es module import level but also at the component design level:

- Complex relationships will arise
- High coupling will arise
- It will be difficult to extract a child component for reuse

The parent component's public API should be assembled from child component types with a unidirectional relationship.

## All Props start with a lowercase letter

**✨ Motivation**

Simplifying the formation of names for props.

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

## All handler props with the ```on``` prefix

**✨ Motivation**

Identification of handlers by name.

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

## Boolean props must have a prefix indicating their Boolean nature

Corresponds to [unified rule for naming Boolean variables](../naming/vars#boolean-variables-must-have-a-prefix-indicating-their-boolean-nature).

## String props are passed through double quotes

**✨ Motivation**

Standardization of the way props are passed.

**✅ Valid**

```tsx
<Dialog title="Create application" />
<Dialog title={isOrg ? 'Create legal entity application' : 'Create individual entrepreneur application'} />
```

**❌ Invalid**

```tsx
<Dialog title="Create application" />
```

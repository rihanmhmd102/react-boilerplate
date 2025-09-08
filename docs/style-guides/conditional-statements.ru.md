# Условные операторы

## Запрещено использовать вложенные тернарные операторы

**✨ Мотивация**

Вложенные тернарные операторы значительно усложняют восприятие кода.

**❌ Invalid**

```ts
function getColor(variant: Variant, darkMode: boolean) {
  return darkMode
    ? variant === 'primary'
      ? darkTheme.primary
      : darkTheme.secondary
    : variant === 'primary'
      ? lightTheme.primary
      : lightTheme.secondary
}
```

```tsx
function Info({ list, type }: Props) {
  return (
    <div>
      {list.length
        ? (
            type === 'auth'
              ? (
                  <AuthInfo />
                )
              : (
                  <NoAuthInfo />
                )
          )
        : (
            <NoData />
          )}
    </div>
  )
}
```

**✅ Valid**

```ts
function getColor(variant: Variant, darkMode: boolean) {
  if (darkMode) {
    return variant === 'primary' ? darkTheme.primary : darkTheme.secondary
  }

  return variant === 'primary' ? lightTheme.primary : lightTheme.secondary
}
```

```tsx
function Info({ list, type }: Props) {
  return (
    <div>
      {list.length && <NoData />}
      {!list.length && type === 'auth' ? <AuthInfo /> : <NoAuthInfo />}
    </div>
  )
}
```

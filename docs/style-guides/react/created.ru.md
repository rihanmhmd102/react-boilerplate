# Создание компонентов

## Каждый компонент должен находится в отдельной директории

**✨ Мотивация**

Отдельная директория для каждого компонента позволяет:

- Видеть однозначную связь компонента со связанными сущностями:
  - Utils
  - Stores
  - Hooks
  - Constants
  - Styles
  - Types
  - Вложенные компоненты
  - ...
- Видеть однозначную связь компонента с его тестами
- Декомпозировать и расширять сущности, входящие в состав компонента, без необходимости рефакторинга (создание отдельной директории для компонента)
- Переносить компоненты со связанными сущностями в другие слои приложения без необходимости рефакторинга компонента

**✅ Valid**

```
├── user-info/
|    ├── header/
|    |    |── hooks/
|    |    |── utils/
|    |    |── Header.tsx
|    |    └── index.ts
|    ├── user-info.tsx
|    ├── user-info.test.tsx
|    ├── constants.ts
|    ├── types.ts
|    └── index.ts
├── button/
|    ├── button.tsx
|    └── index.ts
```

## Имена компонентов и их директорий должны соответствовать kebab-case

**✨ Мотивация**

Стандартизация имен компонентов.

**✅ Valid**

```
├── user-info/
|    ├── user-info.tsx
|    └── index.ts
├── button-group/
|    ├── button-group.tsx
|    └── index.ts
```

**❌ Invalid**

```
├── userInfo/
|    ├── userInfo.tsx
|    └── index.ts
├── buttonGroup/
|    ├── buttonGroup.tsx
|    └── index.ts
```

## Для `React.Fragment` предпочтительна краткая нотация

Исключение, когда должна использоваться расширенная нотация - необходим `key` prop.

**✨ Мотивация**

Уменьшение количества кода в компоненте.

**✅ Valid**

```tsx
function Info() {
  return (
    <>
      <Typography>Имя</Typography>
      <Typography>Фамилия</Typography>
    </>
  )
}
```

```tsx
export function List({ list }: Props) {
  return list.map(({ name, surname }) => {
    <Fragment key={name}>
      <Typography>Имя</Typography>
      <Typography>Фамилия</Typography>
    </Fragment>
  })
}
```

**❌ Invalid**

```tsx
export function Info() {
  return (
    <Fragment>
      <Typography>Имя</Typography>
      <Typography>Фамилия</Typography>
    </Fragment>
  )
}
```

## Работа с constants

Единые правила описаны в разделе [Constants](../constants).

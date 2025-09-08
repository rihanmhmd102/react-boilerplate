# Вложенные структуры

В данном разделе описаны правила и рекомендации реализации вложенных структур: React-компонентов, hooks, классов, utils...

## Нейминг вложенных структур не должен содержать префиксы родителя

**✨ Мотивация**

Добавление префиксов в названия вложенных структур приводит к сложному восприятию структуры проекта.

**✅ Valid**

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

```user-card/header.tsx```

```tsx
export const Header = () => {...};
```

**❌ Invalid**

```
├── user-card/
|    ├── user-card-header/
|    |    └── user-card-header.tsx
|    |    └── types.ts
|    |    └── index.ts
|    ├── user-card.tsx
|    ├── types.ts
|    └── index.ts
```

```user-card/user-card-header/user-card-header.tsx```

```tsx
export const UserCardHeader = () => {...};
```

## Группировка разрешена

**✨ Мотивация**

Может потребоваться группировка вложенных структур.
Ограничений по группировке нет.

**Примеры**

```
├── doc-form/
|    ├── steps/
|    |    |── user-step/
|    |    |── doc-step/
|    ├── doc-form.tsx
|    └── index.ts
```

```
├── cart-store/
|   ├── utils/
|   |    ├── formatters/
|   |    |    |── format-price-to-view/
|   |    |    |── format-country-to-view/
|   |    |    └── index.ts
|   |    |── get-address/
|   |    └── index.ts
|   |── cart-store.ts
|   └── index.ts
```

## Рекомендации

### Уровень вложенности не должен превышать 4

ℹ️ Рекомендация

**✨ Мотивация**

Большая вложенность:

- Свидетельствует о проблемах в проектировании. Возможно, нарушение принципа единственной ответственности SOLID
- Приводит к сложностям поддержки структуры
- Приводит к трудностям восприятия структуры проекта

Если вложенность директорий корневой сущности превышает число 4, то стоит задуматься о рефакторинге.

**Пример**

При разборе примера ниже можно прийти к выводу, что сильная вложенность обусловлена нарушением принципа единственной ответственности:
```ProfileForm``` - самостоятельная единица, которая должна быть вынесена вне компонента ```UserForm```.

```
├── user-form/
|    ├── header/
|    |    ├── profile-form/
|    |    |    ├── base-fields/
|    |    |    |    |── header/
|    |    |    |    |    |── name-input/
|    |    |    |    |    |    |── name-icon/
|    |    |    |    |    |    |    |── name-icon.tsx
|    |    |    |    |    |    |    └── index.ts
|    |    |    |    |    |    |── name-input.tsx
|    |    |    |    |    |    └── index.ts
|    |    |    |    |    |── header.tsx
|    |    |    |    |    └── index.ts
|    |    |    |    |── base-fields.tsx
|    |    |    |    └── index.ts
|    |    |    ├── profile-form.tsx
|    |    |    └── index.ts
|    |    ├── header.tsx
|    |    └── index.ts
|    ├── user-form.tsx
|    └── index.ts
```

Отрефакторенный вариант:

```
├── user-form/
|    ├── header/
|    |    ├── header.tsx
|    |    └── index.ts
|    ├── user-form.tsx
|    └── index.ts
├── profile-form/
|    ├── base-fields/
|    |    |── header/
|    |    |    |── name-input/
|    |    |    |    |── name-icon/
|    |    |    |    |    |── name-icon.tsx
|    |    |    |    |    └── index.ts
|    |    |    |    |── name-input.tsx
|    |    |    |    └── index.ts
|    |    |    |── header.tsx
|    |    |    └── index.ts
|    |    |── base-fields.tsx
|    |    └── index.ts
|    ├── profile-form.tsx
|    └── index.ts
```

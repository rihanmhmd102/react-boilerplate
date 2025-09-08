# Зависимости фичей

Если одной фиче необходимо использовать другую, то их интеграцию стоит делать не на уровне `features`, а на уровне `screens`.

Это помогает уменьшить зацепление фичей и повысить их переиспользуемость.

## Основная концепция

Features могут зависеть от:

- Shared слоя
- Data слоя
- Domain других модулей
- Features других модулей

Важно контролировать зависимости между features и следить за тем, чтобы уровень зацепления был наименьшим.

## Контроль зависимостей

### Использование index файлов

Для контроля зависимостей между features используются index файлы, которые предоставляют публичное API модуля.

Пример структуры:

```
├── app/
├── screens/
├── modules/
|    ├── payment/
|    |    ├── features/
|    |    |    ├── payment-switch/
|    |    |    |    ├── payment-switch.tsx
|    |    |    |    └── index.ts
|    |    |    ├── card-payment/
|    |    |    |    ├── card-payment.tsx
|    |    |    |    └── index.ts
|    |    |    └── index.ts
|    |    └── index.ts
|    ├── cart/
|    |    ├── features/
|    |    |    ├── add-to-cart-button/
|    |    |    |    ├── add-to-cart-button.tsx
|    |    |    |    └── index.ts
|    |    |    └── index.ts
|    |    └── index.ts
├── data/
└── shared/
```

### Публичное API модуля

Каждый модуль должен предоставлять публичное API через index файлы.

Пример index.ts для features:

```ts
export { CardPayment } from './card-payment'
// modules/payment/features/index.ts
export { PaymentSwitch } from './payment-switch'
```

Импорты из модуля должны идти только через index файлы:

Valid:

```ts
import { CardPayment } from '@modules/payment/features'
```

Invalid:

```ts
import { CardPayment } from '@modules/payment/features/card-payment'
```

### External файлы

Для контроля входящих зависимостей используются external файлы.

Пример структуры:

```
├── modules/
|    ├── payment/
|    |    ├── features/
|    |    |    ├── card-payment/
|    |    |    |    ├── card-payment.tsx
|    |    |    |    ├── external.ts
|    |    |    |    └── index.ts
|    |    |    └── index.ts
|    |    ├── external.ts
|    |    └── index.ts
```

Пример external.ts:

```ts
export { UserStore } from '@modules/auth/domain'
// modules/payment/features/card-payment/external.ts
export { AddToCartButton } from '@modules/cart/features'
```

Импорты из других модулей должны идти только через external файлы:

Valid:

```ts
// modules/payment/features/card-payment/card-payment.tsx
import { AddToCartButton } from './external'
```

Invalid:

```ts
// modules/payment/features/card-payment/card-payment.tsx
import { AddToCartButton } from '@modules/cart/features/add-to-cart-button'
```

## Уровни зависимости

### Shared слой

Features могут свободно использовать shared слой без ограничений.

Пример:

```ts
import { Button } from '@shared/ui/components/button'
import { formatDate } from '@shared/utils/format-date'
```

### Data слой

Features могут использовать repositories из data слоя через dependency injection.

Пример:

```ts
// domain/stores/cart-store.ts
import { CartRepository } from '@data/repositories/cart-repository'

export class CartStore {
  constructor(private readonly cartRepository: CartRepository) {}
}
```

### Domain других модулей

Features могут использовать domain других модулей через external файлы.

Пример:

```ts
// modules/payment/features/card-payment/external.ts
// modules/payment/features/card-payment/card-payment.tsx
import { UserStore } from './external'

export { UserStore } from '@modules/auth/domain'
```

### Features других модулей

Features могут использовать features других модулей через external файлы.

Пример:

```ts
// modules/catalog/features/catalog-card/external.ts
// modules/catalog/features/catalog-card/catalog-card.tsx
import { AddToCartButton } from './external'

export { AddToCartButton } from '@modules/cart/features'
```

## Циклические зависимости

Циклические зависимости между features недопустимы. Они приводят к:

- Усложнению архитектуры
- Повышению зацепления
- Сложностям в тестировании
- Проблемам с сборкой

Для избежания циклических зависимостей:

1. Используйте внешние зависимости через external файлы
2. Выносите общую логику в domain слой
3. Разбивайте большие features на smaller components
4. Следите за архитектурой модулей

## Тестирование зависимостей

При тестировании features необходимо мокать зависимости:

```ts
// card-payment.test.tsx
import { mock } from 'jest-mock-extended'

import { AddToCartButton } from './external'

jest.mock('./external', () => ({
  AddToCartButton: mock(),
}))
```

## Best Practices

1. Минимизируйте количество зависимостей
2. Используйте принцип "Dependency Inversion"
3. Контролируйте публичное API через index файлы
4. Используйте external файлы для внешних зависимостей
5. Избегайте циклических зависимостей
6. Тестируйте зависимости через моки

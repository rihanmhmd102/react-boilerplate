# Import/Export ES Modules

## Необходимо отдавать предпочтение именованным экспортам

Дефолтный экспорт используется только в том случае, если это необходимо по техническим причинам (например, **react lazy**).

**✨ Мотивация**

Дефолтные экспорты заставляют производить дополнительные затраты на нейминг при каждом импорте.

**✅ Valid**

```ts
export const Header = () => {...};

export class CartStore {
  ...
};

export const API_URLS = { ... }
```

```ts
import { API_URLS } from './constants'
import { Header } from './header'
import { CartStore } from './store'
```

**❌ Invalid**

```ts
export default = () => {...};
```

```ts
class CartStore {
  ...
};

export default CartStore;
```

```ts
export default {
  main: '/main'
}
```

```ts
import API_URLS from './constants'
import Header from './header'
import CartStore from './store'
```

## `Export` указывается сразу для экспортируемой сущности

**✨ Мотивация**

Уменьшение количества дополнительного кода, не несущего смысловой нагрузки.

**✅ Valid**

```ts
export const API_URL = {}

export class CartStore {};

export function UserCard() {}
```

**❌ Invalid**

```ts
const API_URL = {}

class CartStore {};

function UserCard() {}

export {
  API_URL,
  CartStore,
  UserCard
}
```

## Импорт из директорий осуществляется посредством файла `index`

**✨ Мотивация**

Импорт посредством `index` файлов позволяет достичь хорошего уровня инкапсуляции модулей и контролировать публичный интерфейс.
Все, что экспортируется из `index` файла, является публичными сущностями, с которыми можно взаимодействовать из вне.
Все, что не экспортируется из `index` файла, является приватными сущностями, с ними взаимодействовать из вне нельзя.

**✅ Valid**

```
├── features/
|    ├── user-card/
|    ├── profile/
|    └── index.ts
```

```features/index.ts```

```ts
export { Profile } from './profile'
export { UserCard, type UserCardProps } from './user-card'
```

```ts
import { UserCard } from './features';

...
```

---

```
├── user-service/
|    ├── utils/
|    ├── constants.ts
|    ├── enums.ts
|    ├── types.ts
|    ├── user-service.ts
|    ├── user-service.test.ts
|    └── index.ts
```

```user-service/index.ts```

```ts
export { type UserInfo } from './types'
export { UserService } from './user-service'
```

```ts
import { type UserInfo } from './user-service';

...
```

**❌ Invalid**

Отсутствует `index.ts`

```
├── user-service/
|    ├── utils/
|    ├── constants.ts
|    ├── enums.ts
|    ├── types.ts
|    ├── user-service.ts
|    └── user-service.test.ts
```

---

Импорт "лезет" во внутреннюю структуру модуля

```ts
import { UserCard } from './featues/user-card/user-card';
import { type UserInfo } from './user-service/types';

...
```

## Запрещены импорты без указания целевого es module

Пример:

```ts
import { UserService } from '../'
```

**✨ Мотивация**

Импорты без целевого модуля создают циклические зависимости.

**✅ Valid**

```
├── uart-service/
├── user-service/
└── index.ts
```

```index.ts```

```ts
export * from './cart-service'
export * from './user-service'
```

```cart-service/cart-service.ts```

```ts
import { UserService } from '../user-service'

class CartService {
  constructor(private readonly userService: UserService) {}
}
```

**❌ Invalid**

```
├── cart-service/
├── user-service/
└── index.ts
```

```index.ts```

```ts
export * from './cart-service'
export * from './user-service'
```

```cart-service/cart-service.ts```

```ts
// Из-за того, что импорт идет через index.ts файл может образоваться циклическая зависимость
import { UserService } from '../'

class CartService {
  constructor(private readonly userService: UserService) {}
}
```

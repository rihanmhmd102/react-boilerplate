# DTO

Описанные правила актуальны для **repositories** и **sources**.

## DTO описываются в отдельном файле `dto.ts`

**✨ Мотивация**

Хранение в едином месте dto.

**✅ Valid**

```
├── repositories/
|    ├── user-repository/
|    |    |── user-repository.ts
|    |    |── dto.ts
|    |    └── index.ts
|    └── index.ts
├── sources/
|    ├── user-network-sources/
|    |    |── user-network-sources.ts
|    |    |── dto.ts
|    |    └── index.ts
|    └── index.ts
```

**❌ Invalid**

```
├── repositories/
|    ├── user-repository/
|    |    |── user-repository.ts
|    |    |── user-repository.dto.ts
|    |    └── index.ts
|    ├── cart-repository/
|    |    |── cart-repository.ts
|    |    |── types.ts
|    |    └── index.ts
|    └── index.ts
```

## DTO организуются через модули с `export * as`

**✨ Мотивация**

- Позволяет избежать пересечений имен типов между repositories и sources
- Избавляет от необходимости описывать длинные имена для DTO с префиксами
- Использует современный ES модульный подход вместо namespace
- Обеспечивает лучшую читаемость и организацию экспортов

**✅ Valid**

```user-network-sources/dto.ts```

```ts
export interface Contacts {
  email?: string
  phone: string
}

export interface Person {
  name: string
  surname: string
  displayName: string
}
```

```user-network-sources/index.ts```

```ts
export * as UserNetworkSourcesDTO from './dto'
```

```user-repository/dto.ts```

```ts
import { UserNetworkSourcesDTO } from '../../sources'

export type UserContact = UserNetworkSourcesDTO.Contacts
export type UserPerson = UserNetworkSourcesDTO.Person
export type UserFullInfoDTO = UserNetworkSourcesDTO.Person
  & UserNetworkSourcesDTO.Contacts
```

**❌ Invalid**

```user-network-sources/dto.ts```

```ts
export interface UserNetworkSourcesContactsDTO {
  email?: string
  phone: string
}

export interface UserNetworkSourcesPersonDTO {
  name: string
  surname: string
  displayName: string
}
```

```user-repository/dto.ts```

```ts
import type {
  UserNetworkSourcesContactsDTO,
  UserNetworkSourcesPersonDTO
} from '../../sources'

export type UserRepositoryContactsDTO = UserNetworkSourcesContactsDTO
export type UserRepositoryPersonDTO = UserNetworkSourcesPersonDTO
export type UserRepositoryFullInfoDTO = UserNetworkSourcesPersonDTO
  & UserNetworkSourcesContactsDTO
```

### Экспорты имеют постфикс `SourcesDTO` или `RepositoryDTO`

**✨ Мотивация**

Идентификация принадлежности модуля к sources или repositories при использовании `export * as`.

**✅ Valid**

```user-network-sources/dto.ts```

```ts
export interface Contacts {
  email?: string
  phone: string
}

export interface Person {
  name: string
  surname: string
  displayName: string
}
```

```user-network-sources/index.ts```

```ts
export * as UserNetworkSourcesDTO from './dto'
```

```user-repository/dto.ts```

```ts
export type UserContact = UserNetworkSourcesDTO.Contacts
export type UserPerson = UserNetworkSourcesDTO.Person
export type UserFullInfo = UserNetworkSourcesDTO.Person
  & UserNetworkSourcesDTO.Contacts
```

```user-repository/index.ts```

```ts
export * as UserRepositoryDTO from './dto'
```

## Для названий DTO ответа не нужен постфикс

**✨ Мотивация**

Позволяет сократить количество символов в названии DTO ответа (данных, приходящий в ответ на запрос).

**✅ Valid**

```user-network-sources/dto.ts```

```ts
export interface Contacts {
  email?: string
  phone: string
}

export interface Person {
  name: string
  surname: string
  displayName: string
}
```

```user-network-sources/index.ts```

```ts
export * as UserNetworkSourcesDTO from './dto'
```

```user-repository/dto.ts```

```ts
import { UserNetworkSourcesDTO } from '../../sources'

export type UserContact = UserNetworkSourcesDTO.Contacts
export type UserPerson = UserNetworkSourcesDTO.Person
export type UserFullInfoDTO = UserNetworkSourcesDTO.Person
  & UserNetworkSourcesDTO.Contacts
```

```user-repository/index.ts```

```ts
export * as UserRepositoryDTO from './dto'
```

**❌ Invalid**

```user-network-sources/dto.ts```

```ts
// Постфикс DTO излишний при использовании модульного подхода
export interface ContactsDTO {
  email?: string
  phone: string
}

// Response семантически дублирует DTO концепцию при использовании модулей
export interface PersonResponse {
  name: string
  surname: string
  displayName: string
}
```

```user-network-sources/index.ts```

```ts
// Использование namespace вместо export * as
export namespace UserNetworkSourcesDTO {
  export type Contacts = {...};
  export type Person = {...};
}
```

## Для названий DTO, отправляемых в sources|repositories добавляется постфикс `Input`

**✨ Мотивация**

Позволяет идентифицировать типы данных, отправляемых в sources|repositories.

**✅ Valid**

```user-network-sources/dto.ts```

```ts
export interface CreationUserInput {
  id: string
}
```

```user-network-sources/index.ts```

```ts
export * as UserNetworkSourcesDTO from './dto'
```

```user-repository/dto.ts```

```ts
import { UserNetworkSourcesDTO } from '../../sources'

export type CreationUserInput = UserNetworkSourcesDTO.CreationUserInput
```

```user-repository/index.ts```

```ts
export * as UserRepositoryDTO from './dto'
```

**❌ Invalid**

```user-network-sources/dto.ts```

```ts
// DTO постфикс излишний при использовании модульного подхода
export interface CreationUserInputDTO {
  id: string
}
```

```user-network-sources/index.ts```

```ts
// Использование namespace вместо export * as
export namespace UserNetworkSourcesDTO {
  export type CreationUserInput = {...};
}
```

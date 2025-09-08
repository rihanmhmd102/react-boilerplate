# DTO

The described rules are relevant for **repositories** and **sources**.

## DTOs are described in a separate `dto.ts` file

**✨ Motivation**

Storing DTOs in a single location.

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

## DTOs are organized through modules with `export * as`

**✨ Motivation**

- Allows avoiding name conflicts between types among repositories and sources
- Eliminates the need to describe long names for DTOs with prefixes
- Uses modern ES module approach instead of namespace
- Provides better readability and export organization

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

### Export aliases have the postfix `SourcesDTO` or `RepositoryDTO`

**✨ Motivation**

Identification of module belonging to sources or repositories when using `export * as`.

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

## Response DTO names don't need a postfix

**✨ Motivation**

Allows reducing the number of characters in response DTO names (data coming in response to a request).

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
// DTO postfix is redundant when using modular approach
export interface ContactsDTO {
  email?: string
  phone: string
}

// Response semantically duplicates the DTO concept when using modules
export interface PersonResponse {
  name: string
  surname: string
  displayName: string
}
```

```user-network-sources/index.ts```

```ts
// Using namespace instead of export * as
export namespace UserNetworkSourcesDTO {
  export type Contacts = {...};
  export type Person = {...};
}
```

## For DTO names sent to sources|repositories, the postfix `Input` is added

**✨ Motivation**

Allows identifying data types sent to sources|repositories.

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
// DTO postfix is redundant when using modular approach
export interface CreationUserInputDTO {
  id: string
}
```

```user-network-sources/index.ts```

```ts
// Using namespace instead of export * as
export namespace UserNetworkSourcesDTO {
  export type CreationUserInput = {...};
}
```

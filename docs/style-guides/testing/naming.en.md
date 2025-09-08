# Test Case Naming

## Test files have the postfix .test

**✨ Motivation**

Code homogeneity.

**✅ Valid**

```
├── user-repository/
|    ├── user-repository.ts
|    ├── user-repository.test.ts
|    └── index.ts
```

**❌ Invalid**

```
├── user-repository/
|    ├── user-repository.ts
|    ├── user-repository.spec.ts
|    └── index.ts
```

## Test cases must start with a capital letter

**✨ Motivation**

Allows achieving compliance with Russian language rules and improving test case readability.

**✅ Valid**

```ts
it('Successful book creation shows success notification')
it('OnChange is called without passed isExpanded')
```

## Test cases are described in Russian

**✨ Motivation**

Communication in the company is in Russian. Cases in Russian improve test case readability.

**✅ Valid**

```ts
it('Successful book creation shows success notification')
it('OnChange is called without passed isExpanded')
```

**❌ Invalid**

```ts
it('Validate default invalid length message')
```

## The parameter value format is `PARAM_NAME=VALUE`

**✨ Motivation**

Allows achieving uniformity in specifying parameters in test cases.

**✅ Valid**

```ts
it('Label has "*" if required=true')
it('Mask adds 8 when isStartWithPlus=false')
```

**❌ Invalid**

```ts
it('Label has "*" if required true')
it('Label has "*" if required:true')
```

## Long values cannot be specified in test case names

**✨ Motivation**

Long values significantly worsen test case readability.

**❌ Invalid**

```ts
it('Displays "...", if value="Provident ut qui consequatur. Eveniet deserunt et unde numquam. Velit distinctio excepturi deleniti tempora praesentium voluptatem laboriosam accusamus autem. Esse saepe sunt veritatis consequatur officia nihil tempora quisquam necessitatibus. Officia et dolorem."')
it('Generates exception for json "{"k":"Provident ut qui consequatur. Eveniet deserunt et unde numquam. Velit distinctio excepturi deleniti tempora praesentium voluptatem laboriosam accusamus autem. Esse saepe sunt veritatis consequatur officia nihil tempora quisquam necessitatibus. Officia et dolorem."}"')
```

**✅ Valid**

```ts
it('Displays "..." for long strings')
it('Generates exception for json containing strings longer than 20 characters')
```

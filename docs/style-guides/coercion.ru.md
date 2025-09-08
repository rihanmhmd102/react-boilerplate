# Приведение типов

## Boolean

### При преобразовании в Boolean необходимо использовать явное приведение

**✨ Мотивация**

Достижение прозрачности в приведении типов и однородности кода.

**✅ Valid**

```ts
const string = 'string'

const isShow = Boolean(string)
```

**❌ Invalid**

```ts
const string = 'string'

const isShow = !!string
```

#### Исключения

##### Преобразовывать в Boolean в условных операторах не нужно

**✅ Valid**

```ts
const string = 'string';

...

if (string) {}

...

const viewString = string ? 'Новое' : 'Старое';
```

**❌ Invalid**

```ts
const string = 'string';

...

if (Boolean(string)) {}

...

const viewString = Boolean(string) ? 'Новое' : 'Старое';
```

##### Не нужно добавлять дополнительного преобразования к оператору `!`

**✅ Valid**

```ts
const string = 'string'

const isShow = !string
```

**❌ Invalid**

```ts
const string = 'string'

const isShow = !string
```

## Number

### При преобразовании в Number необходимо использовать явное приведение

**✨ Мотивация**

Достижение прозрачности в приведении типов и однородности кода.

**✅ Valid**

```ts
const string = '22'

const number = Number(string)
const intNumber = Number.parseInt(string)
const foatNumber = Number.parseFloat(string)
```

**❌ Invalid**

```ts
const string = '22'

const number = +string
```

```ts
const string = '22'

const number = 1 * string
```

## String

### При преобразовании в String необходимо использовать явное приведение

**✨ Мотивация**

Достижение прозрачности в приведении типов и однородности кода.

**✅ Valid**

```ts
const number = 22

const string = String(number)
```

**❌ Invalid**

```ts
const number = 22

const string = `${number}`
```

### Для склеивания строк необходимо использовать строковый шаблон

**✨ Мотивация**

Однозначность проводимой операции.

**✅ Valid**

```ts
const str1 = 'str1'
const str2 = 'str2'

const string = `${str1}${str2}`
```

**❌ Invalid**

```ts
const str1 = 'str1'
const str2 = 'str2'

const string = str1 + str2
```

#### Исключение: разбиение длинной строки на подстроки

Если строка в переменной длинная, то для лучшего восприятия ее может понадобиться разбить на подстроки:
```ts
const TEXT
  = 'Случайный текст Случайный текст для демонстрации генерации на'
    + 'основе искусственного интеллекта. Этот текст не несет никакого смысла, но служит'
    + 'примером того, как можно создавать последовательности символов с использованием модели'
    + 'GPT-3.5. Надеюсь, это соответствует вашему запросу! для демонстрации генерации на основе'
    + 'искусственного интеллекта. Этот текст не несет никакого смысла, но служит примером того, как'
    + 'можно создавать последовательности символов с использованием модели GPT-3.5. Надеюсь, это соответствует вашему запросу!'
```

#### Для склеивания строки и Number необходимо использовать строковый шаблон

**✅ Valid**

```ts
const str = 'str'
const number = 22

const string = `${str} - ${number}`
```

**❌ Invalid**

```ts
const str = 'str'
const number = 22

const string = `${str} - ${number}`
```

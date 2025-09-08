# Type Coercion

## Boolean

### When converting to Boolean, explicit coercion must be used

**✨ Motivation**

Achieving transparency in type conversion and code homogeneity.

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

#### Exceptions

##### It is not necessary to convert to Boolean in conditional statements

**✅ Valid**

```ts
const string = 'string';

...

if (string) {}

...

const viewString = string ? 'New' : 'Old';
```

**❌ Invalid**

```ts
const string = 'string';

...

if (Boolean(string)) {}

...

const viewString = Boolean(string) ? 'New' : 'Old';
```

##### No additional conversion is needed for the `!` operator

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

### When converting to Number, explicit coercion must be used

**✨ Motivation**

Achieving transparency in type conversion and code homogeneity.

**✅ Valid**

```ts
const string = '22'

const number = Number(string)
const intNumber = Number.parseInt(string)
const floatNumber = Number.parseFloat(string)
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

### When converting to String, explicit coercion must be used

**✨ Motivation**

Achieving transparency in type conversion and code homogeneity.

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

### String templates must be used for concatenating strings

**✨ Motivation**

Unambiguity of the operation being performed.

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

#### Exception: Breaking long strings into substrings

If a string in a variable is long, it may need to be broken into substrings for better readability:

```ts
const TEXT
  = 'Random text Random text for demonstration of generation based on '
    + 'artificial intelligence. This text carries no meaning, but serves '
    + 'as an example of how character sequences can be created using the '
    + 'GPT-3.5 model. I hope this meets your request! for demonstration of generation based on '
    + 'artificial intelligence. This text carries no meaning, but serves as an example of how '
    + 'character sequences can be created using the GPT-3.5 model. I hope this meets your request!'
```

#### String templates must be used for concatenating strings and Numbers

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

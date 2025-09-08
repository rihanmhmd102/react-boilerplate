# Нейминг тест-кейсов

## Название файлов с тестами имеет постфикс .test

**✨ Мотивация**

Однородность кода.

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

## Тест-кейс должен начинаться с большой буквы

**✨ Мотивация**

Позволяет достичь соответствия правилам русского языка и повысить удобство чтения тест-кейсов.

**✅ Valid**

```ts
it('Успешное создание книги показывает уведомление об успешности')
it('OnChange вызывается без переданного isExpanded')
```

## Тест-кейсы описываются на русском языке

**✨ Мотивация**

Коммуникация в компании происходит на русском языке. Кейсы на русском языке позволяют повысить удобство чтения тест-кейсов.

**✅ Valid**

```ts
it('Успешное создание книги показывает уведомление об успешности')
it('OnChange вызывается без переданного isExpanded')
```

**❌ Invalid**

```ts
it('Validate default invalid length message')
```

## Для указания значения параметра используется формат `PARAM_NAME=VALUE`

**✨ Мотивация**

Позволяет достичь единообразия указания параметров в тест-кейсах.

**✅ Valid**

```ts
it('К label добавляется "*", если required=true')
it('В маску добавляется 8 при isStartWithPlus=false')
```

**❌ Invalid**

```ts
it('К label добавляется "*", если required true')
it('К label добавляется "*", если required:true')
```

## Нельзя указывать длинные значения в названиях тест-кейсов

**✨ Мотивация**

Длинные значения значительно ухудшают удобство чтения тест-кейсов.

**❌ Invalid**

```ts
it('Отображается "...", если value="Provident ut qui consequatur. Eveniet deserunt et unde numquam. Velit distinctio excepturi deleniti tempora praesentium voluptatem laboriosam accusamus autem. Esse saepe sunt veritatis consequatur officia nihil tempora quisquam necessitatibus. Officia et dolorem."')
it('Генерируется исключение для json "{"k":"Provident ut qui consequatur. Eveniet deserunt et unde numquam. Velit distinctio excepturi deleniti tempora praesentium voluptatem laboriosam accusamus autem. Esse saepe sunt veritatis consequatur officia nihil tempora quisquam necessitatibus. Officia et dolorem."}"')
```

**✅ Valid**

```ts
it('Отображается "..." для длинных строк')
it('Генерируется исключение для json, содержащих строки длиной больше 20 символов')
```

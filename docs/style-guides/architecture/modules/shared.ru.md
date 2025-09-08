# Shared

## Все программные сущности, относящиеся к ui, помещаются в `ui` директорию

- `hooks`
- `icons`
- `components`

**✨ Мотивация**

Явное отделение ui от остальных программных сущностей.

**✅ Valid**

```
├── shared/
|    ├── ui/
|    |    |── components/
|    |    |── hooks/
|    |    |── icons/
|    |    └── index.ts
|    └── index.ts
```

**❌ Invalid**

```
├── shared/
|    ├── components/
|    ├── hooks/
|    ├── icons/
|    └── index.ts
```

## Constants, enums, types хранятся в отдельных директориях

**✨ Мотивация**

Позволяет без дополнительных трудозатрат расширять constants, enums, types.

**✅ Valid**

```
├── shared/
|    ├── enums/
|    |    |── http-errors.ts
|    |    └── index.ts
|    ├── constants/
|    |    |── langs.ts
|    |    └── index.ts
|    ├── types/
|    |    |── langs.ts
|    |    └── index.ts
|    └── index.ts
```

**❌ Invalid**

```
├── shared/
|    ├── enums.ts
|    ├── constants.ts
|    ├── types.ts
|    └── index.ts
```

## Переиспользуемый код для тестов находится в директории `_tests`

**✨ Мотивация**

"_" в названии директории указывает на то, данный код не должен использоваться вне тестового окружения.

**✅ Valid**

```
├── shared/
|    ├── _tests/

|    ├── constants/
|    ├── types/
|    └── index.ts
```

**❌ Invalid**

```
├── shared/
|    ├── enums.ts
|    ├── constants.ts
|    ├── types.ts
|    └── index.ts
```

## Программные сущности с логикой группируются по деталям имплементации

- Stores - директория `stores`
- JS Classes - директория `services`
- Utils - директория `utils`

**✨ Мотивация**

Позволяет без дополнительных трудозатрат расширять stores, services, utils.

**✅ Valid**

```
├── shared/
|    ├── utils/
|    |    |── format-date-to-iso/
|    |    └── index.ts
|    ├── stores/
|    |    |── flag-store/
|    |    └── index.ts
|    ├── services/
|    |    |── http-service/
|    |    └── index.ts
|    └── index.ts
```

# Sources

## Каждый Sources должен находиться в своей директории

**✨ Мотивация**

Позволяет держать в одной директории все части имплементации Source.

**✅ Valid**

```
├── sources/
|    ├── user-network-sources/
|    |    |── dto.ts
|    |    |── enums.ts
|    |    |── faker.ts
|    |    |── user-network-sources.ts
|    |    └── index.ts
|    └── index.ts
```

**❌ Invalid**

```
├── sources/
|    ├── user-network-sources.ts
|    └── index.ts
```

## Каждый Sources должен иметь постфикс, указывающий на источник данных

Формула постфикса: `ИСТОЧНИК_ДАННЫХ` + `Sources`.

**✨ Мотивация**

Позволяет идентифицировать источник данных.

**✅ Valid**

```
├── sources/
|    ├── user-network-sources/
|    ├── user-local-storage-sources/
|    ├── user-cookie-sources/
|    └── index.ts
```

**❌ Invalid**

```
├── sources/
|    ├── user-sources.ts
|    └── index.ts
```

## Название директорий Sources должно соответствовать kebab-case

**✅ Valid**

```
├── sources/
|    ├── user-network-sources/
|    └── index.ts
```

**❌ Invalid**

```
├── sources/
|    ├── userNetworkSources/
|    └── index.ts
```

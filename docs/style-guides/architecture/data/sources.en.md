# Sources

## Each Source must be located in its own directory

**✨ Motivation**

Allows keeping all parts of the Source implementation in one directory.

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

## Each Source must have a postfix indicating the data source

Postfix formula: `DATA_SOURCE` + `Sources`.

**✨ Motivation**

Allows identifying the data source.

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

## Source directory names must follow kebab-case

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

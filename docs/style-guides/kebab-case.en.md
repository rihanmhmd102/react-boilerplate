# kebab-case naming

## Names of all files and directories must follow kebab-case

**✨ Motivation**

The kebab-case format ensures compatibility between operating systems and prevents case sensitivity issues.

**✅ Valid**

```
├── services/
|    |── file-service/
|    |    |── async-file-service/
|    |    |── utils/
|    |    |── file-service.ts
|    |    |── file-service.test.ts
|    |    |── constants.ts
|    |    |── enums.ts
|    |    └── index.ts
|    |── error-service/
|    └── index.ts
```

**❌ Invalid**

```
├── services/
|    |── fileService/
|    |    |── asyncFileService/
|    |    |── utils/
|    |    |── fileService.ts
|    |    |── fileService.test.ts
|    |    |── constants.ts
|    |    |── enums.ts
|    |    └── index.ts
|    |── errorService/
|    └── index.ts
```

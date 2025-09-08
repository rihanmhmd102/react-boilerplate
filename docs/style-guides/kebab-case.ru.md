# kebab-case naming

## Имена всех файлов и директорий должны соответствовать kebab-case

**✨ Мотивация**

Формат kebab-case обеспечивает совместимость между операционными системами и предотвращает проблемы с чувствительностью к регистру.

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

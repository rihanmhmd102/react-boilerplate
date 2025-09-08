# Создание модулей

## Название модулей должно быть в kebab-case

**✨ Мотивация**

kebab-case в данном случае указывает, что модуль - это директория-контейнер

**✅ Valid**

```
├── modules/
|    ├── cart/
|    ├── payment/
|    ├── request/
|    ├── user-profile/
|    └── layout/
```

**❌ Invalid**

```
├── modules/
|    ├── cartModule/
|    ├── paymentModule/
|    ├── userProfileModule/
|    ├── requestModule/
|    └── layoutModule/
```

## Названия модулей не должны содержать постфиксы `Module`

**✨ Мотивация**

Каждый модуль находится в директории `modules`, это уже указывает на то, что директория является модулем.

**✅ Valid**

```
├── modules/
|    ├── cart/
|    ├── payment/
|    ├── request/
|    └── layout/
```

**❌ Invalid**

```
├── modules/
|    ├── cartModule/
|    ├── pymentModule/
|    ├── requestModule/
|    └── layoutModule/
```

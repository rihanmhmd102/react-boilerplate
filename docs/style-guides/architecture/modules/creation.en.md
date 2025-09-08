# Module Creation

## Module names must be in kebab-case

**✨ Motivation**

kebab-case in this case indicates that the module is a container directory

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

## Module names should not contain the `Module` postfix

**✨ Motivation**

Each module is located in the `modules` directory, which already indicates that the directory is a module.

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

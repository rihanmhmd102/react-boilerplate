# Features Overview

Each module provides a set of features, whose combination forms application screens (`screens`) or other features.

`Feature` - is a ready-to-use component that solves its task.

Thanks to `Features`, any team member (even a non-developer) can easily and quickly determine what capabilities and functions this application provides, simply by looking at the directory names.

![Features](../../../images/features.png)

Example structure:

```
├── app/
├── screens/
├── modules/
|    └── payment/
|    |    ├── features/
|    |    |    ├── payment-switch/
|    |    |    ├── card-payment/
|    |    |    ├── cash-payment/
|    |    |    └── index.ts
|    |    ├── domain/
|    |    └── index.ts
├── data/
└── shared/
```

`Feature` can be either a full-fledged part of the system with hidden logic inside, or a UI component displaying data.

`Feature` contains everything necessary for its functioning:

- UI component, **responsible only for rendering the feature.** No logic is implemented in the component
- Feature logic. **All feature logic, including UI logic, is implemented outside the UI component**
- Component styles
- Other UI components that are part of the main component
- Other software entities necessary for correct feature operation

Example feature structure for React stack:

```
├── app/
├── screens/
├── modules/
|    └── payment/
|    |    ├── payment-switch/
|    |    |    ├── payment-switch.tsx
|    |    |    ├── payment-switch.test.tsx
|    |    |    ├── switch-btn/
|    |    |    ├── styles.ts
|    |    |    ├── utils/
|    |    |    ├── ui-store/
|    |    |    ├── constants.ts
|    |    |    ├── types.ts
|    |    |    └── index.ts
|    |    ├── card-payment/
|    |    ├── cash-payment/
|    |    └── index.ts
|    ├── domain/
|    └── index.ts
├── data/
└── shared/
```

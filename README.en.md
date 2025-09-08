<p align="center" dir="auto">
  <themed-picture data-catalyst-inline="true" data-catalyst="" style="visibility: visible;"><picture>
  <source media="(prefers-color-scheme: light),(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/e7d537a9-e41f-4e6c-9556-889d7cbe74b1" class="source-dark">
  <img src="https://github.com/user-attachments/assets/da6732e4-91c2-4266-af06-337fad21b19c" height="200" alt="Logo for Red Stack" style="visibility: visible; max-width: 100%;">
</picture></themed-picture>
</p>

<p align="center">
  Red Stack React Boilerplate - Enterprise-Ready Solution
</p>

<p align="center">
A production-ready React boilerplate by Red Stack, designed for building complex, scalable client applications with modern architecture patterns and comprehensive enterprise-grade features.
</p>

#

<div align="center">
  <h3>🌍 Language / Язык</h3>
  <p>
    <a href="./README.md"><img src="https://img.shields.io/badge/🇺🇸_English-blue?style=for-the-badge" alt="English"/></a>
    &nbsp;&nbsp;&nbsp;
    <a href="./README.ru.md"><img src="https://img.shields.io/badge/🇷🇺_Русский-red?style=for-the-badge" alt="Русский"/></a>
  </p>
  <p>
    <em>Choose your preferred language to continue reading the documentation</em><br>
    <em>Выберите предпочитаемый язык для продолжения чтения документации</em>
  </p>
</div>

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Features](#-features)
- [Documentation](#-documentation)
- [Todo](#-todo)
- [License](#-license)

## Getting started

AI rules are configured in .ruler/ruler.toml, [configuration options](https://github.com/intellectronica/ruler?tab=readme-ov-file#configuration-rulertoml-in-detail)

```bash
# Apply AI rules
npm run ruler:apply

cp .env.example .env.local

npm run dev
```

## ⚡ Features

- **State Management → [MobX](https://mobx.js.org/)**
High-performance reactivity without prop drilling or redundant re-renders.
Enables clear separation of concerns, OOP patterns, and scalable app layers.
- **Data Fetching \& Forms → [TanStack](https://tanstack.com/)**
  - [Query](https://tanstack.com/query/latest) + MobX adapter ([mobx-tanstack-query](https://github.com/js2me/mobx-tanstack-query)) for reactive server state
  - [Form](https://tanstack.com/form/latest) is a promising, framework-agnostic form library focused on strict type safety, flexible validation, and optimized performance.
- **Internationalization → [formatjs/react-intl](https://formatjs.io/)**
Built-in dynamic i18n layer, fully reactive via MobX. Localized from day one.
Type-safe, elegant API calls with strong developer experience.
- **UI Layer (agnostic by design)**
The boilerplate does not lock you into a single UI framework, instead providing patterns that separate UI, UI-state, and business logic. Recommended options:
  - [Gravity UI](https://gravity-ui.com/) → enterprise-ready, strong accessibility, theming, i18n support
  - [Mantine UI](https://mantine.dev/) → huge component library, best for rapid prototyping
  - [shadcn/ui](https://ui.shadcn.com/) → build your own design system with full control
- **AI-Friendly Development**
Red Stack is designed with AI in mind:
  - **[ruler](https://github.com/intellectronica/ruler) integration** → aggregates architectural \& style instructions for LLMs
  - **MCP ([context7](https://context7.com/redstack-dev/docs)) support** → keep AI prompts clean and context-aware

## 📚 Documentation

[Full documentation here](./docs)

- [Architecture Overview](./docs/architecture)
- [Style Guides](./docs/style-guides)
- [Testing Guide](./docs/unit-testing)

## 📝 Todo

- [ ] Add CLI tool integration
- [ ] Write SSR (Server-Side Rendering) guidelines
- [ ] Add complete auth (JWT, OAuth, etc) examples
- [ ] Add an example of handling roles
- [ ] Add live demo example
- [ ] Implement additional AI commands

## 📄 License

MIT License

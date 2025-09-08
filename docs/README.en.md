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

# Introduction

## 📋 Table of Contents

- [Motivation](#-motivation)
- [Tech stack](#-tech-stack)
- [Architecture](#-architecture)
- [Style guides](#-style-guides)
- [Code Quality](#-code-quality)
- [Unit testing](#-unit-testing)
- [AI](#-ai)

## 🎯 Motivation

The modern landscape of frontend development is highly diverse. React has long remained a dominant force on the job market, serving as a reliable solution for a wide range of business needs. However, competing frameworks such as Vue and Angular have continued to evolve and in many respects have already moved ahead in terms of technological capabilities.

At the same time, React has undergone significant commercialization. Much of the public discourse is driven by sponsored promotion, while fundamental issues — including reactivity, the tight coupling of UI and business logic, and architectural clarity — often remain overlooked.

Building on these observations, an effort has been made to consolidate knowledge and refine practices with the goal of making development in React a smoother, more enjoyable, and more efficient process.

## 🛠 Tech stack

- **State Management → [MobX](https://mobx.js.org/)**

MobX is designed to solve many React-related problems with reactivity, such as prop drilling and rerenders. Interestingly, MobX has only become more relevant over the years, especially against competitors like Redux and the hyped Zustand (built on the weak Event Emitter model). MobX is an extremely functional tool for building architectural boundaries in client applications, supporting OOP patterns and more.

- **Data Fetching & Forms → [TanStack](https://tanstack.com/)**
  - [Query](https://tanstack.com/query/latest) + MobX adapter ([mobx-tanstack-query](https://github.com/js2me/mobx-tanstack-query)) for reactive server state
  - [Form](https://tanstack.com/form/latest) is a promising, framework-agnostic form library focused on strict type safety, flexible validation, and optimized performance. Compared to React Hook Form, it integrates with state managers like MobX more easily.

There's no point in denying that TanStack technologies have brought new inspiration to the React world. Libraries like TanStack truly improve DX by orders of magnitude, so why not combine them with MobX?

- **Internationalization → [formatjs/react-intl](https://formatjs.io/)**

It's better to develop projects with a ready-made internationalization system from the start, as future transitions can cost significant money and effort. Red Stack offers a solution built on the proven and stable [formatjs (react-intl)](https://formatjs.io/) library with MobX reactivity.

- **UI Layer (agnostic by design)**

Since Red Stack adheres to the concepts of separating UI from UI-state and business logic, the choice of UI is up to you - just follow the architectural rules and enjoy the process. UI library recommendations:

- [Gravity UI](https://gravity-ui.com/) → enterprise-ready, strong accessibility, theming, i18n support
- [Mantine UI](https://mantine.dev/) → for projects where personalized component appearance is not important
- [shadcn/ui](https://ui.shadcn.com/) → for creating your own design system

## 🏗 Architecture

Most React projects end up in the *"Big Ball of Mud"* anti-pattern due to the classic flat `src/components` structure. Red Stack React Boilerplate avoids this by introducing a **scalable, maintainable architecture** informed by **Clean Architecture, SOLID, and DDD** principles.

- **Business logic isolation** → no framework lock-in
- **UI / UI-state / domain separation** → clearer responsibilities

📖 [Full Architecture Overview](./architecture/)

## 📏 Style Guides

Red Stack provides comprehensive style guides that ensure consistent code quality and maintainability across the entire project:

- **Naming conventions** → kebab-case files, camelCase variables, clear semantic naming
- **Code organization** → structured imports, proper exports, logical file grouping
- **Language-specific rules** → TypeScript best practices, React patterns, class structures
- **Architecture enforcement** → layer boundaries, dependency directions, module coupling

📖 [Complete Style Guide](./style-guides/)

## ✅ Code Quality

Red Stack enforces consistent code quality through automated tools and git hooks that run seamlessly in your development workflow:

### Pre-commit Hooks ([Husky](https://typicode.github.io/husky/))

- **Automatic linting** → runs ESLint with auto-fix on staged files
- **Type checking** → validates TypeScript types before commit
- **Commit message validation** → ensures conventional commit format

### ESLint Configuration

Built on [@antfu/eslint-config](https://github.com/antfu/eslint-config) with Red Stack customizations:

- **File naming enforcement** → kebab-case files required
- **Import sorting** → line-length based with internal pattern recognition
- **TypeScript preferences** → `type` over `interface`, consistent definitions
- **Code style** → 2-space indentation, semicolons, double quotes

### Commit Standards (Commitlint)

Enforces conventional commits with Red Stack specific types:

- **Standard types** → `feat`, `bug`, `refactor`, `doc`, `build`, `chore`, `test`
- **Project types** → `wip`, `major`, `story` for development workflow
- **Format rules** → 120 char header limit, proper body/footer structure

### Lint-staged Integration

Runs quality checks only on changed files for optimal performance:

```js
{
  '**/*.{js,jsx,ts,tsx}': [
    'npm run lint',      // ESLint with auto-fix
    'npm run lint:types' // TypeScript validation
  ]
}
```

This automated quality pipeline ensures:

- **Consistent code style** across the entire team
- **Early error detection** before code reaches CI/CD
- **Zero-config setup** → works out of the box
- **Performance optimized** → only checks changed files

## 🧪 Unit testing

Red Stack follows a **classical school** approach to unit testing, emphasizing reliability and refactoring resilience:

- **Test location** → tests are placed next to the tested entity for clear visual connection
- **Public API focus** → only public methods and properties are tested, private implementation is ignored
- **SUT (System Under Test)** → clear identification of what's being tested in each test case
- **Bug-driven testing** → write tests when bugs are discovered to prevent regression

The methodology ensures tests provide:

- **Bug protection** → reliable detection of issues
- **Refactoring resilience** → tests don't break during internal changes
- **Execution speed** → fast feedback loops
- **Maintenance simplicity** → easy to understand and modify

📖 [Unit Testing Guidelines](./unit-testing/)

## 🤖 AI
<!-- TODO: добавить комманды ruler apply и тд, а также llm-full.txt в репу -->
Red Stack is built for the **AI-augmented developer experience**.
Instead of asking “Will AI replace programmers?”, Red Stack asks:
**“How can we use AI effectively today to write better code?”**

- **[ruler](https://github.com/intellectronica/ruler) integration** → aggregates architecture rules, style guides, and best practices into structured instructions for any LLMs
- **MCP ([context7](https://context7.com/)) support** → allows precise work with project-specific guidelines without flooding the AI context window
- **Standardized scaffolding** → makes AI output consistent, predictable, and reliable across the whole team

Outcome → LLM agents generate higher quality, architecture-compliant code, reducing review and refactor cycles.

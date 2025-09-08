<p align="center" dir="auto">
  <themed-picture data-catalyst-inline="true" data-catalyst="" style="visibility: visible;"><picture>
  <source media="(prefers-color-scheme: light),(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/e7d537a9-e41f-4e6c-9556-889d7cbe74b1" class="source-dark">
  <img src="https://github.com/user-attachments/assets/da6732e4-91c2-4266-af06-337fad21b19c" height="200" alt="Логотип Red Stack" style="visibility: visible; max-width: 100%;">
</picture></themed-picture>
</p>
<p align="center">
  Red Stack React Boilerplate – Enterprise-Ready Solution
</p>
<p align="center">
Готовый к продакшену React boilerplate от Red Stack, созданный для разработки сложных и масштабируемых клиентских приложений с современными архитектурными паттернами и полным набором enterprise-функций.
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

## 📋 Содержание

- [Начало работы](#-%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)
- [Возможности](#-%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8)
- [Документация](#-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F)
- [Todo](#-todo)
- [Лицензия](#-%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F)

## 🚀 Начало работы

AI-правила конфигурируются в `.ruler/ruler.toml`, см. [configuration options](https://github.com/intellectronica/ruler?tab=readme-ov-file#configuration-rulertoml-in-detail):

```bash
# Применить AI правила
npm run ruler:apply

cp .env.example .env.local

npm run dev
```

## ⚡ Возможности

- **Управление состоянием → [MobX](https://mobx.js.org/)**
Высокопроизводительная реактивность без prop drilling и лишних повторных рендеров.
Обеспечивает чёткое разделение ответственности, поддержку ООП-паттернов и масштабируемую архитектуру.
- **Запросы данных и формы → [TanStack](https://tanstack.com/)**
  - [Query](https://tanstack.com/query/latest) + адаптер для MobX ([mobx-tanstack-query](https://github.com/js2me/mobx-tanstack-query)) для реактивного server state
  - [Form](https://tanstack.com/form/latest) — новая, перспективная, framework-agnostic библиотека для работы с формами. Сосредоточена на строгой типизации, гибкой валидации и высокой производительности.
- **Интернационализация → [formatjs/react-intl](https://formatjs.io/)**
Встроенный динамический i18n-слой, полностью реактивный через MobX.
Локализация доступна с первого дня: безопасный по типам API, элегантный синтаксис и сильный DX.
- **UI-слой (agnostic by design)**
Boilerplate не привязывает вас к конкретному UI-фреймворку, предлагая паттерны для разделения UI, UI-state и бизнес-логики. Рекомендуемые варианты:
  - [Gravity UI](https://gravity-ui.com/) → enterprise-ready, сильная поддержка accessibility, темизация и i18n
  - [Mantine UI](https://mantine.dev/) → крупная библиотека компонентов, отлично подходит для быстрого прототипирования
  - [shadcn/ui](https://ui.shadcn.com/) → сборка собственной дизайн системы с полным контролем
- **AI-Friendly Development**
Red Stack проектируется с учётом AI:
  - **[ruler](https://github.com/intellectronica/ruler) интеграция** → агрегирует архитектурные и стилистические инструкции для LLM
  - **MCP ([context7](https://context7.com/redstack-dev/docs)) поддержка** → делает AI-prompts компактными и контекстно осмысленными

## 📚 Документация

[Полная документация здесь](/docs/README.ru.md)

- [Architecture Overview](/docs/architecture/README.ru.md)
- [Style Guides](/docs/style-guides/README.ru.md)
- [Testing Guide](/docs/unit-testing/README.ru.md)

## 📝 Todo

- [ ] Добавить CLI tool интеграцию
- [ ] Написать SSR (Server-Side Rendering) гайд
- [ ] Добавить примеры авторизации (JWT, OAuth, и тд)
- [ ] Добавить пример работы с ролями
- [ ] Добавить пример приложения
- [ ] Реализовать дополнительные AI-команды

## 📄 Лицензия

MIT License

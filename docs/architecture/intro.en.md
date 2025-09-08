# Introduction

![CommonScheme](../images/common-scheme.png)

**Architectural methodology for frontend projects.**

The architectural approach provides a ready-made solution for building scalable and maintainable frontend projects.

## Features

- Focus on solving business tasks
- Project structure allows quickly understanding the tasks solved by the project
- Application independence from framework and used libraries
- Independence from data retrieval methods
- Separating business/UI logic from the view layer increases component reusability
- Using DI concepts helps avoid high coupling
- Easy testing of system program modules
- Ability to gradually introduce into the project
- Can be mastered by developers familiar with basic design principles

The architectural approach uses time-tested concepts (Clean Architecture, DDD, SOLID) to build scalable frontend solutions.

---

## Scope of Application

Should be applied to projects:

- Containing business logic and data work
- With long development and maintenance cycles

Not suitable for:

- Landing pages
- Projects not planned for maintenance

The methodology is not tied to a specific stack.

---

## Creation Prerequisites and Introduction to Architectural Concepts

[Domain-Oriented Architecture for Frontend Applications - Andrey Potemkin - Frontend Meetup](https://www.youtube.com/watch?v=7K2wsioHMNc&ab_channel=exoz)

## Architecture Overview

The architectural approach consists of architectural layers, some layers are divided into segments.

![CommonScheme](../images/common-scheme.png)

Dependencies between application layers/segments are directed top-down.

A lower layer/segment should know nothing about the upper one.

Example project structure:

```
├── app/
├── screens/
├── modules/
├── data/
└── shared/
```

### Architecture Quick Overview

It is recommended to first familiarize yourself with the [**Architecture Quick Overview**](./overview.en.md), and then proceed to a detailed overview of the documentation sections.

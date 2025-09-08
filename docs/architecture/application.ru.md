# Application

## Основная концепция

`Application` слой является единственным слоем, который:

- Зависит от окружения
  - Особенности сборщика
  - Работа с env
- Зависит от специфичности используемого фреймворка
- Зависит от низкоуровневых реализаций (используемых библиотек)

`Application` слой содержит:

- Роутинг приложения
- Инициализацию/настройку приложения и всех сервисов

## Мотивация

Application слой изолирует специфичные детали реализации фреймворка и окружения от остальных слоев приложения. Это позволяет:

- Легко мигрировать между разными фреймворками
- Заменять сборщики без изменения бизнес-логики
- Упрощает тестирование, так как остальные слои не зависят от специфики окружения

## Структура

Пример структуры для React:

```
├── app/
|    ├── routing/
|    └── app.tsx
├── screens/
├── modules/
├── data/
└── shared/
```

Пример структуры для Nextjs:

```
├── pages/          # pages является application слоем (Nextjs специфичность)
|    ├── index.tsx
|    ├── _app.tsx
├── screens/
├── modules/
├── data/
└── shared/
```

## Роутинг

Application слой содержит настройку роутинга приложения. Роутинг связывает URL с соответствующими screens.

Пример настройки роутинга:

```tsx
import { NewGoods } from '@screens/new-goods'
import { PopularGoods } from '@screens/popular-goods'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-goods" element={<NewGoods />} />
        <Route path="/popular-goods" element={<PopularGoods />} />
      </Routes>
    </BrowserRouter>
  )
}
```

## Инициализация приложения

Application слой отвечает за инициализацию приложения и всех сервисов. Это включает:

- Настройку DI контейнера
- Инициализацию хранилищ (stores)
- Настройку сервисов работы с данными
- Инициализацию конфигурации приложения

Пример инициализации:

```tsx
import { CacheService } from '@shared/services/cache-service'
import { ConfigService } from '@shared/services/config-service'

const configService = new ConfigService({
  apiUrl: process.env.API_URL,
})

const cacheService = new CacheService()

// Инициализация других сервисов...

export function App() {
  return (
    <AppProviders
      configService={configService}
      cacheService={cacheService}
    >
      <AppRouting />
    </AppProviders>
  )
}
```

## Работа с env переменными

Все обращение к источникам env должны происходить только на уровне application слоя. Работа с env только на уровне application позволяет не зависеть приложению от сборщика или механизма доставки env.

### ConfigService

Слои приложения, отличные от application, должны получать данные из env через `ConfigService`.

Пример использования:

```tsx
// app.tsx
import { ConfigService } from '@shared/services/config-service'

const configService = new ConfigService({
  apiUrl: process.env.API_URL,
  sentryDsn: process.env.SENTRY_DSN,
})

// Передача configService в провайдеры приложения
```

```tsx
// В domain или features слоях
import { configService } from '@app/providers'

const apiUrl = configService.get('apiUrl')
```

## Тестирование

Application слой тестируется как интеграционный слой, который объединяет все остальные слои приложения. При тестировании application слоя необходимо проверять:

- Правильность настройки роутинга
- Корректную инициализацию всех сервисов
- Правильную передачу конфигурации в остальные слои
- Обработку ошибок при инициализации

Для тестирования application слоя рекомендуется использовать интеграционные тесты, которые проверяют работу всего приложения в целом.

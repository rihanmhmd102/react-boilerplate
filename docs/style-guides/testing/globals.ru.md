# Globals

## Запрещено использование global namespace тестового фреймворка

Global namespace позволяют описывать `describe`, `it` и тп без импорта.

**✨ Мотивация**

- Однозначность принадлежности используемых функций к пакету
- Возможность постепенной миграции на другие тестовые фреймворки

**✅ Valid**

```ts
import { describe, expect, it } from 'vitest'

describe('formatPhoneToView', () => {
  it('Маска содержит по-умолчанию +7', () => {
    expect(formatPhoneToView('79309992222')).toBe('+7 930 999 22 22')
  })
})
```

**❌ Invalid**

В примере ниже используется global namespace:
```ts
describe('formatPhoneToView', () => {
  it('Маска содержит по-умолчанию +7', () => {
    expect(formatPhoneToView('79309992222')).toBe('+7 930 999 22 22')
  })
})
```

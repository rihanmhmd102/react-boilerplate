# Переиспользование логики между фичами

Логику необходимо выносить в `Domain` , если логику, реализованную внутри фичи, потребовалось:

- Переиспользовать в другой фиче
- Переиспользовать в другом модуле
- Использовать для интеграции с другой фичей

### Когда использовать

Domain слой используется для бизнес-логики, связанной с предметной областью:

- Расчеты, специфичные для предметной области
- Валидация бизнес-правил
- Преобразование данных предметной области
- Логика работы с сущностями предметной области

### Примеры

```ts
// modules/cart/domain/services/cart-calculator.ts
export class CartCalculator {
  public calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  public calculateDiscount(total: number, discountPercent: number): number {
    return total * (discountPercent / 100)
  }
}
```

[Подробный обзор Domain](../domain)

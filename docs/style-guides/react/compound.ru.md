# React

## Крупные компоненты должны создаваться в Compound-стиле

Если компонент имеет несколько состояний или логически связанные подкомпоненты, они должны быть вынесены в отдельные файлы с префиксом имени основного компонента.

**✨ Мотивация**

- Улучшение читаемости и поддержки кода
- Однозначная структура папок
- Возможность переиспользования отдельных частей
- Ясное разделение ответственности между состояниями и элементами

---

**✅ Valid**

```

├── product-list/
│    ├── product-list.item.tsx
│    ├── product-list.error.tsx
│    ├── product-list.skeleton.tsx
│    ├── product-list.empty.tsx
│    └── product-list.tsx

````

`product-list.tsx`

```tsx
export function ProductList({ products }: { products: string[] }) {
  if (!products.length) {
    return <ProductList.Empty />
  }

  return (
    <ul>
      {products.map(product => (
        <ProductList.Item key={product} product={product} />
      ))}
    </ul>
  )
}

ProductList.Item = ({ product }: { product: string }) => {
  return <li>{product}</li>
}

ProductList.Skeleton = () => {
  return <div>Loading...</div>
}

ProductList.Empty = () => {
  return <div>No products found</div>
}
````

---

**❌ Invalid**

Всё смешано в одном файле, непонятно, где Empty, где Skeleton, где Item:

```tsx
export function ProductList({ products, loading }: { products: string[], loading?: boolean }) {
  if (loading) {
    return <div>Loading...</div>
  }

  if (!products.length) {
    return <div>No products found</div>
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product}>{product}</li>
      ))}
    </ul>
  )
}
```

---

## Именование файлов

- Основной компонент: `component-name.tsx`
- Подкомпоненты: `component-name.subcomponent.tsx`
- Все подкомпоненты должны быть экспортированы через основной компонент

**✅ Valid**

```
product-list/
  product-list.tsx
  product-list.item.tsx
  product-list.empty.tsx
  product-list.skeleton.tsx
```

**❌ Invalid**

```
product-list/
  list-item.tsx
  skeleton.tsx
  empty.tsx
  index.tsx
```

---

## Вложенность компонентов

Подкомпоненты должны экспортироваться через namespace основного компонента.

**✅ Valid**

```tsx
<ProductList>
  <ProductList.Item product="Laptop" />
  <ProductList.Item product="Phone" />
</ProductList>
```

**❌ Invalid**

```tsx
<ProductList>
  <Item product="Laptop" />
  <Item product="Phone" />
</ProductList>
```

---

## Skeleton / Empty / Error состояния

Для крупных UI-компонентов рекомендуется иметь подкомпоненты:

- `component.skeleton` — отображается при загрузке
- `component.empty` — отображается при отсутствии данных
- `component.error` — отображается при ошибке загрузки

**✨ Мотивация**

- Единообразный подход к состояниям
- Повышение UX
- Упрощение тестирования

**✅ Valid**

```tsx
<ProductList products={products} />

<ProductList.Skeleton />
<ProductList.Empty />
<ProductList.Error />
```

**❌ Invalid**

```tsx
{ loading && <div>Loading...</div> }
{ !products.length && <div>No products</div> }
{ error && <span>Error</span> }
```

```

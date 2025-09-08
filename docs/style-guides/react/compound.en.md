# React

## Large components should be created in Compound style

If a component has multiple states or logically related subcomponents, they should be moved to separate files with a prefix of the main component's name.

**✨ Motivation**

- Improved code readability and maintainability
- Unambiguous folder structure
- Ability to reuse individual parts
- Clear separation of responsibility between states and elements

---

**✅ Valid**

```
├── product-list/
│    ├── product-list.item.tsx
│    ├── product-list.error.tsx
│    ├── product-list.skeleton.tsx
│    ├── product-list.empty.tsx
│    └── product-list.tsx
```

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
```

---

**❌ Invalid**

Everything is mixed in one file, it's unclear where Empty, Skeleton, and Item are:

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

## File naming

- Main component: `component-name.tsx`
- Subcomponents: `component-name.subcomponent.tsx`
- All subcomponents must be exported through the main component

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

## Component nesting

Subcomponents must be exported through the namespace of the main component.

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

## Skeleton / Empty / Error states

For large UI components, it is recommended to have subcomponents:

- `component.skeleton` — displayed during loading
- `component.empty` — displayed when there is no data
- `component.error` — displayed when loading fails

**✨ Motivation**

- Uniform approach to states
- Improved UX
- Simplified testing

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

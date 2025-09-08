# Формирование props компонента фичи

Props фичи может формироваться из:

- Типов `UIStore`
- Типов DTO из `data`
- Props других фичей
- Props shared компонентов

```ts
interface Props {
  data: UIStore['data']
  list: RequestsRepositoryDTO.List
  onClick: ButtonProps['onClick']
}
```

![PropsDeps]("../../../images/props-deps.png")

**`UIStore` при этом не зависит от props компонента своей фичи**.

## Style guide

[Style guide | UIStore]("../../../style-guides/ru/react/props.md")

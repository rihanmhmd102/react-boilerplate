# Feature Component Props Formation

Feature props can be formed from:

- `UIStore` types
- DTO types from `data`
- Props of other features
- Props of shared components

```ts
interface Props {
  data: UIStore['data']
  list: RequestsRepositoryDTO.List
  onClick: ButtonProps['onClick']
}
```

![PropsDeps]("../../../images/props-deps.png")

**`UIStore` does not depend on the props of its feature's component**.

## Style guide

[Style guide | UIStore]("../../../style-guides/en/react/props.md")

# Rendering Components in Store

Rendering components in store is necessary in cases:

- Passing custom display to service
- Forming props for component

## adaptComponentToDomain

`adaptComponentToDomain` allows calling component render outside `jsx`, namely in `UIStore`.

Function implementation:

```ts
import type { FunctionComponent, ReactNode } from 'react'

import { createElement } from 'react'

export type RenderComponentInDomain<TProps extends object> = (
  props: TProps,
) => ReactNode

/**
 * Allows using react-component in business logic as render function
 */
export function adaptComponentToDomain<TProps extends object>(component: FunctionComponent<TProps>): RenderComponentInDomain<TProps> {
  return props =>
    createElement(component, props)
}
```

## Passing render to service. Example with notify

Task: use custom message display when calling notify.

```ts
import { PaymentMessage } from '../../features'

export class PaymentStore {
  constructor(
    private readonly notify: Notify,
    private readonly paymentRepo: PaymentRepo,
    private readonly renderPaymentMessage: RenderComponentInDomain<{
      productID: string
    }>,
  ) {
    makeAutoObservable(this)
  }

  public pay = async (productID: string) => {
    await this.paymentRepo.pay(productID)

    this.notify.success('Paid', {
      content: this.renderPaymentMessage({ productID }),
    })
  }
}

export function createPaymentStore() {
  return new PaymentStore(
    notifyService,
    paymentRepository,
    adaptComponentToDomain(PaymentMessage),
  )
}
```

## Forming props for component

```ts
import type { ActionCellProps } from '@/shared'

import { DeleteIcon, EditIcon } from '@/shared'

interface ActionIcons {
  renderEdit: RenderComponentInDomain
  renderDelete: RenderComponentInDomain
}

export class UIStore {
  constructor(private readonly actionIcons: ActionIcons) {
    makeAutoObservable(this)
  }

  public get actions(): ActionCellProps {
    return [
      {
        icon: this.actionIcons.renderDelete(),
        onClick: () => this.delete(),
      },
      {
        icon: this.actionIcons.renderEdit(),
        onClick: () => this.edit(),
      },
    ]
  }
}

export function createUIStore() {
  return new UIStore({
    renderDelete: adaptComponentToDomain(DeleteIcon),
    renderEdit: adaptComponentToDomain(EditIcon),
  })
}
```

## Storing ReactNode reference for subsequent use

```ts
import type { ReactNode } from 'react'

export class UIStore {
  private alertMessage: ReactNode

  constructor(private readonly notify: Notify) {
    makeAutoObservable(this)
  }

  public mount = (message: ReactNode) => {
    this.alertMessage = message
  }

  public send = () => {
    this.notify(this.alertMessage)
  }
}
```

```tsx
const Alert = () => {
  const { mount } = useLocalObservable(createUIStore);

  const message = <Message variant="info">Hello</Message>;

  useEffect(() => {
    mount(message);
  }, []);

    ...
};
```

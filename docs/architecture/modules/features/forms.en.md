# Forms

A concise guide for creating forms using MobX + TanStack Form.

## Architecture

Forms are built on the combination of **MobX** and **TanStack Form**:

- **MobX** - manages form state in store
- **TanStack Form** - provides API for validation and field management
- **Zod** - validation schemas

## Creating a Form

### 1. Define Schema

```typescript
export const UserFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
})

export type UserFormType = z.infer<typeof UserFormSchema>
```

### 2. Create in MobX Store

```typescript
export class Store {
  constructor() {
    makeAutoObservable(this, {
      userForm: false, // exclude from observation
    })
  }

  userForm = createForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validators: {
      onSubmit: UserFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })
}
```

### 3. Use in Component

```typescript
export const UserForm = withForm({
  defaultValues: {} as UserFormType,
  render: ({ form }) => (
    <form.AppForm>
      <form.AppField
        name="firstName"
        children={field => (
          <field.TextInput
            label="First Name"
            value={field.state.value}
            error={field.state.meta.errors.map(e => e.message).join(', ')}
            onChange={e => field.handleChange(e.target.value)}
          />
        )}
      />

      <Button onClick={() => form.handleSubmit()}>
        Submit
      </Button>
    </form.AppForm>
  ),
})
```

## Key Principles

1. **Form instance is created in MobX store** - ensures state persistence
2. **Validation through Zod** - type safety and convenient schemas
3. **Component composition** - reusable fields through context
4. **Automatic reactivity** - MobX tracks changes

## Field Components

Available components defined in `contexts.tsx`:

```typescript
fieldComponents: {
  TextInput,      // text inputs
  PasswordInput,  // password inputs
  Checkbox,       // checkboxes
}
```

Each field receives state through TanStack Form API and updates it via `field.handleChange()`.

## Reactivity

TanStack Form doesn't cause re-renders when interacting with the form. Since we're using MobX for state management, the form state is already reactive through MobX observables.

However, if you need to access reactive values from TanStack Form's internal state, you have `useStore`.

### useStore

The `useStore` hook is perfect when you need to access form values within the logic of your component:

```tsx
const firstName = useStore(form.store, state => state.values.firstName)
const errors = useStore(form.store, state => state.errorMap)
```

> Note: `useStore` will cause a component re-render whenever the subscribed value changes.

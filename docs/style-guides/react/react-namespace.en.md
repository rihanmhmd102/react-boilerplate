# React namespace

## Using react namespace is prohibited

**✨ Motivation**

Using react namespace does not significantly affect code readability.
React hook and type names have unique names that should not conflict with custom hooks and types.

**✅ Valid**

```tsx
import { type ReactNode, useEffect, useState } from 'react';

type Props = {
    title: ReactNode;
};

const User = (props: Props) => {
    const [isShow, setShowFlag] = useState(false);

    useEffect(() => {
    ...
    }, []);

...
};
```

**❌ Invalid**

```tsx
import React from 'react';

type Props = {
    title: React.ReactNode;
};

const User = (props: Props) => {
    const [isShow, setShowFlag] = React.useState(false);

    React.useEffect(() => {
    ...
    }, []);

...
};
```

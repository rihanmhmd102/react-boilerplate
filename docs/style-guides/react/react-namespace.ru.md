# React namespace

## Запрещено использование react namespace

**✨ Мотивация**

Использование react namespace существенно не влияет на читаемость кода.
Имена хуков и типов react имеют уникальные названия, которые не должны конфликтовать с кастомными хуками, типами.

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

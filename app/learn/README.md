# How to Create an Interactive React Component with TypeScript

When we create a React component, we can make it interactive by adding "state". When components have state, we can change their representation over time. Imagine a text input. As you type your message, the "state" of the component changes: the text is different. This is a powerful idea, but the biggest drawback of React state hooks is that a given component's state is only stored in that component. If, say, that text input belongs to a form then the form will need to know about the text in the text input. We then have to do a (somewhat confusing) technique called "lifting state up".

In this document, we will go over how to:

1. Make a component in Next.js
2. Add state to that component
3. Lift that state up to a parent component
4. Add styling to the component in Next.js

## 1. Make a component in Next.js

Let's make a form component that needs to know about the text in its text inputs.

Go to `src/app/components/` (in a `/src` project) or `app/_components/` (in this example project) and create a file called `Form.tsx`. This is where our components will live.

Add the following to `Form.tsx`:

```tsx
export const Form = () => {
    return <form></form>;
};
```

Here, we create a React function component that returns a basic HTML form. Notice that we `export` it so it's accessible in other files in our project.

Now, realistically, this form component could be informed about all the elements inside it. We could put plain text inputs inside and the _form_ would would have that state. But the principle of lifting state up is easily demonstrated if we create a custom text input component.

Inside the same file, add the following code:

```tsx
const TextInput = () => {
    return <input type="text" />;
};

export const Form = () => {
    return <form></form>;
};
```

We could `export` the `TextInput` if we want, but it's not necessary for this example and Form can still be safely exported.

Now, we will need to add state.

## 2. Add state to that component

Here we will use the React `useState()` hook. While React is imported statically by Next.js, we still need to import the `useState()` hook from React. Add the following to the top of `Form.tsx`:

```tsx
import { useState } from "react";

// TextInput, Form...
```

Now, we can add state to the `TextInput` component. Add the following to the `TextInput` component:

```tsx
import { useState } from "react";

const TextInput = () => {
    const [text, setText] = useState<string>("");

    return <input type="text" value={text} />;
};

// Form...
```

Here, we add state to the `TextInput` component.

Doing so creates a variable called `text`, which is a `string`, and a function used to update that state called `setText`. We also set the initial value of `text` to be an empty string.

> Note: we don't necessarily have to declare the type of `text` here since it can be inferred from usage.

We then set the value of the text input to be the value of `text`. This is how we can make the text input interactive.

Now, we need to be able to update the state. If you put this component on the page as is, nothing will happen.

In order to do this, we will need to know when the input is updated. HTML inputs have a collection of event listeners used all the time in front end JavaScript. We can take advantage of these event listeners in a "React" way.

Check this out:

```tsx
import { useState } from "react";

const TextInput = () => {
    const [text, setText] = useState<string>("");

    return <input type="text" value={text} onChange={() => null} />;
};

// Form...
```

Because we added the `onChange` prop to the input element, a function will now be called every time we change the input. We can use this to update the `text` state.

To do this, our `TextInput` needs to have a function that does something other than return `null`.

```tsx
import { useState } from "react";

const TextInput = () => {
    const [text, setText] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return <input type="text" value={text} onChange={handleChange} />;
};

// Form...
```

Now, when we change the text inside the input it will call the `handleChange` function. The `handleChange` function will then update the `text` state.

> Notice that because we are using TypeScript we have to declare the type of `event`. If we don't do this, `event.target` is not necessarily an element that has a `value` property. `React.ChangeEvent<HTMLInputElement>` tells TypeScript that `event.target` is an input element. There are similar types for other events like `onClick` and `onSubmit`.

Now if you add this component to a page you will see that it types. However, it doesn't do anything. We need to lift the state up.

## 3. Lift that state up to a parent component

In order to lift the state up, we need to change how we think about the `handleChange` function we created. That's a critical point where we know the new value of the text input. How can we inform the parent component of this change?

### Props

If you don't already know, a "prop" (property) in React is similar to an attribute in HTML. Anything inside a tag declaration that is not a tagname is a prop.

For example, `<a href="#link">Link</a>`.

This element has 3 things:

1. a tagname (`a`)
2. a prop (`href`)
3. another secret prop, `children` (`"Link"` in this case)

So for our `TextInput`, `onChange` is actually a prop of `input`. This prop actually allows us to access what's happening inside `input`, which is otherwise invisible to us. We can use this same principle to get the state from the `TextInput` by creating our own `onChange` prop.

This means when we add our `TextInput` component to our Form, it will look like this:

```tsx
<TextInput onChange={handleChange} />
```

But how do we create custom props?

Normally, we would provide a list of props to a component like this:

```jsx
const TextInput = ({ onChange }) => {
    // ...
};
```

However, in TypeScript, we need to be more specific. We will have to declare an `interface` so that the compiler knows exactly what props are available. In this case, `onChange` needs to be a function that accepts a `string` and returns `void`.

> Notice we can make the `onChange` function take any argument. So instead of a change event, we can just give it a string directly.

```tsx
interface TextInputProps {
    onChange: (value: string) => void;
}

const TextInput = ({ onChange }: TextInputProps) => {
    // ...
};
```

Now we know exactly what to expect from our custom `onChange` prop and other programmers will know exactly what to expect from our component.

Now let's modify our `TextInput` component to use this prop:

```tsx
import { useState } from "react";

interface TextInputProps {
    onChange: (value: string) => void;
}

const TextInput = ({ onChange }: TextInputProps) => {
    const [text, setText] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        onChange(value);
        setText(value);
    };

    return <input type="text" value={text} onChange={handleChange} />;
};

// Form...
```

Now, when we change the text input, the `handleChange` function will call whetever function was passed to the `onChange` prop.

So imagine a function inside `Form` that works just like `handleChange` in our `TextInput`, except instead of receiving a `React.ChangeEvent<HTMLInputElement>` it receives a `string`. This string can then be used to update the state of `Form`.

Here's what `Form` looks like now:

```tsx
export const Form = () => {
    const [text, setText] = useState<string>("");

    const handleChange = (value: string) => {
        setText(value);
    };

    return (
        <form>
            <TextInput onChange={handleChange} />
        </form>
    );
};
```

Form has 3 new things:

1. It's own state variable (`text`)
2. A function to update that state (`handleChange`)
3. A `TextInput` component with an `onChange` prop that calls `handleChange`.

Now, when we change the text in the `TextInput`, the `handleChange` function will be called. This will update the state of `Form` and the `TextInput` will be updated with the new value.

Now, let's capture the `onSubmit` event of the form and display the value of the text input when the form is submitted.

```tsx
export const Form = () => {
    const [text, setText] = useState<string>("");

    const handleChange = (value: string) => {
        setText(value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(text);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput onChange={handleChange} />
        </form>
    );
};
```

Notice this follows the same pattern that our first `onChange` did.

Handlers can be anything you want, too. Imagine this form is a login form with a password and username. Inside `Form`, the submit handler could make an asynchronous call to a server with those credentials and then redirect the user to a new page.

Now, what if we want to package our component up and use it somewhere else? Well as it is, `Form` is entirely portable. It's behavior will follow it wherever it is declared and each copy of `Form` will be independent of the others.

In our site, however, we want to style our form. We will need to create a stylesheet for our component.

## 4. Add styling to the component in Next.js

In order to add styling to our component, we will need to do 3 things:

1. Create a stylesheet for our component and it's children
2. Import that stylesheet into our component
3. Add the styles to our component

### Create a stylesheet for our component and it's children

Inside `app/_components/`, create a file called `Form.module.css`. This is called a CSS module. All of these are combined by Next.js and divided appropriately so that the minimal amount of CSS is delivered to the client.

Add the following to `Form.module.css`:

```css
.textinput {
    border: 1px solid black;
    padding: 0.5rem;
    background-color: #ccc;
    border-radius: 0.5rem;
}

.form {
    border: 1px solid black;
    padding: 1rem;
    background-color: #eee;
    border-radius: 0.5rem;
}
```

Here, we create 2 classes: `.textinput` and `.form`. These classes will be applied to our components. If you give different modules the same class name, they will not conflict with each other because Next.js will automatically rename them to something unique.

If this was a stylesheet that didn't contain `.module.css`, then we would use it just like you do in HTML: `<form class="form">`. However, because this is a CSS module, we need to import it into our component.

### Import that stylesheet into our component

In `Form.tsx`, add the following to the top of the file:

```tsx
import styles from `./Form.module.css`;
```

This will import the styles from `Form.module.css` and store them in the `styles` variable, which is a JavaScript object. To use a class from this object, we can use the following syntax: `styles.classname`.

### Add the styles to our component

Now, we can add the styles to our component. Add the following to `Form.tsx`:

```tsx
const TextInput = ({ onChange }) => {
    /* handlers ... */

    return <input type="text" className={styles.textinput} />;
};

export const Form = () => {
    const [text, setText] = useState<string>("");

    /* handlers... */

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput onChange={handleChange} />
        </form>
    );
};
```

Now, our form will have the styles we defined in `Form.module.css`.

# Next.js 13 + Tailwind CSS Starter (Docker Ready)

By Connor Doman

## Info

| Environment | Port     |
| ----------- | -------- |
| Production  | 80, 8080 |
| Development | 3000+    |

## Creation Instructions

If you'd like to create your own project rather than duplicating this one, you can use `create-next-app`, a tool created by Vercel to boostrap Next.js projects.

Create a Next.js App:

```bash
npx create-next-app@latest
```

This project **uses TypeScript**, **uses ESLint**, **uses `/app`** as the root directory, and **uses Tailwind CSS**.

This app does _not_ use `yarn` or `src/`.

## Build Instructions

If you cloned this repo, you must first run

```bash
npm install
```

to install the dependencies.

### Containerize

To deploy this app at scale we must containerize it. Fortunately, Next.js is well supported as a Docker container.

`Dockerfile`

```Dockerfile
FROM node:18.18.0

ENV PORT 3000

# Create app directory
RUN mkdir /var/movable/ && mkdir /var/movable/app
WORKDIR /var/movable/app

RUN rm -rf .next*
# Installing dependencies
COPY package*.json /var/movable/app/
RUN npm install

# Copying source files
COPY . /var/movable/app


# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "start"
```

`docker-compose.yml`

```yaml
version: "3.8"
services:
    nextjs:
        ports:
            - 3000:3000
        build:
            context: .
            dockerfile: Dockerfile
        volumes:
            - ./:/var/movable/app
            - /var/movable/app/node_modules
            - /var/movable/app/.next
```

### Building and running

```bash
docker compose up -d --build
```

This command builds the local Docker image, starts the container, and detaches from the container. The container will continue to run in the background. To capture the current terminal, remove `-d`. (A short hand for this command has been provided in `package.json` as `npm run docker-compose`.)

To build and run Next.js for development, use:

```bash
npm run dev
```

This mode starts a local server on port >= 3000 and enables live reloading along with other development features.

To build and deploy Next.js without using Docker:

```bash
npm run build
npm run start
```

`build` will print a summary of page bundle size, SSR rules for every page, and time taken to compile. These builds are cached so as long as `.next` is present in the directory, suqsequent calls to `build` will execute much more quickly.

## Basic Next.js Project Structure

Next.js 13 added the option to use the `app/` folder as the root of your project.

### Creating a page

Pages are added by putting a named folder in `app/` and providing the folder with a `page.tsx` file. The name of the folder will be the name of the page. For example, `app/dashboard/page.tsx` will be at `localhost:3000/dashboard`.

Subpages can be added by using this same pattern inside of another page folder. For example, `app/dashboard/settings/page.tsx` will be at `localhost:3000/dashboard/settings`.

`app/` itself is also a page folder, so `app/page.tsx` will be at `localhost:3000/`. Additionally, this folder has a required secondary file, `layout.tsx`. Within any other page folder, `layout.tsx` is an optional file used to share state across similar elements.

Find more information about pages [here](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts).

#### Examples

`page.tsx`:

```tsx
export default function CustomPage() {
    return <h1>Hello, Home page!</h1>;
}
```

A page must return a default function component or Next.js will generate an error at build time.

`layout.tsx`:

```tsx
export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav></nav>

            {children}
        </section>
    );
}
```

### Custom components

React's core principle is reusable components. To declare custom components to be used in your project you can create a `_components/` folder in `app/` and add a file for each component. For example, `app/_components/CustomComponent.tsx` will be available to import as `CustomComponent` from any file in `app/`.

These files can export any number of custom components. For example, `app/_components/CustomComponent.tsx`:

```tsx
export const CustomComponent = () => {
    return <h1>Hello, World!</h1>;
};
```

This can then be used on a page with:

`app/page.tsx`:

```tsx
import { CustomComponent } from "./_components/CustomComponent";

export default function CustomPage() {
    return <CustomComponent />;
}
```

Other files, like utility scripts that contain reusable functions, can be added to a custom folder that starts with an underscore, like `_utilities/` as well.

### Public files

The root of the project contains a `public/` folder. Resources here are available on the web server at `localhost:3000/<filename>`. For example, `public/favicon.ico` is available at `localhost:3000/favicon.ico`. This is where you place downloadable files, hosted images, and other static resources.

# Next.js 13 + Tailwind CSS Starter (Docker Ready)

By Connor Doman

## Info

| Environment | Port     |
| ----------- | -------- |
| Production  | 80, 8080 |
| Development | 3000+    |

## Install Instructions

Create a Next.js App:

```bash
npx create-next-app@latest
```

## Build Instructions

Dockerize the build:

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

Docker Compose:

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

# `dynamicRouter` Documentation

## Overview

The `dynamicRouter` function dynamically loads controllers from a specified directory and attaches them to an Express router, allowing for modular and scalable routing based on the file structure of the controllers directory.

## Function Signature

```typescript
const dynamicRouter = (baseDir: string): Router => { ... }
```

## Parameters

- **`baseDir`**: The base directory from which to start loading controllers. It should be a string representing the absolute path to the controllers' directory.

## Returns

- **`Router`**: An Express router instance with all the controllers attached to their respective routes.

## Behavior and Usage

### Example Usage

To use the `dynamicRouter` function, provide the path to your controllers' directory and attach the returned router to your Express application:

```typescript
const router = dynamicRouter(path.join(__dirname, "controllers/"));
app.use("/api", router);
```

This sets up all routes under the `/api` prefix.

### Directory Structure

The `dynamicRouter` function works based on the directory structure of the controllers. For example:

```
controllers/
├── auth/
│   ├── authController.ts
│   └── userController.ts
└── indexController.ts
```

Given this structure, the `dynamicRouter` function will create the following routes:

- `/api/auth/auth` handled by `authController.ts`
- `/api/auth/user` handled by `userController.ts`
- `/api/index` handled by `indexController.ts`

### Supported Methods

The `dynamicRouter` function attaches routes for the following HTTP methods if they are defined in the controller:

- **`put`**: Attaches a `PUT` route.
- **`get`**: Attaches a `GET` route.
- **`post`**: Attaches a `POST` route.
- **`patch`**: Attaches a `PATCH` route.
- **`delete`**: Attaches a `DELETE` route.
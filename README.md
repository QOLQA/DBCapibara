# Qolqa Database Tool Modelling

## Packages that we are using

- [Redux](https://redux.js.org/) for client side state management
- [React router](https://redux.js.org/) for manage routing
- [React flow](https://reactflow.dev/) for create node based UIs
- [Tailwind](https://tailwindcss.com/) for styles
- [BiomeJS](https://biomejs.dev/) as linter and formatter

## Run the project

- Clone the project

```
git clone https://github.com/QOLQA/DBCapibara
```

- Navigate to the project

```
cd DBCapibara
```

- Install pnpm globally

```
npm install -g pnpm
```

- Install all dependencies with `pnpm`

```
pnpm install
```

- Run the server

```
pnpm run dev
```

## Environment variables

Before running the project, you need to create a `.env` file in the root of the project to define the backend URL.

Add the following line depending on your setup:

- **If using Docker Compose**, use the container name of the backend as the domain:
```
VITE_BACKEND_URL=http://qolqa-backend:8000
```
- **If running locally on your machine**, use:
```
VITE_BACKEND_URL=http://localhost:8000
```

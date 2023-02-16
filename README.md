# OMDb Search React App

![screenshot](screenshot.png)

Aplicación para buscar películas usando la API de https://www.omdbapi.com

Requerimientos:

- [x] Necesita mostrar un input para buscar la película y un botón para buscar.
- [x] Lista las películas y muestra el título, año y poster.
- [x] Que el formulario funcione
- [x] Haz que las películas se muestren en un grid responsive.
- [x] Hacer el fetching de datos a la API

Primera iteración:

- [x] Evitar que se haga la misma búsqueda dos veces seguidas.
- [x] Haz que la búsqueda se haga automáticamente al escribir.
- [x] Evita que se haga la búsqueda continuamente al escribir (debounce)

Segunda iteración:

- [x] Busca por los demás campos que permite la API.
- [x] Haz que se pueda ordenar por alguno de los campos. (ej. titulo).

---

This project was bootstrapped with [Create Vite Project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) configured with a **React SWC** template:

```shell
npm create vite@latest omdb-search-react-app --template react-swc
```

## First Steps

To begin developing this project...

1. Request for an API key using [the following form](https://www.omdbapi.com/apikey.aspx) and create an `.env.local` file using `.env.example` file.

    ```properties
    VITE_OMDB_APIKEY="<Your API key>"
    ```

    E.g.: `4287ad07`

2. Run next instructions in a command prompt:

    ```shell
    npm install
    npm run dev
    ```

## Available Scripts

In a project where Vite is installed, you can use the `vite` binary in your `npm` scripts, or run it directly with `npx vite`. Here are the default npm scripts in a scaffolded Vite project:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.

### `npm run preview`

Locally preview production build.

Once you've built the app, you may test it locally by running `npm run preview` command.

The `vite preview` command will boot up a local static web server that serves the files from `dist` at [http://localhost:4173](http://localhost:4173). It's an easy way to check if the production build looks OK in your local environment.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://reactjs.org/).

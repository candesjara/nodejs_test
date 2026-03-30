# nodejs_test

Backend demo con Node.js y Express para gestionar empleados mediante una API CRUD.

## Diagnostico del problema original

Render estaba intentando arrancar un archivo incorrecto: `src/index.js`.
En este proyecto el archivo real de entrada es `backend/index.js`, y el `package.json` valido para el servicio esta en la raiz del repositorio.

## Decision tomada sobre MongoDB

Para dejar el proyecto desplegable de forma simple y estable en Render, se reemplazo temporalmente MongoDB por persistencia basada en archivo JSON.

Motivos:

- evita depender de una base externa para una API de practica
- reduce configuracion para estudiantes
- mantiene los mismos endpoints CRUD
- permite desplegar rapido como demo funcional

Esta es una **version demo**. Los datos se guardan en `backend/data/empleados.json`.
En Render el sistema de archivos es efimero, asi que los datos pueden reiniciarse en nuevos deploys o reinicios de instancia.

## Estructura relevante

- `package.json`
- `backend/index.js`
- `backend/routes/empleado.route.js`
- `backend/controllers/empleado.controller.js`
- `backend/store/empleado.store.js`
- `backend/data/empleados.json`
- `render.yaml`

## Ejecutar local

```bash
npm install
npm start
```

El servidor escucha en `process.env.PORT || 3000`.

## Endpoints

- `GET /`
- `GET /api/empleados`
- `POST /api/empleados`
- `GET /api/empleados/:id`
- `PUT /api/empleados/:id`
- `DELETE /api/empleados/:id`

## Despliegue en Render

Desplegar como **Web Service**.

Configuracion exacta:

- Root Directory: raiz del repositorio
- Build Command: `npm install`
- Start Command: `npm start`

Node:

- `engines.node` fijado en `22.x`

Si usas Blueprint en Render, puedes tomar `render.yaml` directamente.

## Nota para una futura version con MongoDB

Si mas adelante quieres pasar a MongoDB Atlas, la recomendacion es hacerlo con una variable de entorno `MONGODB_URI` y una capa de acceso a datos separada, pero para esta version demo no es necesario.

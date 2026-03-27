# Backend

API en NestJS con MariaDB.

## Qué levanta

- API REST en `http://localhost:3001`
- Swagger en `http://localhost:3001/api-docs`
- Base de datos MariaDB en `localhost:3306`

## Arranque rápido con Docker

Desde esta carpeta:

```bash
docker compose up --build
```

Esto levanta base de datos, backend y frontend porque el `docker-compose.yml` ya referencia ambos proyectos.

## Arranque local del backend

```bash
npm install
npm run start:dev
```

Si arrancas el backend fuera de Docker, asegúrate de tener MariaDB disponible y de pasar las variables de entorno de conexión.

## Scripts útiles

```bash
npm run build
npm run start:dev
npm run test
```

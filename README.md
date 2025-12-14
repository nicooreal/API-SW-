# Trabajo Final Frontend – Star Wars

Este proyecto es una aplicación web desarrollada en React como trabajo final de la diplomatura frontend.

La aplicación consume datos de la API pública SWAPI y muestra un listado de personajes del universo Star Wars, permitiendo buscar por nombre y ver información detallada de cada uno.

---

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- API pública SWAPI

---

## Variables de entorno

Para evitar dejar la URL de la API escrita directamente en el código, el proyecto utiliza variables de entorno.

Se debe crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_API_BASE_URL=https://www.swapi.tech/api

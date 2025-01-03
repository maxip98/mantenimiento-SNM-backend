# Mantenimiento SNM - Backend

Este repositorio contiene el código del backend para la aplicación de gestión de mantenimiento SNM.

## Descripción

La aplicación de gestión de mantenimiento SNM permite a los usuarios gestionar y realizar un seguimiento del mantenimiento de equipos y maquinaria. Este backend proporciona las APIs necesarias para la gestión de usuarios, equipos, órdenes de trabajo y reportes.

## Tecnologías

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens) para autenticación

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/maxip98/mantenimiento-SNM-backend.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd mantenimiento-SNM-backend
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

## Uso

1. Inicia el servidor:
    ```bash
    npm start
    ```
2. El servidor estará disponible en `http://localhost:3000`.

## Endpoints

- `POST /api/auth/register` - Registro de nuevos usuarios
- `POST /api/auth/login` - Inicio de sesión de usuarios


## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.# SNM_mantenimiento_back

# Planificador de tareas - Full Stack Junior

Aplicación web simple de gestión de tareas personales desarrollada como ejercicio técnico para un puesto **Desarrollador/a Full Stack Junior**.

Permite crear, listar, actualizar y eliminar tareas, con filtros y búsqueda.

---

## Tecnologías utilizadas

### Backend
- **Node.js**
- **Express**
- **MongoDB Atlas**
- **Mongoose**
- **Cors**
- **Dotenv**

### Frontend
- **React**
- **Tailwind CSS**
- **Axios**

---

## Backend - Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd task-manager/backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo .env dentro de la carpeta backend con el siguiente contenido:

```bash
PORT=5000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/taskdb
```

### 4. Ejecutar el servidor
```bash
npm run dev
```

El backend estará disponible en:

http://localhost:5000

#### Endpoints disponibles
- Listar tareas : GET /api/tasks

- Crear tarea: POST /api/tasks
Body (JSON):
{
  "title": "Nueva tarea",
  "description": "Descripción opcional"
}

- Actualizar tarea: PUT /api/tasks/:id

- Eliminar tarea: DELETE /api/tasks/:id

Funcionalidades Bonus

- Filtrar tareas por estado: 

GET /api/tasks?status=completed
GET /api/tasks?status=pending

- Búsqueda por título: GET /api/tasks?search=texto


Ordenar por fecha de creación (por defecto descendente)

## Pruebas 

Los endpoints fueron probados utilizando Postman antes de integrar el frontend.

## Frontend - Instalación y ejecución
### 1. Instalar dependencias
```bash
cd task-manager/frontend
npm install
```

### Funcionalidades implementadas

- Listado de tareas obtenidas desde la API

- Creación de nuevas tareas

- Edición inline de título y descripción

- Cambio de estado (pendiente / completada)

- Eliminación de tareas

- Búsqueda de tareas por título

- Filtrado por estado

- Ordenamiento por fecha de creación

### Conexión con el backend

La comunicación con el backend se realiza mediante Axios, centralizando la configuración en un helper: (src/util/api.js)

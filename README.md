Prueba Técnica:

Stack Tecnológico
Frontend: React.js con Vite.

Backend: Node.js con Express.

Base de Datos: MySQL.

Automatización: n8n e IA (Groq).

Pasos para la Instalación

1. Base de Datos
   Debe contar con un servidor MySQL activo.

Localice el archivo script_db.sql en la raíz del proyecto.

Ejecute el script en su cliente SQL.

El proceso creará la base de datos prueba_tecnica, la tabla lugares e insertará registros iniciales.

2. Backend
   Acceda a la carpeta del servidor:
   cd backend

Instale las dependencias necesarias:
npm install

Configure las variables de entorno:

Renombre el archivo .env.example a .env.

Complete los campos con las credenciales de su base de datos local (Host, Usuario, Contraseña).

Inicie el servicio:
node index.js

3. Frontend
   Acceda a la carpeta de la interfaz:
   cd frontend

Instale las dependencias:
npm install

Configure el entorno:

Renombre el archivo .env.example a .env.

Verifique que la variable VITE_API_URL coincida con la dirección de su backend (por defecto http://localhost:3000).

Inicie la aplicación:
npm run dev

La aplicación estará disponible en: http://localhost:5173

Automatización con n8n e IA
El proyecto incluye un flujo ubicado en la carpeta /n8n, encargado de la inserción automática de datos.

Funcionamiento del flujo:
Lectura de Dataset: Procesa una lista de nuevos lugares (bares o eventos) a agregar.

Búsqueda de Candidatos: Realiza consultas a la API del backend para identificar registros existentes con nombres similares.

Procesamiento con IA: Utiliza el modelo de lenguaje de Groq para comparar el dataset con los candidatos y determinar si son duplicados.

Carga de no repetidos: Los lugares nuevos que no son duplicados son enviados al backend, para su posterior inserción en la base de datos.

Configuración de la IA:
El flujo requiere una conexión con la API de Groq para operar.

Genere una API Key en el panel de Groq Cloud.

En su instancia de n8n, cree una nueva credencial de tipo Groq API y vincule su llave.

Asegúrese de que el nodo Groq Chat Model esté configurado para utilizar dicha credencial.

Ejecución:
Para probar esta funcionalidad, importe el archivo n8n/flujo_prueba_tec.json en su instancia de n8n. Es necesario que el backend esté en ejecución para permitir la comunicación de los nodos HTTP.

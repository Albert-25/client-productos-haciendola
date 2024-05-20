# client-productos-haciendola 

Este proyecto es una aplicación web construida con ReactJS, Redux y MaterialUI para la gestión de productos.

## Descripción del proyecto

La aplicación permite a los usuarios agregar, editar y eliminar productos, así como también ver una lista paginada de los productos disponibles.

Además les permite la opcion de cambiar su contraseña

## Pasos para levantar el proyecto

1. **Clonar el repositorio:**

- Ejecutar: git clone https://github.com/Albert-25/client-productos-haciendola.git

2. **Agregar un archivo .env en la raiz del proyecto**
   
   - El archivo .env debe contener la siguiente y unica variable:

    ```
    REACT_APP_API_URL=http://localhost:3001
    ```

    se recomienda dejar el valor por defecto en el archivo .env.example ya que la api se levanta en ese puerto

3. **Instalar dependencias:**
- Asegúrate de tener Node.js instalado en tu sistema y usar la version indicada en el archivo .nvmrc
- En la raíz del proyecto, ejecuta el siguiente comando para instalar las dependencias: npm install


4. **Iniciar la aplicación:**
- Una vez que se hayan instalado las dependencias, puedes iniciar la aplicación ejecutando: npm start

La aplicación se abrirá automáticamente en tu navegador en [http://localhost:3000](http://localhost:3000).
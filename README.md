# Proyecto: TumTum Clothing

## 1. Descripción del Proyecto

TumTum Clothing es una tienda virtual de ropa. Este repositorio corresponde a la **Experiencia 2** de la asignatura, la cual implementa la capa de backend utilizando **Spring Boot** y la capa de frontend con **React**.

El enfoque principal de esta entrega es el desarrollo de las funcionalidades del **perfil de Administrador**, permitiendo la gestión integral de la tienda.

### Características Principales

* **Gestión de Usuarios:** CRUD completo (Crear, Leer, Actualizar, Eliminar/Inhabilitar) para todos los usuarios del sistema (clientes, vendedores, super-admin).
* **Gestión de Inventario/Productos:** CRUD completo de productos, incluyendo nombre, descripción, precio, stock, categoría y un endpoint para la subida de imágenes.
* **Autenticación Simple:** Un endpoint de login que valida las credenciales y el rol de administrador contra la base de datos (sin JWT en esta etapa).
* **Dashboard Administrativo:** Un panel de control en React que muestra estadísticas clave como el total de productos, total de usuarios y productos con stock bajo.
* **Alertas de Stock:** Indicadores visuales en el frontend para productos con stock crítico (menos de 5 unidades).
* **Validaciones:** Todos los formularios de React cuentan con validaciones en tiempo real, mensajes de error claros y feedback visual.

## 2. Tecnologías Utilizadas

Para este proyecto se utilizaron las siguientes tecnologías:

### Backend
* **Java:**
* **Spring Boot:** 
    * Spring Web
    * Spring Data JPA
* **Base de Datos:** MySQL
* **Gestor de Dependencias:** MAVEN

### Frontend
* **React:** 
* **Gestor de Paquetes:** NPM
* **Peticiones HTTP:** FETCH
* **Routing:** React Router
* **Estilos:** Bootstrap, CSS

### Entorno
* **Base de Datos:** XAMPP (para levantar el servicio MySQL)
* **IDE Base de Datos:** MySQL Workbench
* **Control de Versiones:** Git y GitHub

## 3. Instrucciones de Instalación

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos
* Tener instalado **Visual Studio Code**.
* Tener instaladas las extensiones de VS Code:
    * **Extension Pack for Java** (de Microsoft)
    * **Spring Boot Extension Pack** (de VMware)
* Tener instalado Java JDK 21
* Tener instalado Node.js 
* Tener instalado XAMPP (para MySQL).
* Tener instalado MySQL Workbench (recomendado).
* Tener instalado Git.

### 1. Clonar el Repositorio
1.  Abre VS Code 
2.  Ve al apartado de git de VS Code ( en la barra alteral,entre el debug y el buscador)
3. Presiona en Clone Repository, luego, pon el link del repositorio (https://github.com/VicenteAlfaroS/TumTum-Clothing)

### 2. Configuración de la Base de Datos
1.  Inicia el módulo **MySQL** y **Apache** desde el panel de control de XAMPP.
2.  Abre MySQL Workbench y conéctate a tu instancia local.
3.  Crea un nuevo *schema* (base de datos) con el nombre: tumtum

### 3. Configuración del Backend (Spring Boot)
1.  Abre la carpeta del backend (BackEnd en la carpeta del proyecto) en tu explorador de VS Code.
2.  Las extensiones de Java y Spring Boot **detectarán automáticamente** el proyecto (`pom.xml`) y comenzarán a descargar todas las dependencias de Maven/Gradle. Puedes ver el progreso en la barra de estado de VS Code.
3.  Navega a `src/main/resources/application.properties`
4.  Asegúrate de que la configuración de la base de datos coincida con la que creaste:

    ```properties
    # Asegúrate de que el puerto (3306) y el nombre de la BD sean correctos
    spring.datasource.url=jdbc:mysql://localhost:3306/tumtum
    
    # Cambia esto si tu MySQL no usa 'root' y sin contraseña
    spring.datasource.username=root
    ```

### 4. Configuración del Frontend (React)
1.  Abre una terminal integrada en VS Code (`Terminal` > `Nuevo terminal` o `Ctrl+Shift+Ñ`).
2.  Asegúrate de que la terminal esté en la carpeta del frontend:
    ```bash
    cd FrontEnd
    ```
3.  En esa terminal, instala las dependencias:
    ```bash
    npm install

## 4. Instrucciones de Ejecución

Una vez instalado todo:

1.  **Iniciar Base de Datos:** Verifica que MySQL esté corriendo desde XAMPP.

2.  **Ejecutar Backend (Spring Boot):**

    * **Opción A: Con Visual Studio Code (Recomendado)**
        Si tienes VS Code con las extensiones **"Extension Pack for Java"** y **"Spring Boot Extension Pack"**, el proceso es automático:
        1.  Abre la carpeta del backend.
        2.  Ve a la pestaña de "Spring Boot" en la barra lateral.
        3.  Verás tu aplicación (ej: `tumtum-clothing`). Simplemente haz clic en el ícono de "Play" (Iniciar) al lado del nombre.

    * **Opción B: Por terminal (Modo tradicional)**
        1.  Abre una terminal en la carpeta del backend.
        2.  Ejecuta:
            ```bash
            # Si usas Maven
            ./mvnw spring-boot:run
            

    El backend estará corriendo en `http://localhost:8080`.

3.  **Ejecutar Frontend (React):**
    * Abre una terminal integrada en la carpeta del frontend y ejecuta:
        ```bash
        # Si usas NPM
        npm run dev
        

    * La aplicación se abrirá automáticamente en tu navegador en `http://localhost:5173`.

## 5. Credenciales de Prueba

Para acceder al panel de administrador y probar las funcionalidades, utiliza el usuario administrador creado por el script de poblado de datos:

* **Usuario:** `juan@duoc.cl`
* **Contraseña:** `juan123`

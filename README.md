
# Tienda en Línea

## Definición del problema

La empresa CPSITeM solicita que un equipo de desarrollo se encargue de crear un sitio web que les permita realizar las siguientes actividades:
 - **Gestión de inventario**
 - **Ventas de productos en línea**
 - **Administración de servicios**
 - **Registro de personal**

Ya que actualmente cuentan con un sitio web muy básico que no les permite realizar las operaciones antes mencionadas de manera cómoda y eficiente.


## Objetivo

Diseñar y construir una aplicación web que permita a la empresa gestionar su inventario, realizar ventas de productos en línea, administrar los servicios que proporcionan, así como permitirle a sus trabajadores tener una interacción más accesible y detallada con los clientes en lo referente a los servicios que estos solicitan.


## Alcance

Se pretende que para la tercera semana de diciembre la aplicación permita al personal administrativo gestionar su inventario y personal. Así como al usuario hacer sus compran en línea y solicitar servicios a la empresa.


## Viabilidad
El proyecto reúne las características y condiciones que aseguran el alcance de sus objetivos. Además, sus componentes están enmarcados dentro de un esquema estructurado que hacen al proyecto viable de realizar.


## Justificación

Por medio del desarrollo de la plataforma web se logrará una mejora notable en la gestión del inventario y los servicios pertenecientes a CPSITeM. El cliente tendría que ser capaz de recibir una actualización constante sobre nuevos productos y el estatus de los servicios que solicita desde el sitio web.


## Riesgos de desarrollo

 - Malas estimaciones de tiempo para la realización de actividades relacionadas al plan de trabajo.
 - Alguna especificación del proyecto podría necesitar cambios y/o mejoras en la etapa de desarrollo.
 - La falta de experiencia con los lenguajes y/o tecnologías que se utilizaran para el desarrollo de la aplicación.
 - Fallas en el sistema de software o hardware.
 - Falta de conocimiento sobre los requerimientos del cliente que se hayan omitido durante la etapa de recolección de información.


## Propuesta de recursos

 - Software gratuito para el desarrollo de la aplicación web.
 - Seguimiento de estándares en el desarrollo para evitar conflictos en la unificación de los componentes de la aplicación.
 - Los recursos necesarios para el alojamiento del sitio web y la base de datos.
 - Utilizar un sistema para la gestión de versiones.
 - Apoyarnos de *API Docs* para la documentación del código.
 - Utilizar los navegadores *Google Chrome v49, Internet Explorer 11, Mozilla Firefox v61, Safari 11 y Edege 17* para asegurarnos de que el sitio se muestra de manera correcta an la mayor cantidad de navegadores como sea posible.


## Módulos y su Funcionalidad

-  **Carrito**
Este modulo permite tener acceso a clientes previamente registrados, a un carrito de compra, donde se almacena de forma temporal, todos los artículos que se desean comprar o de alguna forma en un futuro se pretenden adquirir.
-   **Servicios**
Dentro de este apartado entran dos perfiles, tanto el empleado o el usuario (cliente), ya que por una parte los empleados les permite cambiar a estatus a servicios previamente solicitados por clientes o incluso dar algun seguimiento, por otra parte a los clientes les permite verificar la gama de servicios que brinda la empresa y a los cuales se puede realizar alguna Reservacion o solicitar alguna alta.
-   **Login**
En este apartado entran todos los usuarios, desde administradores, empleados, clientes, ya que es el filtro que va determinar que acciones son posibles de acuerdo a tu nivel de usuario o que acciones simplemente van a estar deshabilitadas de acuerdo a tu perfil.

## Usuarios y Permisos
-   **Administrador**
Este usuario tendrá acceso total a modificaciones dentro del sistema, cabe mencionar que también podrá realizar cambios a otros usuarios en cuanto a permisos.
-   **Vendedor**
Puede tener acceso a modificaciones de estatus de servicios que están pendientes o que ya fueron realizados, también pueden realizar actividades dentro de la plataforma como dar de lata un nuevo producto, actualizar el inventario o simplemente realizar modificaciones a post creados dentro de la misma pagina.
-   **Cliente**
Este usuario se agregan permisos única y exclusivamente para verificar productos y dar seguimiento a un proceso de compra, o simplemente para poder agregar artículos a su carro de compra para posteriormente poder adquirirlos.

## Proceso de instalación local (Linux)
>_**Debian-based distribution like Ubuntu**_
### Instalar Git
	sudo apt-get install git-all
### Instalar Node.js y npm
	curl -sL https://deb.nodesource.com/setup_10.11.0 | sudo -E bash -
	sudo apt-get install -y nodejs
### Clonar proyecto
	git init
	git clone https://github.com/lCh3z/CPSITeM_API.git
### Instalar dependencias
	npm install --only=prod
>Omitir '--only=prod' si se quiere instalar en ambiente de desarrollo
### Instalar MySQL
	sudo apt-get update
	sudo apt-get install mysql-server mysql-client
	sudo mysql_secure_installation
#### Instalar MySQL Workbench (Recomendado)
	sudo apt-get install mysql-workbench
Si se te dificulta algo con esta parte de la instalación, puedes consultar esta [guía de instalación](https://platzi.com/java-basico-2015/tutoriales/instalar-mysql-y-workbench-en-linux-ubuntu-1404/).
### Inicializar la base de datos
Si al instalar workbech o cualquier SGBD que utilices, este no crea una conexión por defecto, tendrás que crearla y conectarte a la misma con el usuario root que definiste en la instalación de mysql.
Bien, una vez estés dentro, ejecutar las siguientes líneas:
#### Crear usuario para la aplicación
	CREATE USER 'nombre_usuario'@'localhost' IDENTIFIED BY 'tu_contrasena';
	CREATE DATABASE MyDataBase;
	GRANT ALL PRIVILEGES ON MyDataBase. * TO 'nombre_usuario'@'localhost';
	FLUSH PRIVILEGES;
#### Creación de tablas, disparadores y procedimientos almacenados
Para esto, simplemente tendrás que copiar todo el contenido del archivo [db.sql](docs/docs/db.sql), pegarlo en MySQL Workbench y ejecutarlo.
### Definir variables de entoro
En el directorio donde clonaste el proyecto hay un archivo _.env_example_, tienes que renombrarlo por _.env_. Este archivo contiene las variables de entorno, donde cada una de estas representa algo distinto:
<table>
	<thead>
		<tr>
			<th>Variable</th>
			<th>Descripción</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>DB_USER</td>
			<td>dirección de la base de datos</td>
		</tr>
		<tr>
			<td>DB_HOST</td>
			<td>dirección de la base de datos</td>
		</tr>
		<tr>
			<td>DB_USER</td>
			<td>usuario de la base de datos</td>
		</tr>
		<tr>
			<td>DB_PASS</td>
			<td>contraseña del usuario</td>
		</tr>
		<tr>
			<td>DB_NAME</td>
			<td>nombre de la base de datos</td>
		</tr>
		<tr>
			<td>DB_PORT</td>
			<td>puerto de la base de datos</td>
		</tr>
		<tr>
			<td>PORT</td>
			<td>puerto de la aplicación</td>
		</tr>
		<tr>
			<td>SECRET</td>
			<td>cadena para cifrado</td>
		</tr>
		<tr>
			<td>USER_TIME</td>
			<td>tiempo de expiración de sesión de usuario</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>
Una vez que sabes que representa cada una, deberás reasignar los valores por los necesarios para tu proyecto.

### Ejecutar Aplicación
	node index.js

## Enlaces relacionados

- **Sitio demostrativo** [\[Acceder\]](https://cpsitem.herokuapp.com/)
- **GitHub Page** [\[Acceder\]](https://lch3z.github.io/CPSITeM_API/)
- **Repositorio de GIT** [\[Acceder\]](https://github.com/lCh3z/CPSITeM_API)
- **Colección de POSTMAN** [\[Acceder\]](https://www.getpostman.com/collections/e592223584344d2fe0d9)
- **Hosting gratuito de DB** [\[Acceder\]](https://www.db4free.net/)
## Licencia
Este proyecto está licenciado bajo la GNU GENERAL PUBLIC LICENSE Version 3. Ir a  [LICENSE](LICENSE) para más información.
## Colaboradores
<table>
    <tbody>
        <tr>
            <td align="center" valign="top" width="23%">
                <a href="https://github.com/lCh3z">
                <img src="https://avatars3.githubusercontent.com/u/26315653?s=460&v=4" width="75px" height="75px"><br/>
                <sub>Luis Angel</sub></a>
            </td>
            <td align="center" valign="top" width="23%">
                <a href="https://github.com/dartrox21">
                <img src="https://avatars2.githubusercontent.com/u/39166989?s=460&v=4" width="75px" height="75px"><br/>
                <sub>Saúl Ruiz</sub></a>
            </td>
            <td align="center" valign="top" width="23%">
                <a href="https://github.com/UlisesMarcos">
                <img src="https://avatars2.githubusercontent.com/u/32921038?s=460&v=4" width="75px" height="75px"><br/>
                <sub>Ulises Marcos</sub></a>
            </td>
            <td align="center" valign="top" width="23%">
                <a href="https://github.com/Oscar98">
                <img src="https://avatars3.githubusercontent.com/u/22420263?s=460&v=4" width="75px" height="75px"><br/>
                <sub>Oscar Eduardo</sub></a>
            </td>
        </tr>
    </tbody>
</table>

# UsersAdministrator

###Aplicación del **Code Challenge**

- Se escogió el framework **Angular** v8.
Para los estilos se usó vanilla CSS paara mayor flexibilidad en el diseño.

- Como arquitectura de CSS se implementó SMACSS para reutilizar clases de CSS, tener un mejor orden y aumentar la escalabilidad al crear módulos de estilos.

- Se integró el uso de `<iframe>` y el método **postMessage()** de la API del navegador **Window** para comunicar dos páginas distintas una  insertada dentro de otra  y mostrarlas al usuario como una sola página.

- Se uso **programación reactiva** y componentes desacoplados para simplificar el manejo del estado y composición de la interfaz de usuario.


- Se uso FirebaseAuth para la autenticación(login) y se creó un mock de la clase para los tests;

##Accesos para probar login: 
Usuario: yulissa.lteran@gmail.com
Contraseña: YulissaT*@

## Instalación

Importante:
1 Tener instalado Node.js y NPM.
2 Ejecutar el comando `npm i` para instalar las dependencias de la aplicación.

## Correr servidor localmente

Ejecutar el comando `ng serve` donde se levantará la aplicación en el puerto `http://localhost:4200/`.

## Construir aplicación para producción.

Ejecutar el comando `ng build --prod` para construir el proyecto. Donde después se creará una carpeta `dist/`.

## Ejecutar los test

Ejecutar el comando `ng test` y para ver el coverage de los test ejecutar el comando `ng test --code-coverage`.


El enunciado a desarrollar fue el siguiente:

Requerimiento:

>Inicio de sesión
Un mantenimiento de usuarios que permita realizar las siguientes acciones:
Listar usuarios  (pantalla)
Agregar / Modificar (pantalla)
Eliminar              
Cambiar Estado
Un formulario que permita la comunicación entre dominios.
Los atributos para la entidad usuario son los siguientes:

>Nombre de usuario                                        (mandatorio)
Contraseña                                                       (mandatorio) - Implementar contraseña segura
Apellidos y Nombres                                     (mandatorio)
Dirección                                                            (opcional)
Correo Electrónico                                         (opcional)
Estado (Habilitado / Inhabilitado)            (por default: habilitado)
Criterios de evaluación:

>Experiencia en Javascript, CSS3, HTML5.
Conocimiento de programación funcional.
Experiencia en programación orientada a objetos.
Experiencia en Testing / Automatización de pruebas de unidad.
Diseño reactivo.
Manejo de estado.
Uso de mocks.
Las tecnologías, frameworks, librerías, complementos a utilizar quedan a criterio del candidato:

>Lenguaje de programación: Angular, React, Vue, etc.
Pruebas de Unidad.
Frameworks UI.
Mocks para la emulación de datos.

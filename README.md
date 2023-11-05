# Documentación de la API - API Documentation

## Introducción - Introduction

Esta API está diseñada para gestionar información relacionada con empleados, invitados, reservaciones, habitaciones y usuarios.
Se usan las librerías Boom y Joi para el manejo de errores y schemas o DTO's. De igual manera se utilizan las librerias Cron y Node-cron para manejar tareas con ejecución cada cierto tiempo para verificar las fechas de checkin y checkout cada día y de esa manera cambiar automaticamente el estado las habitaciones de available a occupied o maintance. Para consultar la información se debe hacer login en el path `auth/login`, allí se obtiene un token para la autorización el cual será valido por 15 minutos, despues de los cuales el usuario debe loguearse de nuevo, los endpoints de crear, actualizar y borrar, así como los endpoints relacionados con la consulta y manejo de usuarios solo pueden ser consumidos por usuarios con rol de administradores, excepto el endpoint de crear usuario el cual puede ser consumido por cualquier persona, solo requiere ingresar los datos y allí obtendra credenciales de usuario para poder loguearse y consumir las demas rutas, igualmente el endpoint de crear y editar reservaciones puede ser consumido por personas con credenciales tanto de administradores como de usuarios. Se utiliza Swagger para la documentación, y puedes consultarla mediante el endpoint `/api-docs`.

This API is designed to manage information related to employees, guests, reservations, rooms and users.
The Boom and Joi libraries are used to handle errors and schemas or DTOs. The Cron and Node-cron libraries are also used to manage tasks that are executed from time to time to check the checkin and checkout dates each day and thus automatically change the status of the rooms from available to occupied or maintance. To query the information you must login in the path `auth/login`, there you get a token for authorisation which will be valid for 15 minutes, after which the user must login again, the create, update and delete endpoints, as well as the endpoints related to query and manage users can only be consumed by users with administrator role, except the create user endpoint which can be consumed by any person, it only requires entering the data and there you will get user credentials to log in and consume the other routes, likewise the endpoint to create and edit reservations can be consumed by people with credentials of both administrators and users. Swagger is used for documentation, and you can view it via the `/api-docs` endpoint.

## Endpoints

A continuación, se describen los endpoints disponibles:
The available endpoints are described below:

### Ruta Base - Base Path

Tenemos una ruta base para todas nuestros endpoints, excepto la documentación, que es `/api/v1/`. Para acceder, por ejemplo, al endpoint de habitaciones la ruta sería:

We have a base path for all our endpoints, except the documentation, which is `/api/v1/`. To access, for example, the rooms endpoint, the path would be:

`https://myserver/api/v1/rooms`

### Login

- Loguearse en el sistema/Login
  - URL: `/auth/login`
  - Método: POST
  - Descripción: Nos permite loguearnos usando email y password y nos otorga un token de acceso/It allows us to log in using email and password and gives us an access token.

### Recovery

- Obtener un link de acceso para poder cambiar la contraseña/Get the acces link to change the password
  - URL: `/auth/recovery`
  - Método: POST
  - Descripción: Enviamos el correo electronico registrado en el sistema y recibimos en el un link para la recuperación de la contraseña/We send the e-mail address registered in the system and receive a link to recover the password.

### change-password

- Cambiar la contraseña/Change the password
  - URL: `/auth/change-password`
  - Método: POST
  - Descripción: Nos permite cambiar la contraseña, recibe el token generado y la nueva contraseña (newPassword)/Allows us to change the password, receives the generated token and the new password  

### Empleados (Employees)

- Consultar todos los empleados/Get all the employees data
  - URL: `/employees`
  - Método: GET
  - Descripción: Nos trae la información de todos los empleados
- Consulta por id/Query by ID
  - URL: `/employees/:id`
  - Método: GET
  - Descripción: Obtiene información del empleado mediante su id.
- Consulta por Email/Query by Email
  - URL: `/employees/email/:email`
  - Método: GET
  - Descripción: Obtiene información del empleado mediante su dirección de correo electrónico/Obtains employee information via their e-mail address.
- Consulta por Identificación/Query by ID
  - URL: `/employees/identification/:identification`
  - Método: GET
  - Descripción: Obtiene información del empleado mediante su identificación/Obtains employee information by means of employee identification.

### Huespedes (Guests)

- Consulta General/General Query
  - URL: `/guests`
  - Método: GET
  - Descripción: Obtiene una lista de todos los huéspedes/Get an array of all the guests
- Consulta por id/Query by ID
  - URL: `/guests/:id`
  - Método: GET
  - Descripción: Obtiene información del huésped mediante su id/Gets information about the host via its id.
- Consulta por Email/Query by Email
  - URL: `/guests/email/:email`
  - Método: GET
  - Descripción: Obtiene información del huésped mediante su dirección de correo electrónico/Obtains guest information via their e-mail address.
- Consulta por Identificación/Query by Identification
  - URL: `/guests/identification/:identification`
  - Método: GET
  - Descripción: Obtiene información del huésped mediante su identificación/It obtains host information by the host identification.

### Reservaciones (Reservations)

- Consulta General/General Query
  - URL: `/reservations`
  - Método: GET
  - Descripción: Obtiene una lista de todas las reservaciones en conjunto con la información de la habitación y el huésped ligado a esa reservación/Gets a list of all bookings together with the room and guest information linked to that booking.
- Consulta por id/Query by Id
  - URL: `/reservations/:id`
  - Método: GET
  - Descripción: Obtiene información de la reservación por su id/Get booking information by booking id.
- Consulta por Fecha de Check-in/Query by check-in date
  - URL: `/reservations/checkin/:date`
  - Método: GET
  - Descripción: Obtiene reservaciones basadas en la fecha de check-in, el formato debe ser como este `12-25-03` (MM/DD/YY)/Get reservations based on the check-in date, the format should look like this `12-25-03` (MM/DD/YYY).
- Consulta por ID de Cuarto/Query by Room ID
  - URL: `/reservations/room/:room`
  - Método: GET
  - Descripción: Obtiene reservaciones basadas en el ID de la habitación/Gets reservations based on room ID.
- Consulta por ID de Cliente/Client ID Query
  - URL: `/reservations/guestId/:guestId`
  - Método: GET
  - Descripción: Obtiene reservaciones basadas en el ID del cliente/Gets reservations based on customer ID.
- crear reservación/Create a new Reservation
  - URL: `/reservations`
  - Método: POST
  - Descripción: Al realizar la reservación de una habitación el aplicativo valida el estado del cuarto requerido, si está ocupado devolvera una alerta indicandolo, tambien se verifica que la fecha de checkout no sea inferior a la de checking, lo cual corresponde a una incoonsistencia, y si la fecha de checkin es igual a la fecha actual el estado de la habitación cambia de Available a Occupied. Cada 24 horas el sistema verifica las fechas para realizar estos cambios, así como la fecha de checkin para cambiar el estado de la habitación a Maintenance y luego de 24 horas a Available de nuevo/When booking a room the application validates the status of the required room, if it is occupied it will return an alert indicating it, it also verifies that the checkout date is not lower than the checking date, which corresponds to an inconsistency, and if the checkin date is equal to the current date the status of the room changes from Available to Occupied. Every 24 hours the system checks the dates to make these changes, as well as the check-in date to change the status of the room to Maintenance and after 24 hours to Available again.

### Habitaciones (Rooms)

- Consulta General/General Query
  - URL: `/rooms`
  - Método: GET
  - Descripción: Obtiene una lista de todas las habitaciones/Gets a list of all the rooms.
- Consulta por id/Query by Room´s Id
  - URL: `/rooms/:id`
  - Método: GET
  - Descripción: Obtiene información de la habitación mediante su id/Gets the room´s information based on its id.
- Consulta por Tipo/Type Query
  - URL: `/rooms/type/:type`
  - Método: GET
  - Descripción: Obtiene habitaciones basadas en su tipo, estas pueden ser single, double, triple o suite/Gets rooms based on their type, these can be single, double, triple or suite.
- Consulta por Estatus/Status Query
  - URL: `/rooms/status/:status`
  - Método: GET
  - Descripción: Obtiene habitaciones basadas en su estado, los estados habilitados son: available, occupied y maintenance/Gets rooms based on their status, the enabled statuses are: available, occupied and maintenance.
- Consulta por número de habitación/Room´s number Query
  - URL: `/rooms/number/:number`
  - Método: GET
  - Descripción: Obtiene una habitación basada en el número de la misma/Gets a room based on its number.

### Usuarios (Users)

- Consulta General/General Query
  - URL: `/users`
  - Método: GET
  - Descripción: Obtiene una lista de todos los usuarios/Gets a all users list.
- Consulta por id/User´s Id Query
  - URL: `/users/:id`
  - Método: GET
  - Descripción: Obtiene información del usuario mediante su id/Gets a user information through its Id.
- Consulta por Email/Email Query
  - URL: `/users/email/:email`
  - Método: GET
  - Descripción: Obtiene información del usuario mediante su dirección de correo electrónico/Obtains user information via the user's email address.
- Consulta por Rol/Rol Query
  - URL: `/users/role/:role`
  - Método: GET
  - Descripción: Obtiene usuarios basados en su rol, este puede ser Admin o User/Gets users based on their role, this can be Admin or User.

Todos los endpoints tienen sus respectivos métodos POST, PATCH y DELETE/All endpoints have their respective POST, PATCH and DELETE methods.

### Uso de Swagger - Swagger use

Para obtener información detallada sobre los endpoints, puedes consultar la documentación de Swagger accediendo a `/api-docs`/For detailed information on endpoints, you can consult the Swagger documentation by accessing `/api-docs`.

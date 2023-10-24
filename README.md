# Documentación de la API

## Introducción

Esta API está diseñada para gestionar información relacionada con empleados, invitados, reservaciones, habitaciones y usuarios. Se utiliza Swagger para la documentación, y puedes consultarla mediante el endpoint /api-docs.

### Endpoints

A continuación, se describen los endpoints disponibles:

- ruta base:
  tenemos una ruta base para todas nuestros endpoints, excepto la documentación el cual es /api/v1/
  para acceder, por ejemplo, al endpoint de habitaciones la ruta sería:
  https://myserver/api/v1/rooms

- Empleados(employees)
  - - Consultar todos los empleados
       URL:/employees
       Método: GET
       Descripción: Nos trae la información de todos los empleados
  - - Consulta por id
      URL: /employees/:id
      Método: GET
      Descripción: Obtiene información del empleado mediante su id.
  - - Consulta por Email
      URL: /employees/email/:email
      Método: GET
      Descripción: Obtiene información del empleado mediante su dirección de correo electrónico.
  - - Consulta por Identificación
      URL: /employees/identification/:identification
      Método: GET
      Descripción: Obtiene información del empleado mediante su identificación.
- Huespedes (Guests)
    - - Consulta General
      URL: /guests
      Método: GET
      Descripción: Obtiene una lista de todos los huespedes.
    - - Consulta por id
      URL: /guests/:id
      Método: GET
      Descripción: Obtiene información del huesped mediante su id.
    - - Consulta por Email
      URL: /guests/email/:email
      Método: GET
      Descripción: Obtiene información del huesped mediante su dirección de correo electrónico.
  - - Consulta por Identificación
      URL: /guests/identification/:identification
      Método: GET
      Descripción: Obtiene información del huesped mediante su identificación.
- Reservaciones (Reservations)
  - - Consulta General
      URL: /reservations
      Método: GET
      Descripción: Obtiene una lista de todas las reservaciones en conjunto con la información de la habitación y el huesped ligado a esa reservación.
    - - Consulta por id
      URL: /reservations/:id
      Método: GET
      Descripción: Obtiene información de la reservación por su id.
      - - Consulta por Fecha de Check-in
      URL: /reservations/checkin/:date
      Método: GET
      Descripción: Obtiene reservaciones basadas en la fecha de check-in.
      - - Consulta por ID de Cuarto
      URL: /reservations/room/:room
      Método: GET
      Descripción: Obtiene reservaciones basadas en el ID de la habitación.
      - - Consulta por ID de Cliente
      URL: /reservations/guestId/:guestId
      Método: GET
      Descripción: Obtiene reservaciones basadas en el ID del cliente.
      Consulta General
      URL: /reservations
      Método: GET
      Descripción: Obtiene una lista de todas las reservaciones, incluyendo información de los invitados y las habitaciones.
- Habitaciones (Rooms)
  - - Consulta General
      URL: /rooms
      Método: GET
      Descripción: Obtiene una lista de todas las habitaciones.
    - - Consulta por id
      URL: /rooms/:id
      Método: GET
      Descripción: Obtiene información de la habitación mediante su id.
      - - Consulta por Tipo
      URL: /rooms/type/:type
      Método: GET
      Descripción: Obtiene habitaciones basadas en su tipo, estas pueden ser single, double, triple o suite .
      - - Consulta por Estatus
      URL: /rooms/status/:status
      Método: GET
      Descripción: Obtiene habitaciones basadas en su estado, los estados habilitados son: available, occupied y mintenance.
      - - Consulta por número de habitación:
      URL: /rooms/number/:number
      Método: GET
      Descripción: obtiene una habitación basada en el número de la misma  
- Usuarios (Users)
  - - Consulta General
      URL: /users
      Método: GET
      Descripción: Obtiene una lista de todos los usuarios.
    - - Consulta por id
      URL: /users/:id
      Método: GET
      Descripción: Obtiene información del usuario mediante su id.
    - - Consulta por Email
      URL: /users/email/:email
      Método: GET
      Descripción: Obtiene información del usuario mediante su dirección de correo electrónico.
    - - Consulta por Rol
      URL: /users/role/:role
      Método: GET
      Descripción: Obtiene usuarios basados en su rol, este puede ser Admin o User.
- Todos los endpoints tienen sus respectivos métodos post, patch y delete

#### Uso de Swagger

Para obtener información detallada sobre los endpoints, puedes consultar la documentación de Swagger accediendo a /api-docs.

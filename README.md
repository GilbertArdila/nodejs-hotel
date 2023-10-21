# Documentación de la API

## Introducción

Esta API está diseñada para gestionar información relacionada con empleados, invitados, reservaciones, habitaciones y usuarios. Se utiliza Swagger para la documentación, y puedes consultarla mediante el endpoint /api-docs.

### Endpoints

A continuación, se describen los endpoints disponibles:

- Empleados
  - - Consulta por Email
      URL: /employees/email/:email
      Método: GET
      Descripción: Obtiene información del empleado mediante su dirección de correo electrónico.
  - - Consulta por Identificación
      URL: /employees/identification/:ididentification
      Método: GET
      Descripción: Obtiene información del empleado mediante su identificación.
- Invitados (Guests)
  Consulta General
  URL: /guests
  Método: GET
  Descripción: Obtiene una lista de todos los invitados.
- Reservaciones (Reservations)
  - - Consulta por Fecha de Check-in
      URL: /reservations/checkin/:date
      Método: GET
      Descripción: Obtiene reservaciones basadas en la fecha de check-in.
  - - Consulta por ID de Cuarto
      URL: /reservations/room/:roomId
      Método: GET
      Descripción: Obtiene reservaciones basadas en el ID de la habitación.
  - - Consulta por ID de Cliente
      URL: /reservations/customer/:customerId
      Método: GET
      Descripción: Obtiene reservaciones basadas en el ID del cliente.
      Consulta General
      URL: /reservations
      Método: GET
      Descripción: Obtiene una lista de todas las reservaciones, incluyendo información de los invitados y las habitaciones.
- Habitaciones (Rooms)
  - - Consulta por Tipo
      URL: /rooms/type/:type
      Método: GET
      Descripción: Obtiene habitaciones basadas en su tipo.
  - - Consulta por Estatus
      URL: /rooms/status/:status
      Método: GET
      Descripción: Obtiene habitaciones basadas en su estado.
- Usuarios (Users)
  - - Consulta por Rol
      URL: /users/role/:role
      Método: GET
      Descripción: Obtiene usuarios basados en su rol.

#### Uso de Swagger

Para obtener información detallada sobre los endpoints, puedes consultar la documentación de Swagger accediendo a /api-docs.

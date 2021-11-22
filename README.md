# TP2-App-Canchas
Proyecto "Canchas de la lora"
El proyecto de API-Rest solicitado por el cliente se utilizara para un sistema de reservas de canchas de futbol del predio "Canchas de la lora" el cual cuenta con una cancha de futbol 5, una de futbol 7, una de futbol 9 y una de futbol 11.

# Instrucciones de instalación 
1. Clonar el siguiente repositorio: https://github.com/ezequielmicha/TP2-App-Canchas.git
2. Ejecutar el comando npm install para instalar todas las dependecinas
3. Generar el archivo .env y colocar dentro lo enviado por privado 
4. Para iniciar el servidor ejecutar el comando npm run start-dev

# Lista de routes (endpoints)

/api/users

/login(post) —> login
Body/raw/JSON

   {
        "email": "ezequielmicha@gmail.com",
        "password": "123456"
   }

Copiar el Token y usarlo para probar los otros endpoints. Pegarlo en: Auth/Type: Bearer Token/Token

/(get) —> getAllUsers

/:id(get) —> getUserById
*Este endpoint valida que exista el usuario

/email/:email(get) —> getUserByEmail
*Este endpoint valida que exista el usuario

/(post) —> addUser
Body/raw/JSON

    {
        "email": "ferpallas@gmail.com",
        "name": "Fernando",
        "last": "Pallas",
        "password": "123456",
        "userName": "FerPallas",
        "reserves": []
    }

*Este endpoint valida que no haya otro usuario registrado con el mismo mail

/(put) —> updateUser
Body/raw/JSON

    {
        "_id": "61945de85c66bc937465a48d",
        "email": "ferpallas@gmail.com",
        "userName": "FerPallas2021"
    }

*Este endpoint valida que exista el id del usuario a actualizar

/:id(delete) —> deleteUser
*Este endpoint valida que exista el id del usuario a eliminar



/api/reserves

/(get) —> getAllReserves

/:id(get) —> getReservesByUser
*Este endpoint valida que exista el usuario

/addReserve(put) —> addReserve
Body/raw/JSON

   {
        "_id": "61945de85c66bc937465a48d",
        "reserve": 
         {
        "date": "03-12-2021",
        "hour": 19,
        "courtSize": "F7"
    	   }
   }

*Este endpoint no permite agregar una reserva en el mismo dia, horario y tamaño de cancha si ya se encuentra reservada por cualquier usuario.
*Este endpoint no permite agregar una reserva en el mismo dia y horario que otra reserva del  mismo usuario
*Este endpoint valida que exista el usuario


/deleteReserve(put) —> deleteReserve
Body/raw/JSON

   {
        "_id": "61945de85c66bc937465a48d",
        "reserve": 
         {
        "date": "03-12-2021",
        "hour": 19,
        "courtSize": "F11"
        }
    }

*Este endpoint valida que exista el usuario
*Este endpoint valida que exista la reserva que se solicitó eliminar en dicho usuario

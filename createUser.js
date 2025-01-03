const mongoose = require('mongoose');
const User = require('./models/User'); // Asegúrate de que la ruta sea correcta
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde .env

// Verificar que la URI esté definida
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI no está definida en el archivo .env');
  process.exit(1);
}

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'mantenimiento' // Especifica el nombre de la base de datos aquí
}).then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});

// Crear un nuevo usuario
const createUser = async () => {
  try {
    const user = new User({
      username: 'leandro', // Cambia esto por el nombre de usuario deseado
      password: 'leandro2025', // Cambia esto por la contraseña deseada
      role: 'admin' // Cambia esto por el rol deseado (admin o viewer)
    });

    await user.save();
    console.log('Usuario creado exitosamente');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error al crear el usuario:', err);
    mongoose.disconnect();
  }
};

createUser();
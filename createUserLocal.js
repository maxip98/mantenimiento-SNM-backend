const mongoose = require('mongoose');
const User = require('./models/User'); // Asegúrate de que la ruta sea correcta
const dotenv = require('dotenv');

dotenv.config({ path: '.env.development' }); // Cargar variables de entorno desde .env.development

// Verificar que la URI esté definida
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI no está definida en el archivo .env.development');
  process.exit(1);
}

// Conectar a MongoDB local
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'mantenimiento' // Especifica el nombre de la base de datos aquí
}).then(() => {
  console.log('Conectado a la base de datos local');
}).catch(err => {
  console.error('Error al conectar a la base de datos local:', err);
});

// Crear un nuevo usuario
const createUser = async () => {
  try {
    const user = new User({
      username: 'admin2', // Cambia esto por el nombre de usuario deseado
      password: 'admin2', // Cambia esto por la contraseña deseada
      role: 'admin' // Cambia esto por el rol deseado (admin o viewer)
    });

    await user.save();
    console.log('Usuario creado exitosamente en la base de datos local');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error al crear el usuario en la base de datos local:', err);
    mongoose.disconnect();
  }
};

createUser();
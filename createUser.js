const mongoose = require('mongoose');
const User = require('./models/User'); // Asegúrate de que la ruta sea correcta
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde .env

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
      username: 'admin', // Cambia esto por el nombre de usuario deseado
      password: 'admin123', // Cambia esto por la contraseña deseada
      role: 'admin' // Cambia esto por el rol deseado (admin o user)
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
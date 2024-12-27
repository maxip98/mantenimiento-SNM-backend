const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();

mongoose.connect('mongodb://localhost:27017/gestionMantenimiento', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a la base de datos'); // Mensaje de depuración
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err); // Mensaje de depuración
});

const corsOptions = {
  origin: 'http://localhost:3000', // Cambia esto a la URL de tu frontend
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Habilitar CORS para todas las rutas
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); // Usa las rutas de autenticación

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); // Mensaje de depuración
});
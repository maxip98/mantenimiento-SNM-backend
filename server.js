const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User'); // Importa el modelo de usuario

dotenv.config();

const app = express();

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'mantenimiento' // Especifica el nombre de la base de datos aquí
}).then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});

// Configurar CORS
const corsOptions = {
  origin: 'https://saynomoremantenimiento.netlify.app', // Cambia esto a la URL de tu frontend en Netlify
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware global para manejar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://saynomoremantenimiento.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Middleware de depuración
app.use((req, res, next) => {
  console.log('Solicitud recibida:', req.method, req.url);
  next();
});

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/api/db-test', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ message: 'Conexión exitosa con MongoDB', userCount });
  } catch (error) {
    res.status(500).json({ message: 'Error al conectar con MongoDB', error });
  }
});

// Rutas
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Importar rutas
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// Configurar dotenv para cargar las variables de entorno correctas
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

const app = express();

// Configurar CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://saynomoremantenimiento.netlify.app' : 'http://localhost:3000',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware global para manejar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? 'https://saynomoremantenimiento.netlify.app' : 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Middleware de depuración
app.use((req, res, next) => {
  console.log('Solicitud recibida:', req.method, req.url);
  next();
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Aumenta el tiempo de espera a 30 segundos
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/api/db-test', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ message: 'Conexión exitosa con MongoDB', userCount });
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
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
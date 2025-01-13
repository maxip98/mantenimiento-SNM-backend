// Maneja el registro y el inicio de sesión de usuarios. 
// Utiliza JWT para generar tokens de autenticación y bcrypt para comparar contraseñas.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  console.log('Registrando usuario:', username); // Mensaje de depuración
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).send('Usuario registrado');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).send('Error al registrar usuario');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Intentando iniciar sesión con:', username); // Mensaje de depuración
  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log('Usuario no encontrado'); // Mensaje de depuración
      return res.status(401).send('Credenciales incorrectas');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Contraseña incorrecta'); // Mensaje de depuración
      return res.status(401).send('Credenciales incorrectas');
    }

    // Incluye el nombre de usuario en el payload del token
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    res.status(500).send('Error durante el inicio de sesión');
  }
};
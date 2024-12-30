const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  console.log('Registrando usuario:', username); // Mensaje de depuración
  const user = new User({ username, password, role });
  await user.save();
  res.status(201).send('Usuario registrado');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Intentando iniciar sesión con:', username); // Mensaje de depuración
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

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};